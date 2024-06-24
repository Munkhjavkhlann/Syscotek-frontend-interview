import prisma from "@/prisma/client";
import { assertAuthentication } from "../../utils";

export async function GET(request: Request) {
  try {
    var userId = await assertAuthentication(request);
  } catch (err: any) {
    return new Response(err, { status: 401 });
  }

  const reviews = await prisma.review.findMany({
    where: {
      user_id: userId,
    },
  });

  return Response.json(reviews);
}
