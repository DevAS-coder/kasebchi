'use client';

import { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong!</h2>
      <p className="text-gray-600 mb-6">{error.message}</p>
      <button
        onClick={reset}
        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-300"
      >
        Try again
      </button>
    </div>
  );
} 