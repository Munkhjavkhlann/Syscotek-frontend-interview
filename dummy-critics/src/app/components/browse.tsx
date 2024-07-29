"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Content {
  uri: string;
  title: string;
  poster_url: string;
  release_date: string;
}

export const Browse = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const fetchContents = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/contents");
          const data = await response.json();
          setContents(data);
        } catch (error) {
          console.error("Failed to fetch contents:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchContents();
    }
  }, [isMounted]);

  const handleContentClick = (uri: string) => {
    router.push(`/content/${uri}`);
  };

  if (!isMounted) return null;

  return (
    <div className="max-w-screen-xl mx-auto pt-24">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen-minus-nav">
          <div className="loader" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="md:col-span-1">
              <h1 className="text-2xl font-bold mb-4">Top Movie</h1>
            </div>
            <div className="md:col-span-3 flex flex-col relative">
              <div
                className="relative cursor-pointer border-2 border-transparent hover:border-[#29b75a] transition-transform duration-300"
                onClick={() => handleContentClick(contents[0].uri)}
              >
                <iframe
                  width="100%"
                  height="515"
                  src="https://www.youtube.com/embed/hRFY_Fesa9Q?autoplay=1&controls=0&mute=1"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="custom-iframe border-2 border-transparent hover:border-[#1c6f4a] transition-transform duration-300 hover:scale-[1.01]"
                />
                <div
                  className="absolute inset-0 border-2 border-transparent hover:border-[#29b75a] transition-all duration-300"
                  onClick={() => handleContentClick(contents[0].uri)}
                />
              </div>
              <div className="flex justify-between mt-2">
                <div>
                  <p className="text-lg font-semibold">
                    Directed by Michael Bay
                  </p>
                </div>
                <div className="flex">
                  <p className="text-lg font-semibold mr-4">Genre: Action</p>
                  <p className="text-lg font-semibold">
                    Release Date: 2024-07-28
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="md:col-span-1">
              <h1 className="text-2xl font-bold mb-4">Latest Movies</h1>
            </div>
            <div className="md:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {contents.slice(1, 7).map((content) => (
                  <div
                    key={content.uri}
                    className="cursor-pointer border-2 border-transparent hover:border-[#29b75a] transform transition-transform duration-300 hover:scale-[1.01]"
                    onClick={() => handleContentClick(content.uri)}
                  >
                    <img
                      src={content.poster_url}
                      alt={content.title}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <h1 className="text-2xl font-bold mb-4">Action Movies</h1>
            </div>
            <div className="md:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {contents.slice(7).map((content) => (
                  <div
                    key={content.uri}
                    className="cursor-pointer border-2 border-transparent hover:border-[#29b75a] transform transition-transform duration-300 hover:scale-[1.01]"
                    onClick={() => handleContentClick(content.uri)}
                  >
                    <img
                      src={content.poster_url}
                      alt={content.title}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
