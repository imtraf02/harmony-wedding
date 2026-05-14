import Image from 'next/image';

interface OptimizedImageProps {
  src        : string;
  alt        : string;
  width?     : number;
  height?    : number;
  fill?      : boolean;
  priority?  : boolean;
  className? : string;
  blurDataURL?: string;
  sizes?     : string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill     = false,
  priority = false,
  className,
  blurDataURL,
  sizes,
}: OptimizedImageProps) {
  const placeholder = blurDataURL ? 'blur' : 'empty';

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={className}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        sizes={sizes ?? '100vw'}
        style={{ objectFit: 'cover' }}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 800}
      height={height ?? 600}
      priority={priority}
      className={className}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      sizes={sizes}
    />
  );
}
