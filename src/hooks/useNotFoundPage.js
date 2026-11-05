import { useEffect } from "react";

// Marks <html data-not-found> while a 404 view is mounted so site-wide banners
// (PromoBar, BlackFridayBanner) can hide themselves in CSS.
const useNotFoundPage = () => {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.notFound = "";
    return () => delete root.dataset.notFound;
  }, []);
};

export default useNotFoundPage;
