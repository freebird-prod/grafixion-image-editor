import { Button } from "@/components/ui/button";
import { Image, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/Photo_editing_hero_image_57eeb047.png";

export function Hero() {
  return (
    <section className="relative h-screen max-h-[800px] overflow-hidden">
      <div className="grid lg:grid-cols-2 h-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
          <img
            src={heroImage}
            alt="Photo editing workspace"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col justify-center px-4 md:px-8 lg:px-16 py-12 lg:py-0"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Transform Your Photos
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
            Professional photo editing with instant filters and effects.
            Edit your photos and bring your creative vision to life.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <Link href="/photo-studio">
              <Button
                size="lg"
                className="bg-photo-accent hover:bg-photo-accent text-photo-accent-foreground border border-photo-accent-border"
                data-testid="button-edit-photos"
              >
                <Image className="mr-2 h-5 w-5" />
                Edit Photos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background" />
              <div className="w-8 h-8 rounded-full bg-photo-accent/20 border-2 border-background" />
            </div>
            <span>Join 10,000+ creators transforming their content</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
