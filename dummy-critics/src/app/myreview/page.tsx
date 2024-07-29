"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/app/store/store";
import Link from "next/link";

interface Review {
  id: number;
  body: string;
  created_at: string;
  content_uri: string;
  user?: {
    email?: string;
  };
  content?: {
    poster_url?: string;
    name?: string;
  };
}

const UserReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = useStore((state) => state.token);

  useEffect(() => {
    if (!token) {
      window.location.href = "/";
      return;
    }

    const fetchUserReviews = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/reviews/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch user reviews: ${response.statusText}`
          );
        }

        const data = await response.json();
        setReviews(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserReviews();
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader" />
      </div>
    );
  }

  if (!reviews.length) {
    return <div>You haven't written any reviews yet.</div>;
  }

  return (
    <div className="bg-[#121212] text-[#E0E0E0] pt-16 min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 pb-12 sm:px-6 lg:px-8 xl:px-0 pt-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-[#4CAF50]">
          Your Reviews
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-col md:flex-row border-b border-[#424242] pb-6 mb-6"
            >
              <Link
                href={`/content/${review.content_uri}`}
                className="flex-shrink-0 md:w-1/3 mb-4 md:mb-0"
              >
                <img
                  src={review.content?.poster_url || "/placeholder.png"}
                  alt={review.content?.name || "Content Poster"}
                  className="w-full h-48 object-cover rounded-md cursor-pointer"
                />
              </Link>
              <div className="flex-1 md:pl-4">
                <Link href={`/content/${review.content_uri}`}>
                  <p className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 text-[#4CAF50] cursor-pointer">
                    {review.content?.name || review.content_uri}
                  </p>
                </Link>
                <p className="text-base md:text-lg lg:text-xl font-light text-[#E0E0E0] mb-2">
                  {review.body}
                </p>
                <p className="text-sm md:text-base lg:text-lg text-[#A0A0A0]">
                  {new Date(review.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserReviewsPage;
