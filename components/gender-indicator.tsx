"use client"

import { detectGender } from "@/lib/gender-detection"
import { Badge } from "@/components/ui/badge"
import { User, UserCheck } from "lucide-react"

interface GenderIndicatorProps {
  name: string
  showIndicator?: boolean
}

export function GenderIndicator({ name, showIndicator = false }: GenderIndicatorProps) {
  if (!showIndicator || !name) return null

  const gender = detectGender(name)

  const getGenderInfo = () => {
    switch (gender) {
      case "masculino":
        return {
          label: "Masculino",
          color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
          icon: <User className="h-3 w-3" />,
        }
      case "feminino":
        return {
          label: "Feminino",
          color: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
          icon: <UserCheck className="h-3 w-3" />,
        }
      default:
        return {
          label: "Neutro",
          color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
          icon: <User className="h-3 w-3" />,
        }
    }
  }

  const genderInfo = getGenderInfo()

  return (
    <Badge variant="outline" className={`${genderInfo.color} flex items-center gap-1`}>
      {genderInfo.icon}
      <span className="text-xs">Gênero detectado: {genderInfo.label}</span>
    </Badge>
  )
}
