import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import Error from './ui/error';

export default function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div className="mt-20">
      {isRouteErrorResponse(error) ? (
        <Error message={error.data?.message || "Sorry, the page you're looking for doesn't exist or has been moved."} />
      ) : (
        <Error />
      )}
    </div>
  );
}
