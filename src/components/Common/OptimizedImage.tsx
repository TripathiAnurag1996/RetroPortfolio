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
  // Only suggest webp if specifically for jpg/jpeg where we likely have them, 
  // or better, don't blindly assume. For now, let's fix the PNG issue.
  const webpSrc = isPublicAsset && !src.endsWith('.png') ? src.replace(/\.(jpg|jpeg)$/i, '.webp') : null

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
