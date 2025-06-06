# Motivacional.IA

![Motivacional.IA[]()](https://motivacional-ia-t3fb.vercel.app/)

## 📝 Descrição

Motivacional.IA é uma aplicação web que gera mensagens motivacionais personalizadas com base nas informações fornecidas pelo usuário. A aplicação utiliza um formulário para coletar dados sobre o estado emocional, desafios, objetivos e fontes de apoio do usuário, e então gera uma mensagem motivacional personalizada com referências bíblicas.

## ✨ Funcionalidades

- Formulário interativo para coleta de informações pessoais
- Geração de mensagens motivacionais personalizadas
- Título com efeito de gradiente animado que muda constantemente de cor
- Design responsivo para desktop e dispositivos móveis
- Integração com backend FastAPI para processamento das mensagens
- Mecanismo de fallback para funcionamento offline

## 🛠️ Tecnologias Utilizadas

- **Frontend**:
  - [Next.js 14](https://nextjs.org/) - Framework React com renderização do lado do servidor
  - [React](https://reactjs.org/) - Biblioteca JavaScript para construção de interfaces
  - [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
  - [Shadcn/UI](https://ui.shadcn.com/) - Componentes de UI reutilizáveis
  - [React Hook Form](https://react-hook-form.com/) - Gerenciamento de formulários
  - [Zod](https://github.com/colinhacks/zod) - Validação de esquemas TypeScript

- **Backend**:
  - [FastAPI](https://github.com/EduardoPereiraLima-Dev/motivacionalia) - Framework Python para APIs
  - API Routes do Next.js para comunicação com o backend

## 🚀 Instalação e Configuração

### Pré-requisitos

- Node.js 18.0.0 ou superior
- npm ou yarn
- Servidor FastAPI rodando (para funcionalidade completa)

### Instalação

1. Clone o repositório:
   ``
   git clone https://github.com/seu-usuario/motivacional-ia.git
   cd motivacional-ia
   ``

2. Instale as dependências:
   ``
   npm install
   # ou
   yarn install
   ``

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:
   ``
   FASTAPI_URL=http://0.0.0.0:3333/create
   ``
   Substitua o URL pelo endereço do seu servidor FastAPI.

4. Inicie o servidor de desenvolvimento:
   ``
   npm run dev
   # ou
   yarn dev
   ``

5. Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

``
# 📂 Estrutura de Pastas — Motivacional.IA

```bash
motivacional-ia/
├── app/                            # Diretório de rotas e páginas Next.js
│   ├── api/                        # Rotas de API internas (API Routes)
│   │   └── motivational-message/
│   │       └── route.ts            # API route para geração de mensagens motivacionais
│   ├── layout.tsx                  # Layout raiz compartilhado da aplicação
│   └── page.tsx                    # Página inicial com formulário e conteúdo principal
│
├── components/                     # Componentes reutilizáveis
│   ├── animated-gradient-text.tsx  # Título animado com gradiente
│   └── ui/                         # Componentes de UI reutilizáveis (botões, inputs, etc.)
│
├── public/                         # Arquivos estáticos (imagens, favicon, etc.)
│
├── .env.local                      # Variáveis de ambiente (não versionado pelo Git)
├── next.config.js                  # Configuração do Next.js
├── package.json                    # Dependências, scripts e metadata do projeto
├── README.md                       # Documentação e instruções do projeto
└── tailwind.config.ts              # Configuração personalizada do Tailwind CSS

``

## 🔄 Integração com o Backend

A aplicação se comunica com um servidor FastAPI para processar as informações do formulário e gerar mensagens motivacionais personalizadas. A comunicação é feita através de uma API Route do Next.js (`/api/motivational-message`), que envia os dados do formulário para o endpoint FastAPI (`/create`).

### Formato da Requisição
json
``
{
  "name": "Nome do usuário",
  "how_you_feel_currently": "Como o usuário se sente atualmente",
  "main_challenges": "Principais desafios do usuário",
  "goals_dreams": "Objetivos e sonhos do usuário",
  "how_you_handle_emotions": "Como o usuário lida com emoções",
  "support_sources": "Fontes de apoio do usuário",
  "personal_care": "Cuidados pessoais do usuário"
}
``

### Formato da Resposta
json
``
{
  "nome": "Nome do usuário",
  "mensagem": "Mensagem motivacional personalizada"
}
``

### Fallback

Se o servidor FastAPI não estiver disponível, a aplicação possui um mecanismo de fallback que gera uma mensagem motivacional localmente, garantindo que a aplicação continue funcionando mesmo offline.

## ⚙️ Variáveis de Ambiente

| Variável | Descrição | Valor Padrão |
|----------|-----------|--------------|
| `FASTAPI_URL` | URL do endpoint FastAPI para geração de mensagens | `http://0.0.0.0:3333/create` |

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

Para dúvidas ou sugestões, entre em contato através de [eduardopereira.lima@yahoo.com](eduardopereira.lima@yahoo.com).

---

Desenvolvido com ❤️ para inspirar e motivar.
