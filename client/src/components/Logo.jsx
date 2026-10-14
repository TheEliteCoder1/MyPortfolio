// Using inline svg (for my initials) as the logo
export default function Logo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" role="img" aria-label="Portfolio logo">
      <rect width="36" height="36" rx="8" fill="var(--accent)" />
      <text x="18" y="25" fontSize="20" fontWeight="700" textAnchor="middle" fill="#fff" fontFamily="Georgia, serif">RJ</text>
    </svg> 
  );
}
