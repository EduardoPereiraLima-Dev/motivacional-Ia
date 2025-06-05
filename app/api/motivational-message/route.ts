import { NextResponse } from "next/server"
import { authenticateRequest } from "@/lib/firebase-admin"
import { detectGender, personalizeMessage } from "@/lib/gender-detection"

export async function POST(request: Request) {
  try {
    // Tentar autenticar a requisição
    const authResult = await authenticateRequest(request)

    if (!authResult.success) {
      console.log("⚠️ Requisição não autenticada, continuando sem autenticação")
    } else {
      console.log("✅ Usuário autenticado:", authResult.email)
    }

    const body = await request.json()

    // Validate required fields
    const requiredFields = [
      "name",
      "how_you_feel_currently",
      "main_challenges",
      "goals_dreams",
      "how_you_handle_emotions",
      "support_sources",
      "personal_care",
    ]

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Campo obrigatório ausente: ${field}` }, { status: 400 })
      }
    }

    // Detectar gênero baseado no nome
    const gender = detectGender(body.name)
    console.log(`🎯 Gênero detectado para "${body.name}": ${gender}`)

    // Adicionar informação de gênero ao corpo da requisição
    const bodyWithGender = {
      ...body,
      detected_gender: gender,
    }

    // Usar o endpoint correto fornecido
    const apiUrl = process.env.FASTAPI_URL || "http://0.0.0.0:3333/create"

    try {
      console.log("Tentando conectar ao endpoint:", apiUrl)

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      }

      // Se autenticado, passar o token para o FastAPI
      if (authResult.success) {
        const authHeader = request.headers.get("Authorization")
        if (authHeader) {
          headers["Authorization"] = authHeader
        }
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(bodyWithGender),
        signal: AbortSignal.timeout(5000), // 5 segundos de timeout
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Resposta não-ok do servidor:", response.status, errorText)
        throw new Error(`Erro na resposta do servidor: ${response.status} ${errorText}`)
      }

      const data = await response.json()
      console.log("Resposta recebida com sucesso:", data)

      // Personalizar a mensagem baseada no gênero detectado
      if (data.mensagem) {
        data.mensagem = personalizeMessage(data.mensagem, body.name)
        console.log(`🎨 Mensagem personalizada para gênero ${gender}`)
      }

      // Log da requisição autenticada
      if (authResult.success) {
        console.log(`🎉 Mensagem gerada para usuário autenticado: ${authResult.email}`)
      }

      return NextResponse.json(data)
    } catch (fetchError) {
      console.error("Erro ao conectar com o servidor FastAPI:", fetchError)
      console.log("Usando fallback para gerar resposta localmente")

      // Fallback: gerar resposta localmente se não conseguir conectar ao servidor
      let fallbackMessage = ""

      if (gender === "masculino") {
        fallbackMessage = `E aí, ${body.name}, guerreiro! Sei que anda ${body.how_you_feel_currently.toLowerCase()}, conciliando ${body.main_challenges.toLowerCase()}, uau! Isso é maratona, não corrida de 100 metros! Mas olha só, Filipenses 4:13 diz: 'Tudo posso naquele que me fortalece'. Você está buscando ${body.goals_dreams.toLowerCase()} – que sonho incrível! É um desafio e tanto, mas lembre-se que Deus não te deu um espírito de medo, mas de poder, de amor e de domínio próprio (2 Timóteo 1:7). Esses momentos de ${body.how_you_handle_emotions.toLowerCase()}, ${body.support_sources.toLowerCase()} e ${body.personal_care.toLowerCase()} são os seus pilares! São seus momentos de recarga, como o maná no deserto! Não se esqueça disso. A busca pelo trabalho pode ser chata, sim, mas lembre-se que Deus está contigo em cada etapa, celebrando cada pequena vitória. Acredite em seu potencial, confie no processo, e continue firme! Você é capaz! A recompensa vai valer cada gota de suor. 'Pois eu sei os planos que tenho para vocês', declara o Senhor, 'planos de paz, e não de mal, para lhes dar um futuro e uma esperança.' (Jeremias 29:11). Força, campeão! Você vai conseguir!`
      } else if (gender === "feminino") {
        fallbackMessage = `E aí, ${body.name}, guerreira! Sei que anda ${body.how_you_feel_currently.toLowerCase()}, conciliando ${body.main_challenges.toLowerCase()}, uau! Isso é maratona, não corrida de 100 metros! Mas olha só, Filipenses 4:13 diz: 'Tudo posso naquele que me fortalece'. Você está buscando ${body.goals_dreams.toLowerCase()} – que sonho incrível! É um desafio e tanto, mas lembre-se que Deus não te deu um espírito de medo, mas de poder, de amor e de domínio próprio (2 Timóteo 1:7). Esses momentos de ${body.how_you_handle_emotions.toLowerCase()}, ${body.support_sources.toLowerCase()} e ${body.personal_care.toLowerCase()} são os seus pilares! São seus momentos de recarga, como o maná no deserto! Não se esqueça disso. A busca pelo trabalho pode ser chata, sim, mas lembre-se que Deus está contigo em cada etapa, celebrando cada pequena vitória. Acredite em seu potencial, confie no processo, e continue firme! Você é capaz! A recompensa vai valer cada gota de suor. 'Pois eu sei os planos que tenho para vocês', declara o Senhor, 'planos de paz, e não de mal, para lhes dar um futuro e uma esperança.' (Jeremias 29:11). Força, campeã! Você vai conseguir!`
      } else {
        fallbackMessage = `E aí, ${body.name}! Sei que anda ${body.how_you_feel_currently.toLowerCase()}, conciliando ${body.main_challenges.toLowerCase()}, uau! Isso é maratona, não corrida de 100 metros! Mas olha só, Filipenses 4:13 diz: 'Tudo posso naquele que me fortalece'. Você está buscando ${body.goals_dreams.toLowerCase()} – que sonho incrível! É um desafio e tanto, mas lembre-se que Deus não te deu um espírito de medo, mas de poder, de amor e de domínio próprio (2 Timóteo 1:7). Esses momentos de ${body.how_you_handle_emotions.toLowerCase()}, ${body.support_sources.toLowerCase()} e ${body.personal_care.toLowerCase()} são os seus pilares! São seus momentos de recarga, como o maná no deserto! Não se esqueça disso. A busca pelo trabalho pode ser chata, sim, mas lembre-se que Deus está contigo em cada etapa, celebrando cada pequena vitória. Acredite em seu potencial, confie no processo, e continue firme! Você é capaz! A recompensa vai valer cada gota de suor. 'Pois eu sei os planos que tenho para vocês', declara o Senhor, 'planos de paz, e não de mal, para lhes dar um futuro e uma esperança.' (Jeremias 29:11). Força! Você vai conseguir!`
      }

      const fallbackResponse = {
        nome: body.name,
        mensagem: fallbackMessage,
        genero_detectado: gender,
      }

      // Se autenticado, adicionar informações do usuário
      if (authResult.success) {
        console.log(`🎉 Mensagem fallback gerada para usuário autenticado: ${authResult.email} (gênero: ${gender})`)
      }

      return NextResponse.json(fallbackResponse)
    }
  } catch (error) {
    console.error("Erro ao processar a solicitação:", error)
    return NextResponse.json(
      {
        error: "Erro interno do servidor",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
