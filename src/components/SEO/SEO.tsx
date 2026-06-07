import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const SEO = ({
  title = "Anurag Tripathi | AI Product Manager & Founder",
  description = "AI Product Manager & Founder with 6+ years experience building LLM-powered products, voice AI, and ambient intelligence. Shipped 3 production AI products reaching 5000+ users globally.",
  keywords = "AI Product Manager, Founder, Generative AI, LLM Products, Voice AI, Prompt Engineering, RAG Architecture, Ambient Intelligence, Anurag Tripathi",
}: SEOProps) => {
  const siteName = "Anurag Tripathi";
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />

      <link rel="canonical" href="https://yourdomain.com" />
    </Helmet>
  );
};

export default SEO;