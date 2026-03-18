import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongo';
import { ObjectId } from 'mongodb';
import { createHash } from 'crypto';

interface UserDocument {
  _id?: ObjectId;
  email: string;
  passwordHash?: string;
  name?: string;
  createdAt: Date;
}

function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, email, password, name } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    if (action === 'signup') {
      if (!name) {
        return NextResponse.json(
          { error: 'Name is required for signup' },
          { status: 400 }
        );
      }

      // Check if user already exists
      const existingUser = await db.collection<UserDocument>('users').findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { error: 'An account with this email already exists' },
          { status: 409 }
        );
      }

      // Create new user
      const passwordHash = hashPassword(password);
      const newUser: Partial<UserDocument> = {
        email,
        passwordHash,
        name,
        createdAt: new Date(),
      };

      const result = await db.collection('users').insertOne(newUser as UserDocument);
      
      return NextResponse.json({
        success: true,
        message: 'Account created successfully',
        user: {
          id: result.insertedId.toString(),
          email: newUser.email,
          name: newUser.name,
        },
      }, { status: 201 });
    }

    if (action === 'signin') {
      const passwordHash = hashPassword(password);
      const user = await db.collection<UserDocument>('users').findOne({ email, passwordHash });

      if (!user) {
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Signed in successfully',
        user: {
          id: user._id?.toString(),
          email: user.email,
          name: user.name,
        },
      });
    }

    return NextResponse.json(
      { error: 'Invalid action. Use "signup" or "signin"' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Auth API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
