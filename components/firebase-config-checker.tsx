"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, Copy, ExternalLink } from "lucide-react"
import { isFirebaseConfigured } from "@/lib/firebase"

export function FirebaseConfigChecker() {
  const [isConfigured, setIsConfigured] = useState(false)
  const [showConfig, setShowConfig] = useState(false)

  useEffect(() => {
    setIsConfigured(isFirebaseConfigured())
  }, [])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const requiredDomains = ["localhost", "127.0.0.1", window.location.hostname]

  if (isConfigured) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center text-green-800">
            <CheckCircle className="mr-2 h-5 w-5" />
            Firebase Configurado
          </CardTitle>
          <CardDescription className="text-green-600">
            Autenticação Firebase está funcionando corretamente
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="flex items-center text-orange-800">
          <AlertTriangle className="mr-2 h-5 w-5" />
          Configuração do Firebase Necessária
        </CardTitle>
        <CardDescription className="text-orange-600">
          Para usar a autenticação, configure o Firebase corretamente
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-semibold text-orange-800">Passos para configurar:</h4>
          <ol className="list-decimal list-inside space-y-1 text-sm text-orange-700">
            <li>
              Acesse o{" "}
              <a
                href="https://console.firebase.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Console do Firebase
              </a>
            </li>
            <li>
              Selecione o projeto: <code className="bg-orange-100 px-1 rounded">gen-lang-client-0816853627</code>
            </li>
            <li>Vá em Authentication → Settings → Authorized domains</li>
            <li>Adicione os domínios autorizados</li>
            <li>Configure as variáveis de ambiente</li>
          </ol>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-orange-800">Domínios para adicionar:</h4>
          <div className="space-y-1">
            {requiredDomains.map((domain) => (
              <div key={domain} className="flex items-center justify-between bg-orange-100 p-2 rounded">
                <code className="text-sm">{domain}</code>
                <Button size="sm" variant="outline" onClick={() => copyToClipboard(domain)} className="h-6 px-2">
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Button onClick={() => setShowConfig(!showConfig)} variant="outline" className="w-full">
          {showConfig ? "Ocultar" : "Mostrar"} Configuração .env.local
        </Button>

        {showConfig && (
          <div className="space-y-2">
            <h4 className="font-semibold text-orange-800">Adicione ao .env.local:</h4>
            <div className="bg-gray-900 text-green-400 p-3 rounded text-xs font-mono overflow-x-auto">
              <pre>{`NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDq_0-zc-ihPkZjuclA9xzr0afl3vZh0U4
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=gen-lang-client-0816853627.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=gen-lang-client-0816853627
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=gen-lang-client-0816853627.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=58574897364
NEXT_PUBLIC_FIREBASE_APP_ID=1:58574897364:web:SEU_APP_ID_AQUI`}</pre>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                copyToClipboard(`NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDq_0-zc-ihPkZjuclA9xzr0afl3vZh0U4
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=gen-lang-client-0816853627.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=gen-lang-client-0816853627
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=gen-lang-client-0816853627.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=58574897364
NEXT_PUBLIC_FIREBASE_APP_ID=1:58574897364:web:SEU_APP_ID_AQUI`)
              }
              className="w-full"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copiar Configuração
            </Button>
          </div>
        )}

        <div className="flex space-x-2">
          <Button onClick={() => window.open("https://console.firebase.google.com", "_blank")} className="flex-1">
            <ExternalLink className="mr-2 h-4 w-4" />
            Abrir Console Firebase
          </Button>
          <Button onClick={() => window.location.reload()} variant="outline" className="flex-1">
            Recarregar Página
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
