import { NextResponse, type NextRequest } from 'next/server'
import { serialize } from "cookie";
import { db } from "~lib/db";
import { comparePasswords } from "~lib/auth";
import { createJWT } from "~lib/jwt";
import { COOKIE_NAME } from '~env';

export async function POST(
  req: NextRequest,
) {
  const payload = await req.json();
  const { email, password } = payload;
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return NextResponse.json({error: "Invalid login"}, {
      status: 401,
    })
  }

  const isUser = await comparePasswords(password, user.password);

  if (isUser) {
    const jwt = await createJWT(user);
    return new Response('Hello, Next.js!', {
      status: 201,
      headers: {
        'Set-Cookie': serialize(COOKIE_NAME, jwt, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        })
      },
    })
  } else {
    return NextResponse.json({error: "Invalid login"}, {
      status: 401,
    })
  }
}