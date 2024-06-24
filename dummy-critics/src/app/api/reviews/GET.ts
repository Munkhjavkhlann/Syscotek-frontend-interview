export async function GET(request: Request) {
  // ?movie_id=
  // const url = new URL(request.url);
  // const movieId = url.searchParams.get("movie_id");
  return Response.json("Movie Reviews");
}
