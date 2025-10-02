import { Upload, Wand2, Download, Music, Headphones, Play } from "lucide-react";
import { motion } from "framer-motion";

const photoSteps = [
  {
    icon: Upload,
    title: "Upload Photo",
    description: "Drag and drop or select your image",
    color: "photo-accent",
  },
  {
    icon: Wand2,
    title: "Apply Filters",
    description: "Choose from professional presets",
    color: "photo-accent",
  },
  {
    icon: Download,
    title: "Download",
    description: "Get your edited photo instantly",
    color: "photo-accent",
  },
];

const musicSteps = [
  {
    icon: Music,
    title: "Select Mood",
    description: "Choose how you're feeling",
    color: "music-accent",
  },
  {
    icon: Headphones,
    title: "Get Playlist",
    description: "Receive curated recommendations",
    color: "music-accent",
  },
  {
    icon: Play,
    title: "Listen",
    description: "Enjoy on Spotify",
    color: "music-accent",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 px-4 md:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, fast, and intuitive. Transform your content in three easy steps.
          </p>
        </motion.div>

        <div className="space-y-16">
          <div>
            <h3 className="text-xl font-semibold mb-8 text-center flex items-center justify-center gap-2">
              <div className="w-3 h-3 rounded-full bg-photo-accent" />
              Photo Editing
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {photoSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-photo-accent/10 flex items-center justify-center">
                      <step.icon className="h-8 w-8 text-photo-accent" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                    <p className="text-muted-foreground text-sm">
                      {step.description}
                    </p>
                  </div>
                  {index < photoSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-border -translate-x-1/2" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-8 text-center flex items-center justify-center gap-2">
              <div className="w-3 h-3 rounded-full bg-music-accent" />
              Music Discovery
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {musicSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-music-accent/10 flex items-center justify-center">
                      <step.icon className="h-8 w-8 text-music-accent" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                    <p className="text-muted-foreground text-sm">
                      {step.description}
                    </p>
                  </div>
                  {index < musicSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-border -translate-x-1/2" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
