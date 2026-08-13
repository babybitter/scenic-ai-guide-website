interface SectionHeadingProps {
  eyebrow: string
  title: string
  body?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ eyebrow, title, body, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={`section-heading ${align === 'center' ? 'is-center' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
    </div>
  )
}
