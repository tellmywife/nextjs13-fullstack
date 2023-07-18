import { NextResponse, type NextRequest } from 'next/server'
import { db } from "~lib/db";
import { validateJWT } from "~lib/jwt";
import { COOKIE_NAME } from '~env';

export default async function handler(req: NextRequest, res) {
  const user = await validateJWT(req.cookies[COOKIE_NAME]);
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