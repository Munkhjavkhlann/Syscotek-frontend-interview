import prisma from "@/prisma/client";
import { assertAuthentication, getContentDetails } from "../../utils";

export async function GET(request: Request) {
  try {
    var userId = await assertAuthentication(request);
  } catch (err: any) {
    return new Response(err, { status: 401 });
  }

  const reviewResults = await prisma.review.findMany({
    where: {
      user_id: userId,
    },
  });

  const contents: any = {};
  const reviews: any = [];

  for (const review of reviewResults) {
    if (!contents.hasOwnProperty(review.content_uri)) {
      const content = await getContentDetails(review.content_uri);
      contents[review.content_uri] = content;
    }
    reviews.push({
      ...review,
      content: contents[review.content_uri],
    });
  }

  return Response.json(reviews);
}
