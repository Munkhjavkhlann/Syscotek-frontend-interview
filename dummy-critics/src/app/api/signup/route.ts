import prisma from "@/prisma/client";
const bcrypt = require("bcrypt");

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
    },
  });

  return Response.json({
    id: result.id,
    email: result.email,
  });
}
