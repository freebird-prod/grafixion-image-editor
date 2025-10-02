import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, Music, Smile, Heart, Zap, Cloud, Sun, Play, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const moods = [
  { id: "happy", name: "Happy", icon: Smile, gradient: "from-yellow-400 to-orange-400" },
  { id: "romantic", name: "Romantic", icon: Heart, gradient: "from-pink-400 to-rose-400" },
  { id: "energetic", name: "Energetic", icon: Zap, gradient: "from-green-400 to-emerald-400" },
  { id: "calm", name: "Calm", icon: Cloud, gradient: "from-blue-400 to-cyan-400" },
  { id: "motivated", name: "Motivated", icon: Sun, gradient: "from-purple-400 to-indigo-400" },
];

interface Track {
  id: string;
  name: string;
  artist: string;
  album: string;
  duration: string;
  albumArt: string;
  spotifyUrl: string;
}

export default function MoodMusic() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [generatedTracks, setGeneratedTracks] = useState<Track[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generatePlaylistMutation = useMutation({
    mutationFn: async (mood: string) => {
      const res = await apiRequest("POST", "/api/playlists/generate", { mood });
      return res.json() as Promise<{ tracks: Track[] }>;
    },
    onSuccess: (data) => {
      setGeneratedTracks(data.tracks);
      setIsGenerating(false);
      queryClient.invalidateQueries({ queryKey: ["/api/playlists"] });
      toast({
        title: "Playlist generated!",
        description: `Found ${data.tracks.length} perfect tracks for your mood`,
      });
    },
    onError: () => {
      setIsGenerating(false);
      toast({
        title: "Error",
        description: "Failed to generate playlist. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
    setIsGenerating(true);
    setGeneratedTracks([]);
    
    setTimeout(() => {
      generatePlaylistMutation.mutate(moodId);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" data-testid="button-home">
                <Home className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-music-accent/20 flex items-center justify-center">
                <Music className="h-5 w-5 text-music-accent" />
              </div>
              Mood Music
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How are you feeling?
          </h2>
          <p className="text-lg text-muted-foreground">
            Select your mood and discover the perfect playlist
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {moods.map((mood, index) => (
            <motion.button
              key={mood.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleMoodSelect(mood.id)}
              className={`aspect-square rounded-xl bg-gradient-to-br ${mood.gradient} p-6 flex flex-col items-center justify-center gap-3 text-white transition-all ${
                selectedMood === mood.id
                  ? "ring-4 ring-music-accent ring-offset-2 ring-offset-background"
                  : "hover:shadow-lg"
              }`}
              data-testid={`button-mood-${mood.id}`}
            >
              <mood.icon className="h-10 w-10" />
              <span className="font-semibold">{mood.name}</span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-gradient-to-r from-music-accent/20 to-primary/20">
                <div className="w-6 h-6 border-4 border-music-accent border-t-transparent rounded-full animate-spin" />
                <span className="font-medium">Curating your perfect playlist...</span>
              </div>
            </motion.div>
          )}

          {!isGenerating && generatedTracks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-1">
                    Your {moods.find(m => m.id === selectedMood)?.name} Playlist
                  </h3>
                  <p className="text-muted-foreground">
                    {generatedTracks.length} handpicked tracks just for you
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setGeneratedTracks([]);
                    setSelectedMood(null);
                  }}
                  data-testid="button-reset"
                >
                  Choose Another Mood
                </Button>
              </div>

              <div className="grid gap-4">
                {generatedTracks.map((track, index) => (
                  <motion.div
                    key={track.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4 hover-elevate">
                      <div className="flex items-center gap-4">
                        <img
                          src={track.albumArt}
                          alt={track.album}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate">{track.name}</h4>
                          <p className="text-sm text-muted-foreground truncate">
                            {track.artist}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {track.album} • {track.duration}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            data-testid={`button-play-${track.id}`}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => window.open(track.spotifyUrl, "_blank")}
                            data-testid={`button-spotify-${track.id}`}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button
                  size="lg"
                  className="bg-music-accent hover:bg-music-accent text-music-accent-foreground"
                  onClick={() => window.open("https://open.spotify.com", "_blank")}
                  data-testid="button-open-spotify"
                >
                  <Music className="mr-2 h-5 w-5" />
                  Open in Spotify
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
