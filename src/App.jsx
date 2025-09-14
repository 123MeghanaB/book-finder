import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import BookCard from "./components/BookCard";

// Static book data
const staticBooks = [
  { author_name: ["Peter Steele"], first_publish_year: 1992, key: "/works/OL8008880W", title: "Hilarious book-titles & authors" },
  { author_name: ["G. Douglas"], first_publish_year: 1922, key: "/works/OL7645738W", title: "A gossip on book-titles" },
  { author_name: ["Charles Rockwell Lanman"], first_publish_year: 1909, key: "/works/OL33140796W", title: "Pali book-titles and their brief designations" },
];

export default function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState(staticBooks);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBooks = async ({ loadMore = false } = {}) => {
    const trimmed = query.trim();
    if (!trimmed) {
      setError("Please enter a search term.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const nextPage = loadMore ? page + 1 : 1;
      const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(trimmed)}&page=${nextPage}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      const docs = Array.isArray(data.docs) ? data.docs : [];

      if (docs.length === 0 && !loadMore) {
        setBooks([]);
        setError("No results found.");
        setPage(1);
      } else {
        const slice = docs.slice(0, 12);
        if (loadMore) {
          setBooks((prev) => [...prev, ...slice]);
          setPage(nextPage);
        } else {
          setBooks(slice);
          setPage(1);
        }
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">📚 Book Finder</h1>

      <SearchBar query={query} setQuery={setQuery} onSearch={() => fetchBooks({ loadMore: false })} />

      {loading && <p className="text-gray-600 mb-4">Loading...</p>}
      {error && <p className="text-red-600 mb-4 font-medium">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {books.map((book, idx) => (
          <BookCard key={book.key ?? idx} book={book} />
        ))}
      </div>

      {books.length > 0 && !loading && query.trim() !== "" && (
        <div className="mt-6">
          <button
            onClick={() => fetchBooks({ loadMore: true })}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
          >
            Load more
          </button>
        </div>
      )}

      <p className="text-xs text-gray-400 mt-6">
        Data from Open Library API — initially shows static JSON.
      </p>
    </div>
  );
}
