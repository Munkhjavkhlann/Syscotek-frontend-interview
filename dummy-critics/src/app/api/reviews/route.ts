import prisma from "@/prisma/client";
const bcrypt = require("bcrypt");
import { assertAuthentication, getContentDetails } from "../utils";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const contentUri = url.searchParams.get("content_uri");

  if (!contentUri) return new Response("Invalid params.", { status: 400 });

  const reviews = await prisma.review.findMany({
    where: {
      content_uri: `${contentUri}`,
    },
  });

  const content = await getContentDetails(contentUri);

  return Response.json(
    reviews.map((review) => ({
      ...review,
      content: content,
    }))
  );
}

export async function PUT(request: Request) {
  try {
    var userId = await assertAuthentication(request);
  } catch (err: any) {
    return new Response(err, { status: 401 });
  }

  const { content_uri, body } = await request.json();

  const [contentType, contentId] = content_uri.split("_");

  const res = await fetch(
    `https://api.themoviedb.org/3/${contentType}/${contentId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.MOVIEDB_KEY}`,
      },
    }
  );
  const data = await res.json();

  if ("success" in data && data.success === false) {
    return new Response("Invalid content.", { status: 404 });
  }

  const review = await prisma.review.create({
    data: {
      content_uri: content_uri,
      body: body,
      user_id: userId,
    },
  });

  return Response.json(review);
}
