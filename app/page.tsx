import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Search, Network, FileText, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="border-b border-border/50 sticky top-0 z-50 bg-background/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
              Ⓘ
            </div>
            <span className="font-bold text-lg">OSINT</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition">
              Features
            </a>
            <a href="#how" className="text-muted-foreground hover:text-foreground transition">
              How It Works
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition">
              Pricing
            </a>
          </nav>
          <Link href="/dashboard">
            <Button size="sm">Launch App</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="py-24 md:py-32 text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-balance">Intelligence at Scale</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Pivot across domains, IPs, emails, and identities in seconds. Enrich with third-party intelligence.
              Visualize connections. Export evidence—all from one unified platform.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                Start Searching <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              View Demo
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-4 gap-6 mt-24 pt-16 border-t border-border/50">
            <div className="text-left space-y-3">
              <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center text-primary">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="font-semibold">Fast Search</h3>
              <p className="text-sm text-muted-foreground">
                Unified entity detection across 10+ types with instant pivoting.
              </p>
            </div>

            <div className="text-left space-y-3">
              <div className="w-10 h-10 rounded bg-accent/20 flex items-center justify-center text-accent">
                <Network className="w-5 h-5" />
              </div>
              <h3 className="font-semibold">Graph Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Interactive node-link visualization showing relationships and patterns.
              </p>
            </div>

            <div className="text-left space-y-3">
              <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center text-primary">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-semibold">Case Management</h3>
              <p className="text-sm text-muted-foreground">
                Organize findings, add notes, and export shareable reports.
              </p>
            </div>

            <div className="text-left space-y-3">
              <div className="w-10 h-10 rounded bg-accent/20 flex items-center justify-center text-accent">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-semibold">Real-Time Enrichment</h3>
              <p className="text-sm text-muted-foreground">Third-party intelligence with credit-based metering.</p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how" className="py-24 space-y-12 border-t border-border/50">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="text-muted-foreground">Three simple steps to accelerate your investigation</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="text-2xl font-bold text-primary">01</div>
              <h3 className="text-xl font-semibold">Search</h3>
              <p className="text-muted-foreground">
                Paste any entity—domain, IP, email, username, or crypto address. The system auto-detects and normalizes.
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-2xl font-bold text-primary">02</div>
              <h3 className="text-xl font-semibold">Enrich</h3>
              <p className="text-muted-foreground">
                Instantly pivot to related infrastructure, whois records, SSL certs, and breach data with one click.
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-2xl font-bold text-primary">03</div>
              <h3 className="text-xl font-semibold">Export</h3>
              <p className="text-muted-foreground">
                Build cases, visualize graphs, and export findings as PDF or shareable reports.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 border-t border-border/50">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to investigate?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Start with unlimited free credits. No credit card required.
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                Launch App Now <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-between text-sm text-muted-foreground">
          <p>&copy; 2025 OSINT Intelligence. Internal testing.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
