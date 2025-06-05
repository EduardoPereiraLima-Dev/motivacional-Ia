"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { type User, onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut } from "firebase/auth"
import { auth, googleProvider, isFirebaseConfigured } from "@/lib/firebase"
import { useRouter } from "next/navigation"

interface AuthContextType {
  user: User | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  getToken: () => Promise<string | null>
  isAuthenticated: boolean
  authError: string | null
  clearAuthError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (isFirebaseConfigured() && auth) {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const token = await user.getIdToken()
            localStorage.setItem("firebase_token", token)
            localStorage.setItem(
              "user_data",
              JSON.stringify({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
              }),
            )
            setAuthError(null) // Limpar erro em caso de sucesso
            console.log("✅ Usuário autenticado:", user.email)
          } catch (error) {
            console.error("Erro ao armazenar dados do usuário:", error)
          }
        } else {
          localStorage.removeItem("firebase_token")
          localStorage.removeItem("user_data")
        }
        setUser(user)
        setLoading(false)
      })

      return () => unsubscribe()
    } else {
      console.warn("⚠️ Firebase não configurado, modo offline")
      setLoading(false)
    }
  }, [])

  const signInWithGoogle = async () => {
    try {
      setAuthError(null)

      if (!isFirebaseConfigured()) {
        throw new Error("Firebase não está configurado corretamente. Verifique as variáveis de ambiente.")
      }

      if (!auth || !googleProvider) {
        throw new Error("Serviços de autenticação não estão disponíveis.")
      }

      console.log("🔄 Iniciando login com Google...")
      const result = await signInWithPopup(auth, googleProvider)
      const token = await result.user.getIdToken()
      localStorage.setItem("firebase_token", token)
      console.log("✅ Login com Firebase realizado com sucesso")
    } catch (error: any) {
      console.error("❌ Erro no login:", error)

      let errorMessage = "Erro desconhecido ao fazer login."

      switch (error.code) {
        case "auth/popup-closed-by-user":
          errorMessage = "Login cancelado. Você fechou a janela de login."
          break
        case "auth/popup-blocked":
          errorMessage = "Seu navegador bloqueou o popup. Por favor, permita popups para este site e tente novamente."
          break
        case "auth/unauthorized-domain":
          errorMessage = "unauthorized-domain"
          break
        case "auth/operation-not-allowed":
          errorMessage = "Login com Google não está habilitado. Entre em contato com o suporte."
          break
        case "auth/cancelled-popup-request":
          errorMessage = "Apenas uma janela de login pode estar aberta por vez."
          break
        case "auth/network-request-failed":
          errorMessage = "Erro de conexão. Verifique sua internet e tente novamente."
          break
        case "auth/api-key-not-valid":
          errorMessage = "Chave de API do Firebase inválida. Verifique a configuração."
          break
        default:
          errorMessage = error.message || "Erro ao fazer login. Tente novamente."
      }

      setAuthError(errorMessage)
      throw error
    }
  }

  const signOut = async () => {
    try {
      setAuthError(null)

      if (isFirebaseConfigured() && auth) {
        await firebaseSignOut(auth)
      }

      localStorage.removeItem("firebase_token")
      localStorage.removeItem("user_data")
      console.log("✅ Logout realizado com sucesso")
      router.push("/")
    } catch (error) {
      console.error("❌ Erro no logout:", error)
      setAuthError("Erro ao fazer logout. Tente novamente.")
      throw error
    }
  }

  const getToken = async (): Promise<string | null> => {
    if (user) {
      try {
        return await user.getIdToken()
      } catch (error) {
        console.error("Erro ao obter token:", error)
        return null
      }
    }
    return localStorage.getItem("firebase_token")
  }

  const clearAuthError = () => {
    setAuthError(null)
  }

  const value = {
    user,
    loading,
    signInWithGoogle,
    signOut,
    getToken,
    isAuthenticated: !!user,
    authError,
    clearAuthError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
}
