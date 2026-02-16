import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO = ({
  title = "Anurag Tripathi | AI Product Manager",
  description = "AI Product Manager with 5+ years experience building LLM-powered products. Expertise in product strategy, model evaluation, RAG architectures, and prompt engineering.",
  keywords = "AI Product Manager, LLM Product Strategy, Generative AI, Product Management, RAG Architecture, Prompt Engineering, Anurag Tripathi",
  image = "https://anuragtripathi.pro/og-image.png",
  url = "https://anuragtripathi.pro",
  type = "website",
}: SEOProps) => {
  const siteName = "Anurag Tripathi";
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  // Structured Data (JSON-LD)
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Anurag Tripathi",
    jobTitle: "AI Product Manager",
    url: "https://anuragtripathi.pro",
    image: "https://anuragtripathi.pro/profile.jpg",
    sameAs: [
      "https://www.linkedin.com/in/anuragtripathi-pm/",
      "https://github.com/TripathiAnurag1996",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://anuragtripathi.pro",
    name: "Anurag Tripathi Portfolio",
    description: description,
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Anurag Tripathi",
    url: "https://anuragtripathi.pro",
    logo: "https://anuragtripathi.pro/favicon.svg",
  };

  const projectsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "CreativeWork",
        "name": "AI Product Insight Analyzer",
        "description": "A demo tool for analyzing AI product insights.",
        "url": "https://anuragtripathi.pro/?win=demo"
      },
      {
        "@type": "CreativeWork",
        "name": "Retro OS Portfolio",
        "description": "An interactive retro-themed portfolio website.",
        "url": "https://anuragtripathi.pro"
      }
    ]
  }

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Anurag Tripathi" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(projectsSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
