export const setOpacity = (hex?: string, alpha?: number) => {
  if (!hex || !alpha) return
  return `${hex}${Math.floor(alpha * 255)
    .toString(16)
    .padStart(2, '0')}`
}
