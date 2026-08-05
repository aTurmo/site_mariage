import PlaceholderImage from './PlaceholderImage'

type SectionImageProps = {
  alt: string
  src?: string
  className?: string
}

export default function SectionImage({ alt, src, className = '' }: SectionImageProps) {
  if (!src) {
    return <PlaceholderImage label={alt} className={className} />
  }

  return <img src={src} alt={alt} loading="lazy" className={`object-cover ${className}`} />
}
