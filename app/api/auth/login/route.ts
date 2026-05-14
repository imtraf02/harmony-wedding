import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import bcrypt from 'bcryptjs';
import { getDb } from '@/lib/db';
import { sessionOptions, SessionData } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const res = new NextResponse();
  const session = await getIronSession<SessionData>(req, res, sessionOptions);

  try {
    const { username, password } = await req.json();

    const db    = getDb();
    const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username) as any;

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return NextResponse.json(
        { message: 'Invalid username or password' },
        { status: 401 }
      );
    }

    session.username = admin.username;
    session.isLoggedIn = true;
    await session.save();

    return res; // res contains the session cookie
  } catch (err) {
    console.error('[AUTH_LOGIN]', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
