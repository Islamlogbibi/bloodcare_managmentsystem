"use client"

import { useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"

export function LanguageInitializer() {
  const { language } = useLanguage()

  useEffect(() => {
    // Update HTML element attributes and classes for RTL/LTR
    const htmlElement = document.documentElement
    htmlElement.lang = language
    htmlElement.dir = language === "ar" ? "rtl" : "ltr"
    
    // Update className for RTL/LTR (useful for CSS that needs to target specific direction)
    if (language === "ar") {
      htmlElement.classList.add("rtl")
      htmlElement.classList.remove("ltr")
    } else {
      htmlElement.classList.add("ltr")
      htmlElement.classList.remove("rtl")
    }
  }, [language])

  return null
}
