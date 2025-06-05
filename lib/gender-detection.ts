// Lista de nomes masculinos comuns
const maleNames = [
  "henrique",
  "joão",
  "josé",
  "antonio",
  "francisco",
  "carlos",
  "paulo",
  "pedro",
  "lucas",
  "luiz",
  "marcos",
  "luis",
  "rafael",
  "daniel",
  "marcelo",
  "bruno",
  "eduardo",
  "felipe",
  "raimundo",
  "rodrigo",
  "manoel",
  "nelson",
  "roberto",
  "fabio",
  "alessandro",
  "fernando",
  "fabiano",
  "jorge",
  "alex",
  "andre",
  "adriano",
  "gabriel",
  "leonardo",
  "diego",
  "sergio",
  "gustavo",
  "leandro",
  "thiago",
  "cesar",
  "max",
  "ricardo",
  "antonio",
  "vinicius",
  "renan",
  "mateus",
  "caio",
  "igor",
  "victor",
  "vitor",
  "guilherme",
  "arthur",
  "enzo",
  "miguel",
  "davi",
  "bernardo",
  "samuel",
  "lorenzo",
  "nicolas",
  "benjamin",
  "matheus",
  "heitor",
  "ryan",
  "ravi",
  "theo",
  "murilo",
  "pietro",
  "lucca",
  "felipe",
  "joao",
  "gustavo",
  "anthony",
  "isaac",
  "caleb",
  "nathan",
  "bryan",
  "cauã",
  "kauê",
  "otavio",
  "augusto",
  "levi",
  "yuri",
  "enrico",
  "joão",
  "pedro",
  "gabriel",
  "arthur",
  "lucas",
  "matheus",
  "davi",
  "lorenzo",
  "theo",
  "miguel",
  "rafael",
  "gael",
  "samuel",
  "daniel",
  "noah",
  "enzo",
  "vitor",
  "antonio",
  "vicente",
  "benjamin",
  "caleb",
  "leonardo",
  "emanuel",
  "isaque",
  "joshua",
  "nathan",
  "isaac",
  "ryan",
  "cauã",
  "david",
  "artur",
  "luca",
  "bento",
  "davi",
  "raul",
  "pedro",
  "joão",
  "gabriel",
  "arthur",
  "lucas",
]

// Lista de nomes femininos comuns
const femaleNames = [
  "maria",
  "ana",
  "francisca",
  "antonia",
  "adriana",
  "juliana",
  "marcia",
  "fernanda",
  "patricia",
  "aline",
  "sandra",
  "camila",
  "amanda",
  "bruna",
  "jessica",
  "leticia",
  "julia",
  "luciana",
  "vanessa",
  "mariana",
  "gabriela",
  "rafaela",
  "daniela",
  "caroline",
  "barbara",
  "larissa",
  "alessandra",
  "simone",
  "viviane",
  "cristiane",
  "priscila",
  "andreia",
  "kelly",
  "sabrina",
  "monica",
  "claudia",
  "carla",
  "renata",
  "tatiane",
  "karina",
  "beatriz",
  "raquel",
  "natalia",
  "luana",
  "eliane",
  "rosana",
  "michele",
  "cristina",
  "silvia",
  "regina",
  "alice",
  "sophia",
  "helena",
  "valentina",
  "laura",
  "isabella",
  "manuela",
  "julia",
  "heloisa",
  "luiza",
  "maria",
  "lorena",
  "livia",
  "giovanna",
  "maria",
  "emanuelly",
  "ana",
  "clara",
  "esther",
  "mirella",
  "antonella",
  "lara",
  "maria",
  "melissa",
  "yasmin",
  "maria",
  "isis",
  "alicia",
  "luna",
  "pietra",
  "maria",
  "cecilia",
  "eloah",
  "maria",
  "vitoria",
  "marina",
  "maya",
  "agatha",
  "maria",
  "fernanda",
  "nicole",
  "sarah",
  "maria",
  "clara",
  "ana",
  "beatriz",
  "maria",
  "eduarda",
  "mariana",
  "emilly",
  "maria",
  "alice",
  "sophia",
  "helena",
  "valentina",
  "laura",
  "isabella",
  "manuela",
  "julia",
  "heloisa",
]

// Sufixos que geralmente indicam gênero
const maleSuffixes = ["o", "os", "ão", "ões", "or", "er", "ir", "ur", "el", "al", "il", "ol", "ul"]
const femaleSuffixes = ["a", "as", "ã", "ãs", "ice", "ise", "ose", "use", "ina", "ana", "ena", "ona", "una"]

export function detectGender(name: string): "masculino" | "feminino" | "neutro" {
  if (!name || typeof name !== "string") {
    return "neutro"
  }

  // Normalizar o nome (remover acentos, converter para minúsculo, pegar apenas o primeiro nome)
  const normalizedName = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .split(" ")[0] // Pegar apenas o primeiro nome

  // Verificar se o nome está na lista de nomes masculinos
  if (maleNames.includes(normalizedName)) {
    return "masculino"
  }

  // Verificar se o nome está na lista de nomes femininos
  if (femaleNames.includes(normalizedName)) {
    return "feminino"
  }

  // Verificar sufixos masculinos
  for (const suffix of maleSuffixes) {
    if (normalizedName.endsWith(suffix)) {
      return "masculino"
    }
  }

  // Verificar sufixos femininos
  for (const femaleSuffixes of femaleSuffixes) {
    if (normalizedName.endsWith(femaleSuffixes)) {
      return "feminino"
    }
  }

  // Se não conseguir determinar, retornar neutro
  return "neutro"
}

// Função para obter pronomes baseados no gênero
export function getPronouns(gender: "masculino" | "feminino" | "neutro") {
  switch (gender) {
    case "masculino":
      return {
        pronome: "ele",
        artigo: "o",
        adjetivo: "o", // para palavras como "motivado", "focado"
        tratamento: "guerreiro", // em vez de "guerreira"
        possessivo: "seu",
      }
    case "feminino":
      return {
        pronome: "ela",
        artigo: "a",
        adjetivo: "a", // para palavras como "motivada", "focada"
        tratamento: "guerreira",
        possessivo: "sua",
      }
    default:
      return {
        pronome: "você",
        artigo: "",
        adjetivo: "", // neutro
        tratamento: "campeão/campeã",
        possessivo: "seu/sua",
      }
  }
}

// Função para personalizar mensagem baseada no gênero
export function personalizeMessage(message: string, name: string): string {
  const gender = detectGender(name)
  const pronouns = getPronouns(gender)

  let personalizedMessage = message

  // Substituições baseadas no gênero
  if (gender === "masculino") {
    personalizedMessage = personalizedMessage
      .replace(/guerreira/gi, "guerreiro")
      .replace(/motivada/gi, "motivado")
      .replace(/focada/gi, "focado")
      .replace(/determinada/gi, "determinado")
      .replace(/corajosa/gi, "corajoso")
      .replace(/forte/gi, "forte")
      .replace(/campeã/gi, "campeão")
      .replace(/ela/gi, "ele")
      .replace(/\bsua\b/gi, "seu")
  } else if (gender === "feminino") {
    personalizedMessage = personalizedMessage
      .replace(/guerreiro/gi, "guerreira")
      .replace(/motivado/gi, "motivada")
      .replace(/focado/gi, "focada")
      .replace(/determinado/gi, "determinada")
      .replace(/corajoso/gi, "corajosa")
      .replace(/campeão/gi, "campeã")
      .replace(/ele/gi, "ela")
      .replace(/\bseu\b/gi, "sua")
  }

  return personalizedMessage
}
