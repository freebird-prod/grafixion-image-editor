import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Image, Music, Smile, Heart, Zap, Cloud, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const moods = [
  { id: "happy", name: "Happy", icon: Smile, gradient: "from-yellow-400 to-orange-400" },
  { id: "romantic", name: "Romantic", icon: Heart, gradient: "from-pink-400 to-rose-400" },
  { id: "energetic", name: "Energetic", icon: Zap, gradient: "from-green-400 to-emerald-400" },
  { id: "calm", name: "Calm", icon: Cloud, gradient: "from-blue-400 to-cyan-400" },
  { id: "motivated", name: "Motivated", icon: Sun, gradient: "from-purple-400 to-indigo-400" },
];

export function InteractiveDemo() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Try It Yourself</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the power of our dual-module platform
          </p>
        </motion.div>

        <Tabs defaultValue="photo" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="photo" data-testid="tab-photo">
              <Image className="h-4 w-4 mr-2" />
              Photo Studio
            </TabsTrigger>
            <TabsTrigger value="music" data-testid="tab-music">
              <Music className="h-4 w-4 mr-2" />
              Mood Music
            </TabsTrigger>
          </TabsList>

          <TabsContent value="photo">
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
                  <Button
                    key={filter}
                    variant="outline"
                    className="h-20"
                    data-testid={`button-filter-${filter.toLowerCase()}`}
                  >
                    {filter}
                  </Button>
                ))}
              </div>

              <div className="flex justify-center">
                <Link href="/photo-studio">
                  <Button
                    size="lg"
                    className="bg-photo-accent hover:bg-photo-accent text-photo-accent-foreground"
                    data-testid="button-try-photo-editor"
                  >
                    Try Photo Editor
                  </Button>
                </Link>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="music">
            <Card className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold mb-2">Choose Your Mood</h3>
                <p className="text-muted-foreground">
                  Select how you're feeling and discover perfect playlists
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {moods.map((mood) => (
                  <motion.button
                    key={mood.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedMood(mood.id)}
                    className={`aspect-square rounded-xl bg-gradient-to-br ${mood.gradient} p-4 flex flex-col items-center justify-center gap-2 text-white transition-all ${
                      selectedMood === mood.id
                        ? "ring-4 ring-music-accent ring-offset-2 ring-offset-background"
                        : ""
                    }`}
                    data-testid={`button-mood-${mood.id}`}
                  >
                    <mood.icon className="h-8 w-8" />
                    <span className="font-semibold text-sm">{mood.name}</span>
                  </motion.button>
                ))}
              </div>

              {selectedMood && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <p className="text-muted-foreground mb-4">
                    Perfect! We'll find the best {moods.find(m => m.id === selectedMood)?.name.toLowerCase()} playlist for you
                  </p>
                  <Link href="/mood-music">
                    <Button
                      size="lg"
                      className="bg-music-accent hover:bg-music-accent text-music-accent-foreground"
                      data-testid="button-generate-playlist"
                    >
                      Generate Playlist
                    </Button>
                  </Link>
                </motion.div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
