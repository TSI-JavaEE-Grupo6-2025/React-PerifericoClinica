import { useEffect } from "react"

/**
 * Hook para actualizar el favicon del documento de forma dinámica.
 * No gestiona validaciones ni fallbacks; pásale la URL final que quieras usar.
 */
export function useFavicon(href: string) {
  useEffect(() => {
    if (!href) return
    const head = document.head
    if (!head) return

    let link = document.querySelector<HTMLLinkElement>("link[rel='icon']")
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      head.appendChild(link)
    }
    link.href = href
  }, [href])
}
