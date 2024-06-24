import prisma from "@/prisma/client";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const assertAuthentication = async (request: Request) => {
  const authHeader = request.headers.get("authorization");

  if (authHeader) {
    var [type, token] = authHeader.split(" ");
  } else {
    throw new Error("Invalid access token.");
  }

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Error("Authentication failed");
    }

    return userId;
  } catch (err) {
    console.log(err);
    throw new Error("Authentication failed.");
  }
};
