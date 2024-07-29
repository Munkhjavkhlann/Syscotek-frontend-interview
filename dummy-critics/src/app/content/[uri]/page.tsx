"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/app/store/store";

interface Genre {
  id: number;
  name: string;
}

interface MovieDetails {
  name: string;
  overview: string;
  poster_url: string;
  backdrop_url: string;
  tagline: string;
  genres: Genre[];
}

interface Review {
  id: number;
  body: string;
  created_at: string;
  user?: {
    email?: string;
  };
}

const MovieDetailsPage = ({ params }: { params: { uri: string } }) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewBody, setReviewBody] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { uri } = params;
  const token = useStore((state) => state.token);
  const user = useStore((state) => state.user);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await fetch(
          `http://localhost:3000/api/contents/${uri}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!movieResponse.ok) {
          throw new Error(
            `Failed to fetch movie details: ${movieResponse.statusText}`
          );
        }

        const data = await movieResponse.json();
        setMovieDetails(data);

        const reviewsResponse = await fetch(
          `http://localhost:3000/api/reviews?content_uri=${uri}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!reviewsResponse.ok) {
          throw new Error(
            `Failed to fetch reviews: ${reviewsResponse.statusText}`
          );
        }

        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [uri, token]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`http://localhost:3000/api/reviews`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content_uri: uri,
          body: reviewBody,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit review: ${response.statusText}`);
      }

      const newReview = await response.json();
      setReviews((prevReviews) => [...prevReviews, newReview]);
      setReviewBody("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader" />
      </div>
    );
  }

  if (!movieDetails) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="bg-[#121212] text-[#E0E0E0] pt-16 min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 pb-12 sm:px-6 lg:px-8 xl:px-0 pt-16">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="md:w-1/3">
            <img
              src={movieDetails.poster_url}
              alt={movieDetails.name}
              className="w-full h-auto rounded-md"
            />
          </div>
          <div className="md:w-2/3 px-4 md:px-8 lg:px-12">
            <div className="flex-col mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#4CAF50]">
                {movieDetails.name}
              </h1>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 text-[#E0E0E0]">
                <p className="text-lg md:text-xl lg:text-2xl font-medium">
                  Directed by :{" "}
                  <span className="font-normal">Jordan Peele</span>
                </p>
                <p className="text-lg md:text-xl lg:text-2xl font-medium">
                  Produced by :{" "}
                  <span className="font-normal">Universal Pictures</span>
                </p>
              </div>
              <div className="border-b-2 border-[#424242] mt-6 mb-8"></div>
            </div>
            <p className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-[#29b75a]">
              {movieDetails.tagline}
            </p>
            <p className="text-xl font-semibold mb-4 text-[#E0E0E0]">
              Synopsis
            </p>
            <p className="text-lg font-light md:text-xl lg:text-2xl mb-8 text-[#E0E0E0]">
              {movieDetails.overview}
            </p>
            <div className="flex gap-4 mb-8">
              {movieDetails.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-[#1E1E1E] text-[#E0E0E0] p-2 rounded-md text-lg"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <div className="mt-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                Reviews
              </h2>
              <ul className="mb-8">
                {reviews.map((review) => (
                  <li
                    key={review.id}
                    className="border-b border-[#424242] pb-6 mb-6"
                  >
                    <p className="text-lg md:text-xl lg:text-2xl font-semibold mb-2">
                      {review.user?.email ?? "Anonymous"}
                    </p>
                    <p className="text-base md:text-lg lg:text-xl font-light text-[#E0E0E0]">
                      {review.body}
                    </p>
                    <p className="text-sm md:text-base lg:text-lg text-[#A0A0A0]">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
              {user ? (
                <form
                  onSubmit={handleReviewSubmit}
                  className="flex flex-col gap-4"
                >
                  <textarea
                    value={reviewBody}
                    onChange={(e) => setReviewBody(e.target.value)}
                    className="bg-[#1E1E1E] text-[#E0E0E0] p-4 rounded-md w-full text-lg"
                    rows={5}
                    placeholder="Write your review here..."
                    required
                  />
                  <button
                    type="submit"
                    className="bg-[#29b75a] text-white py-2 px-4 rounded-md text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              ) : (
                <p className="text-lg md:text-xl lg:text-2xl text-[#E0E0E0]">
                  Please{" "}
                  <a href="/login" className="text-[#4CAF50]">
                    log in
                  </a>{" "}
                  to submit a review.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
