type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 96 96"
      className={className}
      role="img"
      aria-label="Ahsan Bashir logo"
      fill="none"
    >
      <circle cx="48" cy="48" r="45" stroke="currentColor" strokeWidth="2.75" />
      <circle
        cx="48"
        cy="48"
        r="39"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeDasharray="2 4.5"
      />
      <path d="M48 3.5 50.75 6 48 8.5 45.25 6Z" fill="var(--primary, currentColor)" />
      <path d="M48 87.5 50.75 90 48 92.5 45.25 90Z" fill="var(--primary, currentColor)" />
      <text
        x="48"
        y="49"
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, 'Times New Roman', serif"
        fontWeight="700"
        fontSize="30"
        fill="currentColor"
      >
        AB
      </text>
      <line x1="28" y1="60" x2="68" y2="60" stroke="currentColor" strokeWidth="1.5" />
      <text
        x="48"
        y="68.5"
        textAnchor="middle"
        fontFamily="'Inter', system-ui, sans-serif"
        fontWeight="600"
        fontSize="6.2"
        letterSpacing="1.6"
        fill="currentColor"
      >
        AHSAN BASHIR
      </text>
    </svg>
  );
}
