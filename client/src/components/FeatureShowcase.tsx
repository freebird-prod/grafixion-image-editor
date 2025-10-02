import { Card } from "@/components/ui/card";
import { Crop, Sparkles, Heart, Headphones, Check } from "lucide-react";
import { motion } from "framer-motion";
import moodMockup from "@assets/generated_images/Mood_selector_interface_mockup_8e075363.png";

const photoFeatures = [
  "Professional filters & effects",
  "Crop, rotate & resize tools",
  "Real-time preview",
  "Instant download",
];

const musicFeatures = [
  "Mood-based discovery",
  "Curated playlists",
  "Spotify integration",
  "Personalized recommendations",
];

export function FeatureShowcase() {
  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-photo-accent/10 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-photo-accent" />
                </div>
                <h2 className="text-3xl font-bold">Transform Your Photos</h2>
              </div>

              <p className="text-muted-foreground mb-6">
                Professional-grade photo editing tools right in your browser. Apply
                stunning filters, adjust compositions, and download instantly.
              </p>

              <ul className="space-y-3 mb-8">
                {photoFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-photo-accent mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="aspect-video rounded-lg bg-gradient-to-br from-photo-accent/20 to-photo-accent/5 border border-photo-accent/20 flex items-center justify-center">
                <Crop className="h-12 w-12 text-photo-accent/40" />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-music-accent/10 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-music-accent" />
                </div>
                <h2 className="text-3xl font-bold">Music for Every Mood</h2>
              </div>

              <p className="text-muted-foreground mb-6">
                Discover the perfect soundtrack for any moment. Select your mood and
                get instant playlist recommendations powered by Spotify.
              </p>

              <ul className="space-y-3 mb-8">
                {musicFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-music-accent mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="aspect-video rounded-lg overflow-hidden border">
                <img
                  src={moodMockup}
                  alt="Mood selector interface"
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
