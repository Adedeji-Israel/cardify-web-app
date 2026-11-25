import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { usePageMeta } from '@/hooks/usePageMeta'

export default function NotFound() {
  usePageMeta('Page not found — Cardify')
  return (
    <Container className="py-32 text-center">
      <p className="text-7xl font-extrabold text-brand-600">404</p>
      <h1 className="mt-4 text-3xl font-extrabold">We couldn’t find that page</h1>
      <p className="mt-3 text-muted">The link may be broken or the page may have moved.</p>
      <Button to="/" size="lg" className="mt-8">
        Back to home
      </Button>
    </Container>
  )
}
