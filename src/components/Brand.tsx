import { Link } from 'react-router-dom'

export function Brand() {
  const brandMark = `${import.meta.env.BASE_URL}brand/brand-mark.png`

  return (
    <Link className="brand" to="/" aria-label="数智游踪首页">
      <img className="brand-mark" src={brandMark} alt="" />
      <span className="brand-copy">
        <strong>数智游踪</strong>
        <small>AI SCENIC GUIDE</small>
      </span>
    </Link>
  )
}
