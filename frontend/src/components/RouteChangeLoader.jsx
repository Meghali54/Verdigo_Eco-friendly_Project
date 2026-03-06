import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageLoader from "./PageLoader";

/**
 * Listens to React Router location changes and renders a full-screen
 * PageLoader for a short duration on every navigation, giving users
 * clear visual feedback when switching between pages.
 */
const RouteChangeLoader = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Show the loader immediately when the route changes
    setLoading(true);

    // Hide it after a short delay — long enough to be visible, short
    // enough not to block the user (300 ms feels snappy but noticeable).
    const timer = setTimeout(() => setLoading(false), 300);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return loading ? <PageLoader /> : null;
};

export default RouteChangeLoader;
