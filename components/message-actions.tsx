"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"

interface MessageActionsProps {
  message: string
  name: string
}

export function MessageActions({ message, name }: MessageActionsProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const shareOnWhatsApp = () => {
    const text = `*Mensagem Motivacional para ${name}*\n\n${message}\n\n_Gerada por Motivacional.IA - https://motivacional.ia_`
    const encodedText = encodeURIComponent(text)
    const whatsappUrl = `https://wa.me/?text=${encodedText}`
    window.open(whatsappUrl, "_blank")
  }

  const generatePDF = async () => {
    setIsGeneratingPDF(true)
    try {
      // Importação dinâmica do jsPDF
      const { jsPDF } = await import("jspdf")

      const doc = new jsPDF()

      // Configurar fonte
      doc.setFont("helvetica")

      // Adicionar cabeçalho colorido
      doc.setFillColor(66, 99, 235)
      doc.rect(0, 0, 210, 30, "F")

      // Título principal
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(22)
      doc.text("Motivacional.IA", 105, 20, { align: "center" })

      // Título da mensagem
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(18)
      doc.text(`Mensagem para ${name}`, 105, 50, { align: "center" })

      // Linha decorativa
      doc.setDrawColor(66, 99, 235)
      doc.setLineWidth(0.5)
      doc.line(20, 55, 190, 55)

      // Conteúdo da mensagem
      doc.setFontSize(12)
      doc.setTextColor(60, 60, 60)

      // Quebrar texto em linhas
      const splitText = doc.splitTextToSize(message, 170)
      doc.text(splitText, 20, 70)

      // Rodapé
      const pageHeight = doc.internal.pageSize.height
      doc.setFontSize(10)
      doc.setTextColor(120, 120, 120)
      doc.text("Gerado por Motivacional.IA", 105, pageHeight - 20, { align: "center" })
      doc.text("https://motivacional.ia", 105, pageHeight - 10, { align: "center" })

      // Salvar o PDF
      const fileName = `mensagem-motivacional-${name.toLowerCase().replace(/\s+/g, "-")}.pdf`
      doc.save(fileName)

      // Mostrar feedback de sucesso
      console.log("PDF gerado com sucesso!")
    } catch (error) {
      console.error("Erro ao gerar PDF:", error)
      alert("Erro ao gerar PDF. Tente novamente.")
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={shareOnWhatsApp}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-green-600"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Compartilhar no WhatsApp
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={generatePDF}
        disabled={isGeneratingPDF}
      >
        {isGeneratingPDF ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Gerando PDF...
          </>
        ) : (
          <>
            <Download className="h-4 w-4" />
            Baixar como PDF
          </>
        )}
      </Button>
    </div>
  )
}
