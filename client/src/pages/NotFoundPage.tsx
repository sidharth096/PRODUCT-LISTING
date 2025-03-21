import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-secondary-dark">404</h1>
      <p className="text-lg text-secondary-light mt-2">Oops! Page not found.</p>
      <Link
        to="/"
        className="mt-4 px-4 py-2 bg-prirmary-dark text-white rounded-lg hover:bg-prirmary-light transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
