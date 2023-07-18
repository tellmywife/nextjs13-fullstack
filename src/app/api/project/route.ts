import { NextResponse, type NextRequest } from 'next/server'
import { cookies } from "next/headers";
import { db } from "~lib/db";
import { validateJWT } from "~lib/jwt";
import { COOKIE_NAME } from '~env';

export async function POST(req: NextRequest) {
  const user = await validateJWT(cookies().get(COOKIE_NAME).value);
  const payload = await req.json();
  const { name } = payload;

  await db.project.create({
    data: {
      name,
      ownerId: user.id,
    },
  });

  return NextResponse.json({data: { message: "ok" }}, {
    status: 201,
  })
}