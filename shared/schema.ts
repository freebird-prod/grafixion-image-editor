import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const photos = pgTable("photos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  originalUrl: text("original_url").notNull(),
  editedUrl: text("edited_url"),
  filter: text("filter"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const playlists = pgTable("playlists", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  mood: text("mood").notNull(),
  tracks: text("tracks").array().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPhotoSchema = createInsertSchema(photos).omit({
  id: true,
  createdAt: true,
});

export const insertPlaylistSchema = createInsertSchema(playlists).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertPhoto = z.infer<typeof insertPhotoSchema>;
export type Photo = typeof photos.$inferSelect;
export type InsertPlaylist = z.infer<typeof insertPlaylistSchema>;
export type Playlist = typeof playlists.$inferSelect;
