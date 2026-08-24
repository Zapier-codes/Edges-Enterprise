import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-8xl md:text-9xl font-bold gold-gradient-text mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">Page not found</h2>
      <p className="text-[var(--text-muted)] mb-8 max-w-md">The page you're looking for doesn't exist or has been moved.</p>
      <Link
        to="/"
        className="rounded-full bg-[#FED500] text-[#090909] px-8 py-3 text-sm font-semibold hover:bg-[#e5c000] transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;
