import React from "react";

export default function SearchBar({ query, setQuery, onSearch }) {
  return (
    <div className="flex gap-3 mb-8 w-full max-w-2xl">
      <input
        type="search"
        aria-label="Search books"
        placeholder="Search books by title, author, ISBN..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") onSearch(); }}
        className="flex-1 p-3 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-white placeholder-gray-400"
      />
      <button
        onClick={onSearch}
        className="px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold transition"
      >
        Search
      </button>
    </div>
  );
}
