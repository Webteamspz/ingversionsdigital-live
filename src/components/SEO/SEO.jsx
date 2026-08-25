import { Helmet } from "react-helmet-async";

const SITE_URL = "https://ingversionsdigital.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/seo/og-image.jpg`;

const SEO = ({
  title,
  description,
  path = "",
  image = DEFAULT_OG_IMAGE,
  noindex = false,
  breadcrumb,
  jsonLd,
}) => {
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={
          noindex
            ? "noindex, follow"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
      />
      {!noindex && <link rel="canonical" href={url} />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {!noindex && <meta property="og:url" content={url} />}
      <meta property="og:image" content={image} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {breadcrumb && breadcrumb.length > 1 && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumb.map((item, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: item.name,
              item: `${SITE_URL}${item.path}`,
            })),
          })}
        </script>
      )}

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
