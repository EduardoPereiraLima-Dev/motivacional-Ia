"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { useTheme } from "@/contexts/theme-context"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Settings, User, Palette, AlertTriangle } from "lucide-react"

export function DebugPanel() {
  const [showDebug, setShowDebug] = useState(false)
  const { user, isAuthenticated, authError } = useAuth()
  const { theme } = useTheme()

  if (!showDebug) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setShowDebug(true)}
          variant="outline"
          size="sm"
          className="bg-background/80 backdrop-blur-sm"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  const envVars = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  }

  const missingVars = Object.entries(envVars).filter(([key, value]) => !value)

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 max-h-96 overflow-y-auto">
      <Card className="bg-background/95 backdrop-blur-sm border shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Debug Panel
            </CardTitle>
            <Button onClick={() => setShowDebug(false)} variant="ghost" size="sm" className="h-6 w-6 p-0">
              ×
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          {/* Status da Autenticação */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="h-3 w-3" />
              <span className="font-medium">Autenticação</span>
            </div>
            <div className="pl-5 space-y-1">
              <div className="flex items-center justify-between">
                <span>Status:</span>
                <Badge variant={isAuthenticated ? "default" : "outline"} className="text-xs">
                  {isAuthenticated ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                  {isAuthenticated ? "Logado" : "Não logado"}
                </Badge>
              </div>
              {user && (
                <>
                  <div className="flex items-center justify-between">
                    <span>Email:</span>
                    <span className="text-muted-foreground truncate max-w-32">{user.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Nome:</span>
                    <span className="text-muted-foreground truncate max-w-32">{user.displayName}</span>
                  </div>
                </>
              )}
              {authError && (
                <div className="text-red-500 text-xs">
                  <span className="font-medium">Erro:</span> {authError}
                </div>
              )}
            </div>
          </div>

          {/* Status do Tema */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Palette className="h-3 w-3" />
              <span className="font-medium">Tema</span>
            </div>
            <div className="pl-5">
              <div className="flex items-center justify-between">
                <span>Atual:</span>
                <Badge variant="outline" className="text-xs">
                  {theme}
                </Badge>
              </div>
            </div>
          </div>

          {/* Variáveis de Ambiente */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Settings className="h-3 w-3" />
              <span className="font-medium">Firebase Config</span>
              {missingVars.length > 0 && <AlertTriangle className="h-3 w-3 text-orange-500" />}
            </div>
            <div className="pl-5 space-y-1">
              <div className="flex items-center justify-between">
                <span>API Key:</span>
                <Badge variant={envVars.apiKey ? "default" : "destructive"} className="text-xs">
                  {envVars.apiKey ? "✓" : "✗"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Project ID:</span>
                <Badge variant={envVars.projectId ? "default" : "destructive"} className="text-xs">
                  {envVars.projectId ? "✓" : "✗"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Auth Domain:</span>
                <Badge variant={envVars.authDomain ? "default" : "destructive"} className="text-xs">
                  {envVars.authDomain ? "✓" : "✗"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>App ID:</span>
                <Badge variant={envVars.appId ? "default" : "destructive"} className="text-xs">
                  {envVars.appId ? "✓" : "✗"}
                </Badge>
              </div>
              {envVars.projectId && (
                <div className="text-xs text-muted-foreground mt-2">
                  <span className="font-medium">Project:</span> {envVars.projectId}
                </div>
              )}
            </div>
          </div>

          {/* Informações do Domínio */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Settings className="h-3 w-3" />
              <span className="font-medium">Domínio</span>
            </div>
            <div className="pl-5 space-y-1">
              <div className="flex items-center justify-between">
                <span>Atual:</span>
                <span className="text-muted-foreground text-xs">
                  {typeof window !== "undefined" ? window.location.hostname : "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Protocolo:</span>
                <span className="text-muted-foreground text-xs">
                  {typeof window !== "undefined" ? window.location.protocol : "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Avisos */}
          {missingVars.length > 0 && (
            <div className="bg-orange-50 dark:bg-orange-950/30 p-2 rounded border border-orange-200 dark:border-orange-800">
              <div className="text-orange-800 dark:text-orange-200 text-xs">
                <span className="font-medium">Variáveis ausentes:</span>
                <ul className="mt-1 space-y-1">
                  {missingVars.map(([key]) => (
                    <li key={key}>• NEXT_PUBLIC_FIREBASE_{key.toUpperCase()}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
