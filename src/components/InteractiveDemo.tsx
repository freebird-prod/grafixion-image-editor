import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Cloud, Heart, Image, Smile, Sun, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const moods = [
  {
    id: "happy", name: "Happy", icon:
      Smile, gradient: "from-yellow-400 to-orange-400"
  },
  { id: "romantic", name: "Romantic", icon: Heart, gradient: "from-pink-400 to-rose-400" },
  { id: "energetic", name: "Energetic", icon: Zap, gradient: "from-green-400 to-emerald-400" },
  { id: "calm", name: "Calm", icon: Cloud, gradient: "from-blue-400 to-cyan-400" },
  { id: "motivated", name: "Motivated", icon: Sun, gradient: "from-purple-400 to-indigo-400" },
];

export function InteractiveDemo() {
  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Try Photo Editor</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience our professional photo editing tools firsthand
          </p>
        </motion.div>

        <Card className="p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold mb-2">Photo Editor Preview</h3>
            <p className="text-muted-foreground">
              Upload, edit, and transform your photos
            </p>
          </div>

          <div className="aspect-video rounded-lg border-2 border-dashed border-border bg-card flex flex-col items-center justify-center gap-4 mb-6">
            <Image className="h-16 w-16 text-muted-foreground" />
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
            <Link href="/photo-studio">
              <button className="bg-photo-accent hover:bg-photo-accent/90 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Try Photo Editor
              </button>
            </Link>
          </div>
        </Card>
      </div>
    </section>
  );
}
