import { SearchInterface } from "@/components/search/search-interface"
import { Sidebar } from "@/components/layout/sidebar"

export default async function DashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="border-b border-border/50 bg-card/50 backdrop-blur sticky top-0 z-40 h-16 flex items-center px-6">
          <h1 className="text-lg font-semibold">Intelligence Dashboard</h1>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <SearchInterface />
          </div>
        </main>
      </div>
    </div>
  )
}
