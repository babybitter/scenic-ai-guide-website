import Link from "next/link";

export function BrandLogo({ compact = false }: Readonly<{ compact?: boolean }>) {
  return (
    <Link className="brand" href="/" aria-label="数智游踪首页">
      <svg className="brand__mark" viewBox="0 0 40 40" role="img" aria-label="数智游踪标志">
        <path className="brand__route" d="M7 29.5c5.8-1 7.1-5.8 7.3-10.1.2-5.1 3-8.8 7.5-8.8 5.4 0 6.5 4.8 5.5 8.8-.8 3.5.1 7.4 5.7 8.6" />
        <circle className="brand__start" cx="7" cy="29.5" r="2.8" />
        <path className="brand__pin" d="M21.8 5.8a8.2 8.2 0 0 0-8.2 8.2c0 6 8.2 14 8.2 14s8.2-8 8.2-14a8.2 8.2 0 0 0-8.2-8.2Zm0 11.6a3.4 3.4 0 1 1 0-6.8 3.4 3.4 0 0 1 0 6.8Z" />
      </svg>
      <span className="brand__copy">
        <strong>数智游踪</strong>
        {!compact ? <small>SMART SCENIC GUIDE</small> : null}
      </span>
    </Link>
  );
}
