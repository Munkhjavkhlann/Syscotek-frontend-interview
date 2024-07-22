import prisma from "@/prisma/client";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
    select: {
      id: true,
      email: true,
      password: true,
    },
  });

  if (!user) {
    return new Response(`Authentication error.`, {
      status: 401,
    });
  }

  const match = bcrypt.compareSync(password, user?.password);

  if (!match) {
    return new Response(`Authentication error.`, {
      status: 401,
    });
  }

  const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return Response.json({ token: accessToken });
}
