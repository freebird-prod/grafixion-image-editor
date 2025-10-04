declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

import { Card } from "@/components/ui/card";

export function InteractiveDemo() {
  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Try Photo Editor</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience our professional photo editing tools firsthand
          </p>
        </div>

        <Card className="p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold mb-2">Photo Editor Preview</h3>
            <p className="text-muted-foreground">
              Upload, edit, and transform your photos
            </p>
          </div>

          <div className="aspect-video rounded-lg border-2 border-dashed border-border bg-card flex flex-col items-center justify-center gap-4 mb-6">
            {/* simple SVG placeholder instead of external icon component */}
            <svg className="h-16 w-16 text-muted-foreground" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
              <path d="M21 15l-5-5-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <div className="text-center">
              <p className="font-medium mb-1">Drag & drop your photo here</p>
              <p className="text-sm text-muted-foreground">or click to browse</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6">
            {["Original", "B&W", "Vintage", "Vibrant"].map((filter) => (
              <button
                key={filter}
                className="h-20 border rounded-lg flex items-center justify-center text-sm font-medium hover:bg-accent transition-colors"
                data-testid={`button-filter-${filter.toLowerCase()}`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="flex justify-center">
            <a href="/photo-studio">
              <button className="bg-photo-accent hover:bg-photo-accent/90 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Try Photo Editor
              </button>
            </a>
          </div>
        </Card>
      </div>
    </section>
  );
}

export default InteractiveDemo;
