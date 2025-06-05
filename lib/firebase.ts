import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Verificar se todas as variáveis necessárias estão presentes
const requiredEnvVars = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
]

const missingVars = requiredEnvVars.filter((varName) => !process.env[varName])

if (missingVars.length > 0) {
  console.error("❌ Variáveis de ambiente Firebase ausentes:", missingVars)
  console.error("📝 Adicione essas variáveis ao seu arquivo .env.local")
}

// Initialize Firebase
let app
let auth
let googleProvider

try {
  app = getApps().length ? getApp() : initializeApp(firebaseConfig)
  auth = getAuth(app)
  googleProvider = new GoogleAuthProvider()

  // Configurar o provedor Google para melhor experiência do usuário
  googleProvider.setCustomParameters({
    prompt: "select_account",
  })

  console.log("✅ Firebase inicializado com sucesso")
  console.log("🔧 Configuração:", {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain,
    hasApiKey: !!firebaseConfig.apiKey,
  })
} catch (error) {
  console.error("❌ Erro ao inicializar Firebase:", error)
}

// Verificar se o Firebase está configurado corretamente
export const isFirebaseConfigured = () => {
  const isConfigured = !!(firebaseConfig.apiKey && firebaseConfig.appId && firebaseConfig.projectId)

  if (!isConfigured) {
    console.error("❌ Firebase não está configurado corretamente")
    console.error("📋 Configuração atual:", firebaseConfig)
  }

  return isConfigured
}

// Função para obter token do usuário atual
export const getCurrentUserToken = async () => {
  if (!auth?.currentUser) return null

  try {
    return await auth.currentUser.getIdToken(true)
  } catch (error) {
    console.error("Erro ao obter token:", error)
    return null
  }
}

export { auth, googleProvider }
