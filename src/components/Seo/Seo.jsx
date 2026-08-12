import { Helmet } from "react-helmet-async";

const SITE_URL = "https://ingversionsdigital.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/seo/og-image.jpg`;

const Seo = ({ title, description, path = "", image = DEFAULT_OG_IMAGE }) => {
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default Seo;