import PlaceholderImage from './PlaceholderImage'

type SectionImageProps = {
  alt: string
  src?: string
  className?: string
  fit?: 'cover' | 'contain'
}

export default function SectionImage({
  alt,
  src,
  className = '',
  fit = 'cover',
}: SectionImageProps) {
  if (!src) {
    return <PlaceholderImage label={alt} className={className} />
  }

  const objectFit = fit === 'contain' ? 'object-contain' : 'object-cover'

  return <img src={src} alt={alt} loading="lazy" className={`${objectFit} ${className}`} />
}
