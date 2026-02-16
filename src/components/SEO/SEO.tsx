import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const SEO = ({
  title = "Anurag Tripathi | AI Product Manager",
  description = "AI Product Manager with 5+ years experience building LLM-powered products. Expertise in product strategy, model evaluation, RAG architectures, and prompt engineering.",
  keywords = "AI Product Manager, LLM Product Strategy, Generative AI, Product Management, RAG Architecture, Prompt Engineering, Anurag Tripathi",
}: SEOProps) => {
  const siteName = "Anurag Tripathi";
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Dynamic Overrides only */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

export default SEO;
