import { Button } from "@/components/ui/button";
import { Image, Music, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export function FinalCTA() {
  return (
    <section className="py-32 px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Creative Workflow?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of creators using our platform to edit stunning photos
            and discover the perfect music for every moment.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Link href="/photo-studio">
              <Button
                size="lg"
                className="bg-photo-accent hover:bg-photo-accent text-photo-accent-foreground border border-photo-accent-border"
                data-testid="button-get-started-photo"
              >
                <Image className="mr-2 h-5 w-5" />
                Start Editing Photos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/mood-music">
              <Button
                size="lg"
                className="bg-music-accent hover:bg-music-accent text-music-accent-foreground border border-music-accent-border"
                data-testid="button-get-started-music"
              >
                <Music className="mr-2 h-5 w-5" />
                Discover Music
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            Free to start • No credit card required • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
