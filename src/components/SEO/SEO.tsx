import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const SEO = ({
  title = "Anurag Tripathi | AI Product Manager",
  description = "AI Product Manager with 5+ years experience building LLM-powered and AI-driven products in B2B SaaS. Expertise in AI product strategy, model evaluation frameworks, human-in-the-loop systems, RAG architectures, and prompt engineering.",
  keywords = "AI Product Manager, Generative AI, LLM Products, AI Product Strategy, Machine Learning Product Manager, Prompt Engineering, RAG Architecture, AI Systems, Product Strategy, Anurag Tripathi",
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