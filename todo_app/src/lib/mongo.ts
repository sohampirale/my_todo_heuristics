import { MongoClient, Db, Document, Filter, WithId } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'todo_app';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export interface Task {
  _id?: string;
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
  projectId?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  _id?: string;
  name: string;
  color: string;
  createdAt: Date;
}

export interface Seed {
  _id?: string;
  key: string;
  value: boolean;
  updatedAt: Date;
}

export interface Event {
  _id?: string;
  page: string;
  action: string;
  timestamp: Date;
  meta?: Record<string, unknown>;
}

export interface Note {
  _id?: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Run {
  _id?: string;
  name: string;
  createdAt: Date;
  artifacts: string[];
}

export interface User {
  _id?: string;
  email: string;
  passwordHash?: string;
  name?: string;
  createdAt: Date;
}

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(DB_NAME);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function getDb(): Promise<Db> {
  const { db } = await connectToDatabase();
  return db;
}

export async function disconnectFromDatabase(): Promise<void> {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
  }
}

// Helper functions for common operations
export async function find<T extends Document>(collection: string, query: Filter<T> = {}): Promise<WithId<T>[]> {
  const db = await getDb();
  return db.collection<T>(collection).find(query).toArray();
}

export async function findOne<T extends Document>(collection: string, query: Filter<T>): Promise<WithId<T> | null> {
  const db = await getDb();
  return db.collection<T>(collection).findOne(query);
}

export async function insertOne<T extends Document>(collection: string, document: T): Promise<string> {
  const db = await getDb();
  const result = await db.collection(collection).insertOne(document);
  return result.insertedId.toString();
}

export async function updateOne(
  collection: string,
  query: Filter<unknown>,
  update: Record<string, unknown>
): Promise<boolean> {
  const db = await getDb();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await (db.collection(collection) as any).updateOne(query, update);
  return result.modifiedCount > 0 || result.matchedCount > 0;
}

export async function deleteOne(collection: string, query: Filter<unknown>): Promise<boolean> {
  const db = await getDb();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await (db.collection(collection) as any).deleteOne(query);
  return result.deletedCount > 0;
}
