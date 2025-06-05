"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, Copy, ExternalLink, Globe, Shield } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function FirebaseDomainSetup() {
  const [currentDomain, setCurrentDomain] = useState("")
  const [isLocalhost, setIsLocalhost] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const domain = window.location.hostname
      setCurrentDomain(domain)
      setIsLocalhost(domain === "localhost" || domain === "127.0.0.1")
    }
  }, [])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const requiredDomains = [
    "localhost",
    "127.0.0.1",
    currentDomain,
    "*.vercel.app", // Para deploys no Vercel
    "*.netlify.app", // Para deploys no Netlify
    "motivacionalia.onrender.com", // Seu domínio de produção
  ].filter((domain, index, arr) => arr.indexOf(domain) === index) // Remove duplicatas

  return (
    <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/30 dark:border-orange-800">
      <CardHeader>
        <CardTitle className="flex items-center text-orange-800 dark:text-orange-200">
          <AlertTriangle className="mr-2 h-5 w-5" />
          Domínio Não Autorizado no Firebase
        </CardTitle>
        <CardDescription className="text-orange-600 dark:text-orange-300">
          O domínio <code className="bg-orange-100 dark:bg-orange-900 px-1 rounded">{currentDomain}</code> precisa ser
          adicionado aos domínios autorizados no Firebase
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertTitle>Por que isso acontece?</AlertTitle>
          <AlertDescription>
            O Firebase só permite autenticação de domínios previamente autorizados por segurança. Você precisa adicionar
            este domínio no console do Firebase.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <h4 className="font-semibold text-orange-800 dark:text-orange-200 flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Passo a passo para resolver:
          </h4>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg border">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <p className="font-medium">Acesse o Firebase Console</p>
                <p className="text-sm text-muted-foreground">
                  Vá para{" "}
                  <a
                    href="https://console.firebase.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    console.firebase.google.com
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg border">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <p className="font-medium">Selecione seu projeto</p>
                <p className="text-sm text-muted-foreground">
                  Projeto: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">gen-lang-client-0816853627</code>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg border">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <p className="font-medium">Navegue para Authentication</p>
                <p className="text-sm text-muted-foreground">
                  Clique em <strong>Authentication</strong> → <strong>Settings</strong> →{" "}
                  <strong>Authorized domains</strong>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg border">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                4
              </div>
              <div>
                <p className="font-medium">Adicione os domínios</p>
                <p className="text-sm text-muted-foreground">Clique em "Add domain" e adicione cada domínio abaixo:</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-orange-800 dark:text-orange-200">Domínios para adicionar:</h4>
          <div className="space-y-2">
            {requiredDomains.map((domain) => (
              <div
                key={domain}
                className="flex items-center justify-between bg-white dark:bg-gray-900 p-3 rounded-lg border"
              >
                <div className="flex items-center gap-2">
                  <code className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{domain}</code>
                  {domain === currentDomain && (
                    <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                      Atual
                    </span>
                  )}
                  {domain === "motivacionalia.onrender.com" && (
                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                      Produção
                    </span>
                  )}
                </div>
                <Button size="sm" variant="outline" onClick={() => copyToClipboard(domain)} className="h-8 px-3">
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() =>
              window.open(
                "https://console.firebase.google.com/project/gen-lang-client-0816853627/authentication/settings",
                "_blank",
              )
            }
            className="flex-1"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Abrir Firebase Console
          </Button>
          <Button onClick={() => window.location.reload()} variant="outline" className="flex-1">
            Recarregar Página
          </Button>
        </div>

        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Dica importante</AlertTitle>
          <AlertDescription>
            Após adicionar os domínios no Firebase, aguarde alguns minutos para que as alterações sejam aplicadas,
            depois recarregue esta página.
          </AlertDescription>
        </Alert>

        <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">⚠️ Problemas conhecidos:</h5>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• Certifique-se de que o APP_ID está correto no .env.local</li>
            <li>• O MEASUREMENT_ID pode ser opcional para autenticação</li>
            <li>• Verifique se o Google Sign-In está habilitado no Firebase</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
