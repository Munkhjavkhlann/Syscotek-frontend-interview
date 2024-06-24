export async function GET(request: Request) {
  const res = await fetch(`https://api.themoviedb.org/3/trending/all/week`, {
    headers: {
      Authorization: `Bearer ${process.env.MOVIEDB_KEY}`,
    },
  });
  const { results } = await res.json();

  return Response.json(
    results.map((result: any) => ({
      uri: `${result.media_type}_${result.id}`,
      title: result.title ?? result.name,
      poster_url: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
      release_date: result.release_date,
    }))
  );
}
