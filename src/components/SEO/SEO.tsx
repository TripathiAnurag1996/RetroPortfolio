import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  keywords?: string;
}

const SEO = ({
  title = "Anurag Tripathi | AI Product Manager & Founder",
  keywords = "AI Product Manager, Founder, Generative AI, LLM Products, Voice AI, Prompt Engineering, RAG Architecture, Ambient Intelligence, Anurag Tripathi",
}: SEOProps) => {
  const siteName = "Anurag Tripathi";
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>

      <meta name="keywords" content={keywords} />

      <meta property="og:site_name" content={siteName} />
    </Helmet>
  );
};

export default SEO;