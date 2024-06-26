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

export const getContentDetails = async (contentUri: string) => {
  const [contentType, contentId] = contentUri.split("_");

  const res = await fetch(
    `https://api.themoviedb.org/3/${contentType}/${contentId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.MOVIEDB_KEY}`,
      },
    }
  );
  const content = await res.json();

  return {
    uri: contentUri,
    name: content.title ?? content.name,
    overview: content.overview,
    poster_url: `https://image.tmdb.org/t/p/w500${content.poster_path}`,
    backdrop_url: `https://image.tmdb.org/t/p/original${content.backdrop_path}`,
    tagline: content.tagline,
    score: content.vote_avereage,
    genres: content.genres,
  };
};
