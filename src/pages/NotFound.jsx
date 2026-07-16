import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-5 pt-24">
      <span className="font-display text-7xl text-forest-700">404</span>
      <h1 className="font-display text-2xl text-forest-800 mt-4">This page has wandered off</h1>
      <p className="text-forest-700/60 mt-2 max-w-sm">
        The page you're looking for doesn't exist. Let's get you back to the catalog.
      </p>
      <Link to="/" className="btn-primary mt-8">
        Back to Home
      </Link>
    </div>
  );
}
