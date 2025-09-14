import React from "react";

export default function BookCard({ book }) {
  return (
    <article className="bg-gradient-to-b from-gray-800 to-gray-900 text-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition-shadow flex flex-col items-center">
      {book.cover_i ? (
        <img
          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
          alt={`${book.title} cover`}
          className="mb-4 rounded-lg w-36 h-48 object-cover shadow-md"
        />
      ) : (
        <div className="bg-gray-700 h-48 w-36 flex items-center justify-center mb-4 rounded-lg text-gray-300 font-medium">
          No Image
        </div>
      )}

      <h2 className="text-lg font-bold text-center mb-1">{book.title}</h2>
      <p className="text-sm text-gray-300 text-center mb-1">
        {book.author_name?.join(", ") || "Unknown author"}
      </p>
      <p className="text-xs text-gray-400">{book.first_publish_year || "Year N/A"}</p>
    </article>
  );
}
