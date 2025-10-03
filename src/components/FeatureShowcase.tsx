import { Card } from "@/components/ui/card";
import { Crop, Sparkles, Check } from "lucide-react";
import { motion } from "framer-motion";
import photoEditingImage from "@assets/generated_images/Photo_editing_hero_image_57eeb047.png";

const photoFeatures = [
  "Professional filters & effects",
  "Crop, rotate & resize tools",
  "Real-time preview",
  "Instant download",
];

export function FeatureShowcase() {
  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Professional Photo Editing Tools
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your photos with our comprehensive suite of professional editing tools
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8">
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

            <div className="aspect-video rounded-lg overflow-hidden border">
              <img
                src={photoEditingImage}
                alt="Photo editing workspace"
                className="w-full h-full object-cover"
              />
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
