import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPhotoSchema, insertPlaylistSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.post("/api/photos", async (req, res) => {
    try {
      const result = insertPhotoSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          error: fromZodError(result.error).toString() 
        });
      }
      
      const photo = await storage.createPhoto(result.data);
      res.json(photo);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/photos", async (_req, res) => {
    try {
      const photos = await storage.getAllPhotos();
      res.json(photos);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/photos/:id", async (req, res) => {
    try {
      const photo = await storage.getPhoto(req.params.id);
      if (!photo) {
        return res.status(404).json({ error: "Photo not found" });
      }
      res.json(photo);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.patch("/api/photos/:id", async (req, res) => {
    try {
      const result = insertPhotoSchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          error: fromZodError(result.error).toString() 
        });
      }
      
      const photo = await storage.updatePhoto(req.params.id, result.data);
      if (!photo) {
        return res.status(404).json({ error: "Photo not found" });
      }
      res.json(photo);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/playlists/generate", async (req, res) => {
    try {
      const { mood } = req.body;
      if (!mood) {
        return res.status(400).json({ error: "Mood is required" });
      }

      const moodTracks: Record<string, Array<{
        id: string;
        name: string;
        artist: string;
        album: string;
        duration: string;
        albumArt: string;
        spotifyUrl: string;
      }>> = {
        happy: [
          {
            id: "1",
            name: "Good Vibrations",
            artist: "The Beach Boys",
            album: "Smiley Smile",
            duration: "3:36",
            albumArt: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
            spotifyUrl: "https://open.spotify.com"
          },
          {
            id: "2",
            name: "Walking on Sunshine",
            artist: "Katrina and the Waves",
            album: "Walking on Sunshine",
            duration: "3:59",
            albumArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
            spotifyUrl: "https://open.spotify.com"
          },
          {
            id: "3",
            name: "Happy",
            artist: "Pharrell Williams",
            album: "G I R L",
            duration: "3:53",
            albumArt: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
            spotifyUrl: "https://open.spotify.com"
          }
        ],
        romantic: [
          {
            id: "4",
            name: "Perfect",
            artist: "Ed Sheeran",
            album: "÷ (Divide)",
            duration: "4:23",
            albumArt: "https://images.unsplash.com/photo-1518972559570-7cc1309f3229?w=300&h=300&fit=crop",
            spotifyUrl: "https://open.spotify.com"
          },
          {
            id: "5",
            name: "All of Me",
            artist: "John Legend",
            album: "Love in the Future",
            duration: "4:29",
            albumArt: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop",
            spotifyUrl: "https://open.spotify.com"
          },
          {
            id: "6",
            name: "Thinking Out Loud",
            artist: "Ed Sheeran",
            album: "x (Multiply)",
            duration: "4:41",
            albumArt: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=300&h=300&fit=crop",
            spotifyUrl: "https://open.spotify.com"
          }
        ],
        energetic: [
          {
            id: "7",
            name: "Eye of the Tiger",
            artist: "Survivor",
            album: "Eye of the Tiger",
            duration: "4:04",
            albumArt: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop",
            spotifyUrl: "https://open.spotify.com"
          },
          {
            id: "8",
            name: "Pump It",
            artist: "The Black Eyed Peas",
            album: "Monkey Business",
            duration: "3:33",
            albumArt: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop",
            spotifyUrl: "https://open.spotify.com"
          },
          {
            id: "9",
            name: "Thunder",
            artist: "Imagine Dragons",
            album: "Evolve",
            duration: "3:07",
            albumArt: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop",
            spotifyUrl: "https://open.spotify.com"
          }
        ],
        calm: [
          {
            id: "10",
            name: "Weightless",
            artist: "Marconi Union",
            album: "Weightless",
            duration: "8:09",
            albumArt: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
            spotifyUrl: "https://open.spotify.com"
          },
          {
            id: "11",
            name: "Clair de Lune",
            artist: "Claude Debussy",
            album: "Suite bergamasque",
            duration: "5:20",
            albumArt: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
            spotifyUrl: "https://open.spotify.com"
          },
          {
            id: "12",
            name: "Spiegel im Spiegel",
            artist: "Arvo Pärt",
            album: "Alina",
            duration: "8:24",
            albumArt: "https://images.unsplash.com/photo-1460667262436-cf19894f4774?w=300&h=300&fit=crop",
            spotifyUrl: "https://open.spotify.com"
          }
        ],
        motivated: [
          {
            id: "13",
            name: "Stronger",
            artist: "Kanye West",
            album: "Graduation",
            duration: "5:12",
            albumArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
            spotifyUrl: "https://open.spotify.com"
          },
          {
            id: "14",
            name: "Lose Yourself",
            artist: "Eminem",
            album: "8 Mile Soundtrack",
            duration: "5:26",
            albumArt: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
            spotifyUrl: "https://open.spotify.com"
          },
          {
            id: "15",
            name: "Remember the Name",
            artist: "Fort Minor",
            album: "The Rising Tied",
            duration: "3:50",
            albumArt: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
            spotifyUrl: "https://open.spotify.com"
          }
        ]
      };

      const tracks = moodTracks[mood.toLowerCase()] || moodTracks.happy;
      const tracksData = JSON.stringify(tracks);

      const playlist = await storage.createPlaylist({
        mood: mood,
        tracks: [tracksData]
      });

      res.json({
        ...playlist,
        tracks: tracks
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/playlists", async (_req, res) => {
    try {
      const playlists = await storage.getAllPlaylists();
      const formatted = playlists.map(p => ({
        ...p,
        tracks: p.tracks.length > 0 ? JSON.parse(p.tracks[0]) : []
      }));
      res.json(formatted);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
