import { useEffect } from 'react'

/** Sets the document title and meta description per page (basic SEO for a client-rendered app). */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    }
  }, [title, description])
}
