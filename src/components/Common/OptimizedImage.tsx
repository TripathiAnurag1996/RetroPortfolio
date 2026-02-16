import { memo } from 'react'

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  loading?: "lazy" | "eager";
  priority?: boolean;
}

/**
 * OptimizedImage component that uses <picture> for WebP support
 * and explicit dimensions to prevent CLS.
 */
const OptimizedImage = ({ 
  src, 
  alt, 
  className, 
  width, 
  height, 
  loading = "lazy", 
  priority = false 
}: OptimizedImageProps) => {
  // Determine WebP source
  const isPublicAsset = src.startsWith('/') || !src.includes('://')
  const webpSrc = isPublicAsset ? src.replace(/\.(jpg|jpeg|png)$/i, '.webp') : null

  return (
    <picture className={className}>
      {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : loading}
        decoding="async"
        className={className}
        style={{ 
          maxWidth: '100%', 
          height: 'auto',
          aspectRatio: width && height ? `${width} / ${height}` : 'auto'
        }}
      />
    </picture>
  )
}

export default memo(OptimizedImage)
