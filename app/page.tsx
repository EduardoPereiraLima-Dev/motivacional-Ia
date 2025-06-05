"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedGradientText } from "@/components/animated-gradient-text"
import { useAuth } from "@/contexts/auth-context"
import {
  ArrowRight,
  Heart,
  Sparkles,
  Shield,
  Users,
  MessageSquare,
  Star,
  CheckCircle,
  Zap,
  BookOpen,
  Target,
  Loader2,
} from "lucide-react"
import { FirebaseDomainSetup } from "@/components/firebase-domain-setup"
import { SiteHeader } from "@/components/site-header"
import { DebugPanel } from "@/components/debug-panel"

export default function LandingPage() {
  const [isSigningIn, setIsSigningIn] = useState(false)
  const { user, signInWithGoogle, loading, authError, clearAuthError } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user && !loading) {
      router.push("/dashboard")
    }
  }, [user, loading, router])

  const handleGetStarted = async () => {
    if (user) {
      router.push("/dashboard")
      return
    }

    setIsSigningIn(true)
    clearAuthError()

    try {
      await signInWithGoogle()
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Erro no login:", error)
      // O erro já foi tratado no contexto de autenticação
    } finally {
      setIsSigningIn(false)
    }
  }

  const features = [
    {
      icon: <Heart className="h-8 w-8 text-pink-600" />,
      title: "Mensagens Personalizadas",
      description: "Cada mensagem é única, criada especialmente para você com base em seus sentimentos e objetivos.",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      title: "Baseado em Sabedoria Bíblica",
      description: "Inspiração fundamentada em versículos bíblicos para fortalecer sua fé e determinação.",
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-600" />,
      title: "Resposta Instantânea",
      description: "Receba sua mensagem motivacional em segundos, sempre que precisar de inspiração.",
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Seguro e Privado",
      description: "Suas informações são protegidas e suas mensagens ficam salvas apenas para você.",
    },
    {
      icon: <Target className="h-8 w-8 text-purple-600" />,
      title: "Foco em Seus Objetivos",
      description: "Mensagens direcionadas para seus sonhos e metas específicas.",
    },
    {
      icon: <Users className="h-8 w-8 text-indigo-600" />,
      title: "Suporte Emocional",
      description: "Palavras de encorajamento para momentos difíceis e celebração das vitórias.",
    },
  ]

  const testimonials = [
    {
      name: "Maria Silva",
      role: "Empreendedora",
      content:
        "As mensagens do Motivacional.IA me ajudaram a superar momentos difíceis no meu negócio. Cada palavra parecia feita especialmente para mim!",
      rating: 5,
    },
    {
      name: "João Santos",
      role: "Estudante",
      content:
        "Incrível como a IA consegue capturar exatamente o que eu preciso ouvir. As referências bíblicas trazem uma paz especial.",
      rating: 5,
    },
    {
      name: "Ana Costa",
      role: "Mãe e Profissional",
      content: "Uso todos os dias! Me ajuda a manter o foco nos meus objetivos enquanto cuido da família e trabalho.",
      rating: 5,
    },
  ]

  const steps = [
    {
      number: "1",
      title: "Conte sobre você",
      description: "Compartilhe como está se sentindo, seus desafios e objetivos",
    },
    {
      number: "2",
      title: "IA processa suas informações",
      description: "Nossa inteligência artificial analisa suas necessidades únicas",
    },
    {
      number: "3",
      title: "Receba sua mensagem",
      description: "Uma mensagem motivacional personalizada com sabedoria bíblica",
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 py-20 sm:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <AnimatedGradientText className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
                motivacional.ia
              </AnimatedGradientText>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6 max-w-4xl mx-auto">
              Mensagens motivacionais personalizadas com
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                {" "}
                sabedoria bíblica
              </span>
            </h2>

            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Receba inspiração única baseada em seus sentimentos, desafios e objetivos. Cada mensagem é criada
              especialmente para você.
            </p>

            {/* Error handling com componente específico para domínio não autorizado */}
            {authError && (
              <div className="max-w-2xl mx-auto mb-6">
                {authError === "unauthorized-domain" ? (
                  <FirebaseDomainSetup />
                ) : (
                  <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-md">
                    {authError}
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={handleGetStarted}
                disabled={isSigningIn}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4"
              >
                {isSigningIn ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  <>
                    <Heart className="mr-2 h-5 w-5" />
                    {user ? "Ir para Dashboard" : "Começar Gratuitamente"}
                  </>
                )}
              </Button>

              <Button
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Ver Como Funciona
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" />
                Gratuito para sempre
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" />
                Sem limite de mensagens
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" />
                100% privado e seguro
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Por que escolher o Motivacional.IA?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tecnologia avançada combinada com sabedoria milenar para inspirar sua jornada
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="mx-auto mb-4 w-16 h-16 bg-muted rounded-2xl flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">{feature.title}</h3>
                  <p className="text-center text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Como funciona?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Três passos simples para receber sua mensagem motivacional personalizada
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={handleGetStarted}
              disabled={isSigningIn}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {user ? "Criar Minha Mensagem" : "Começar Agora"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">O que nossos usuários dizem</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Histórias reais de pessoas que encontraram inspiração e motivação
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Pronto para receber sua primeira mensagem motivacional?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Junte-se a milhares de pessoas que já encontraram inspiração e força para seguir em frente
          </p>

          <Button
            onClick={handleGetStarted}
            disabled={isSigningIn}
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-50 text-lg px-8 py-4"
          >
            {isSigningIn ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Entrando...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                {user ? "Ir para Dashboard" : "Começar Gratuitamente"}
              </>
            )}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">Motivacional.IA</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Inspiração personalizada com sabedoria bíblica para fortalecer sua jornada e alcançar seus objetivos.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#features" className="hover:text-white transition-colors">
                    Recursos
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-white transition-colors">
                    Como Funciona
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="hover:text-white transition-colors text-left"
                  >
                    Dashboard
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#testimonials" className="hover:text-white transition-colors">
                    Depoimentos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contato
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Motivacional.IA. Desenvolvido com ❤️ para inspirar sua jornada.</p>
          </div>
        </div>
      </footer>

      {/* Debug Panel - apenas em desenvolvimento */}
      {process.env.NODE_ENV === "development" && <DebugPanel />}
    </div>
  )
}
