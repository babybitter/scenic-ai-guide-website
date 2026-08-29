/**
 * @fileoverview 页面内容区块的通用标题组件。
 *
 * @description
 * 统一渲染眉题、主标题和可选说明正文，并支持左对齐或居中布局。
 */

/**
 * @typedef {object} SectionHeadingProps
 * @description 内容区块标题的文本与对齐配置。
 * @property {string} eyebrow 显示在主标题上方的眉题文本。
 * @property {string} title 区块主标题。
 * @property {string} [body] 主标题下方的可选说明正文。
 * @property {'left'|'center'} [align='left'] 标题内容的对齐方式。
 */
interface SectionHeadingProps {
  eyebrow: string
  title: string
  body?: string
  align?: 'left' | 'center'
}

/**
 * @description 渲染统一样式的内容区块标题，并按需展示说明正文和居中样式。
 * @param {SectionHeadingProps} props 组件属性。
 * @param {string} props.eyebrow 主标题上方的眉题文本。
 * @param {string} props.title 区块主标题。
 * @param {string} [props.body] 主标题下方的可选说明正文。
 * @param {'left'|'center'} [props.align='left'] 标题内容的对齐方式。
 * @returns {import('react').JSX.Element} 结构统一的区块标题元素。
 * @example
 * <SectionHeading eyebrow="核心能力" title="让每一次游览都被理解" align="center" />
 */
export function SectionHeading({ eyebrow, title, body, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={`section-heading ${align === 'center' ? 'is-center' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
    </div>
  )
}
