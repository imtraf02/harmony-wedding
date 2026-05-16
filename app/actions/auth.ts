'use server';

import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import bcrypt from 'bcryptjs';
import { getDb } from '@/lib/db';
import { sessionOptions, SessionData } from '@/lib/auth';

export async function login(username?: string, password?: string) {
  if (!username || !password) {
    return { success: false, message: 'Vui lòng nhập tên đăng nhập và mật khẩu' };
  }

  try {
    const db = getDb();
    const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username) as any;

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return { success: false, message: 'Sai tên đăng nhập hoặc mật khẩu' };
    }

    const c = await cookies();
    const session = await getIronSession<SessionData>(c, sessionOptions);

    session.username = admin.username;
    session.isLoggedIn = true;
    await session.save();

    return { success: true };
  } catch (err) {
    console.error('[AUTH_LOGIN]', err);
    return { success: false, message: 'Lỗi hệ thống' };
  }
}

export async function logout() {
  const c = await cookies();
  const session = await getIronSession<SessionData>(c, sessionOptions);
  session.destroy();
  return { success: true };
}
