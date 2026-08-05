export default function DecorativeBreak() {
  return (
    <div className="flex w-full items-center justify-center gap-6 px-6 py-12 md:gap-8">
      <span className="h-px w-16 bg-outline-variant/50 md:w-24" />
      <svg
        className="h-6 w-6 text-flower-orange/70"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M12 2c-3.5 3-5.5 6.2-5.5 9.3 0 2.6 1.6 4.7 4.4 5.5V22h2.2v-5.2c2.8-.8 4.4-2.9 4.4-5.5C17.5 8.2 15.5 5 12 2Z" />
      </svg>
      <span className="h-px w-16 bg-outline-variant/50 md:w-24" />
    </div>
  )
}
