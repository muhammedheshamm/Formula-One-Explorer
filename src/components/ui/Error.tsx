import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Error({ message }: { message?: string }) {
  return (
    <div className="flex justify-center items-center h-[500px]">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Oops!</h1>
        <h2 className="text-2xl font-semibold mb-4">Something went wrong</h2>
        <p className="text-gray-600 mb-8">{message || "We're sorry, but an unexpected error has occurred."}</p>
        <Link
          to="/"
          className="flex items-center justify-center font-medium text-primary-200 hover:text-primary-300 w-fit mx-auto"
        >
          <ChevronLeft className="inline-block mr-1" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
