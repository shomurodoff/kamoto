export const useShortScale = () => {
  const convertValueToShortScale = (value: any) => {
    if (value < 1000) {
      return Math.floor(value)
    } else if (value < 1000000) {
      return Math.floor(value / 1000) + 'K'
    } else if (value < 1000000000) {
      return Math.floor(value / 1000000) + 'M'
    } else {
      return Math.floor(value / 1000000000) + 'B'
    }
  }

  return {convertValueToShortScale}
}
