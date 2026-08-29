/**
 * @fileoverview 支持轻量磁吸跟随效果的按钮与外部链接组件。
 *
 * @description
 * 根据鼠标与控件中心的距离更新 CSS 位移变量，并在减少动态效果偏好、离开范围或失焦时恢复原位。
 */
import { useEffect, useRef, type PointerEvent as ReactPointerEvent, type ReactNode, type RefObject } from 'react'

/**
 * @typedef {object} MagneticButtonProps
 * @description 磁吸按钮组件的显示内容、无障碍名称及交互配置。
 * @property {ReactNode} children 按钮或链接内部显示的 React 节点。
 * @property {string} className 调用方传入的基础样式类名。
 * @property {string} ariaLabel 控件的无障碍名称。
 * @property {string} [href] 外部链接地址；存在时组件渲染为锚点。
 * @property {() => void} [onClick] 按钮模式下触发的点击回调。
 */
interface MagneticButtonProps {
  children: ReactNode
  className: string
  ariaLabel: string
  href?: string
  onClick?: () => void
}

const MAGNET_RADIUS = 14
const MAGNET_STRENGTH = 0.12

/**
 * @description 渲染带有轻微磁吸位移反馈的按钮或外部链接，并尊重用户的减少动态效果偏好。
 * @param {MagneticButtonProps} props 组件属性。
 * @param {ReactNode} props.children 控件内部显示的 React 节点。
 * @param {string} props.className 调用方传入的基础样式类名。
 * @param {string} props.ariaLabel 控件的无障碍名称。
 * @param {string} [props.href] 外部链接地址；提供时使用新窗口打开链接。
 * @param {() => void} [props.onClick] 按钮模式下的点击回调。
 * @returns {import('react').JSX.Element} 根据 `href` 渲染的磁吸链接或磁吸按钮。
 * @example
 * <MagneticButton className="icon-button" ariaLabel="切换主题" onClick={toggleTheme}>
 *   切换
 * </MagneticButton>
 */
export function MagneticButton({ children, className, ariaLabel, href, onClick }: MagneticButtonProps) {
  const elementRef = useRef<HTMLElement>(null)

  /**
   * @description 根据指针位置与控件中心的距离计算磁吸偏移，并将结果写入 CSS 自定义属性。
   * @param {number} clientX 指针相对于浏览器视口左侧的横坐标。
   * @param {number} clientY 指针相对于浏览器视口顶部的纵坐标。
   * @returns {void} 不返回值。
   * @example
   * updateMagnet(event.clientX, event.clientY)
   */
  const updateMagnet = (clientX: number, clientY: number) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const element = elementRef.current
    if (!element) return

    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const offsetX = clientX - centerX
    const offsetY = clientY - centerY
    const distance = Math.hypot(offsetX, offsetY)

    if (distance <= Math.max(rect.width, rect.height) / 2 + MAGNET_RADIUS) {
      element.style.setProperty('--magnetic-x', `${offsetX * MAGNET_STRENGTH}px`)
      element.style.setProperty('--magnetic-y', `${offsetY * MAGNET_STRENGTH}px`)
    }
  }

  /**
   * @description 处理控件上的鼠标移动，仅对鼠标指针启用磁吸位置更新。
   * @param {ReactPointerEvent<HTMLElement>} event React 指针移动事件。
   * @returns {void} 不返回值。
   * @example
   * onPointerMove(event)
   */
  const onPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    updateMagnet(event.clientX, event.clientY)
  }

  /**
   * @description 将当前控件的横向和纵向磁吸偏移恢复为零。
   * @returns {void} 不返回值。
   * @example
   * reset()
   */
  const reset = () => {
    const element = elementRef.current
    if (!element) return
    element.style.setProperty('--magnetic-x', '0px')
    element.style.setProperty('--magnetic-y', '0px')
  }

  useEffect(() => {
    /**
     * @description 监听窗口级鼠标移动，在控件扩展感应范围内更新磁吸位置，离开范围后恢复原位。
     * @param {PointerEvent} event 浏览器原生指针移动事件。
     * @returns {void} 不返回值。
     * @example
     * window.addEventListener('pointermove', onWindowPointerMove)
     */
    const onWindowPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      const element = elementRef.current
      if (!element) return
      const rect = element.getBoundingClientRect()
      const expandedLeft = rect.left - MAGNET_RADIUS
      const expandedRight = rect.right + MAGNET_RADIUS
      const expandedTop = rect.top - MAGNET_RADIUS
      const expandedBottom = rect.bottom + MAGNET_RADIUS
      if (event.clientX >= expandedLeft && event.clientX <= expandedRight && event.clientY >= expandedTop && event.clientY <= expandedBottom) {
        updateMagnet(event.clientX, event.clientY)
      } else {
        reset()
      }
    }

    window.addEventListener('pointermove', onWindowPointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', onWindowPointerMove)
  })

  const common = {
    className: `${className} magnetic-button`,
    'aria-label': ariaLabel,
    onPointerMove,
    onPointerEnter: (event: ReactPointerEvent<HTMLElement>) => updateMagnet(event.clientX, event.clientY),
    onBlur: reset,
  }

  if (href) {
    return <a {...common} ref={elementRef as RefObject<HTMLAnchorElement>} href={href} target="_blank" rel="noreferrer">{children}</a>
  }

  return <button {...common} ref={elementRef as RefObject<HTMLButtonElement>} type="button" onClick={onClick}>{children}</button>
}
