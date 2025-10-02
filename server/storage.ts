import { type User, type InsertUser, type Photo, type InsertPhoto, type Playlist, type InsertPlaylist } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createPhoto(photo: InsertPhoto): Promise<Photo>;
  getPhoto(id: string): Promise<Photo | undefined>;
  getAllPhotos(): Promise<Photo[]>;
  updatePhoto(id: string, photo: Partial<InsertPhoto>): Promise<Photo | undefined>;
  
  createPlaylist(playlist: InsertPlaylist): Promise<Playlist>;
  getPlaylist(id: string): Promise<Playlist | undefined>;
  getAllPlaylists(): Promise<Playlist[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private photos: Map<string, Photo>;
  private playlists: Map<string, Playlist>;

  constructor() {
    this.users = new Map();
    this.photos = new Map();
    this.playlists = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createPhoto(insertPhoto: InsertPhoto): Promise<Photo> {
    const id = randomUUID();
    const photo: Photo = { 
      id,
      originalUrl: insertPhoto.originalUrl,
      editedUrl: insertPhoto.editedUrl ?? null,
      filter: insertPhoto.filter ?? null,
      createdAt: new Date() 
    };
    this.photos.set(id, photo);
    return photo;
  }

  async getPhoto(id: string): Promise<Photo | undefined> {
    return this.photos.get(id);
  }

  async getAllPhotos(): Promise<Photo[]> {
    return Array.from(this.photos.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async updatePhoto(id: string, updates: Partial<InsertPhoto>): Promise<Photo | undefined> {
    const photo = this.photos.get(id);
    if (!photo) return undefined;
    
    const updated: Photo = { ...photo, ...updates };
    this.photos.set(id, updated);
    return updated;
  }

  async createPlaylist(insertPlaylist: InsertPlaylist): Promise<Playlist> {
    const id = randomUUID();
    const playlist: Playlist = { 
      ...insertPlaylist, 
      id, 
      createdAt: new Date() 
    };
    this.playlists.set(id, playlist);
    return playlist;
  }

  async getPlaylist(id: string): Promise<Playlist | undefined> {
    return this.playlists.get(id);
  }

  async getAllPlaylists(): Promise<Playlist[]> {
    return Array.from(this.playlists.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}

export const storage = new MemStorage();
