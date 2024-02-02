'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This Home component is used to redirect users from the root path ("/") to the "/add-forecast" path.
// We're using client-side redirection here because this is a static page. 
// In Next.js static sites, server-side redirection (e.g., using next.config.js for redirects) is not supported.
// By leveraging the useEffect hook and the useRouter hook from 'next/navigation', 
// we can programmatically navigate users to the desired path as soon as this component mounts in the browser.

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/add-forecast');
  }, [router]);

  return null;
};

export default Home;
