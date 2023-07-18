import { type NextRequest } from 'next/server'
import { serialize } from "cookie";
import { db } from "~lib/db";
import { hashPassword } from "~lib/auth";
import { createJWT } from "~lib/jwt";
import { COOKIE_NAME } from '~env';

export async function POST(
  req: NextRequest,
) {
  const payload = await req.json();
  const { email, password, firstName, lastName } = payload;
  const user = await db.user.create({
    data: {
      email,
      password: await hashPassword(password),
      firstName,
      lastName,
    },  
  });


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
}