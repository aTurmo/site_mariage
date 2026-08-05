type PlaceholderImageProps = {
  label: string
  className?: string
}

export default function PlaceholderImage({ label, className = '' }: PlaceholderImageProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex items-center justify-center bg-surface-container-high px-6 text-center ${className}`}
    >
      <span className="text-label-caps uppercase text-outline">{label}</span>
    </div>
  )
}
