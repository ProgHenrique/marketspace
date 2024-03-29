import { useLayoutEffect, useState } from 'react'

// check and return the screen width
export function useWindowSize() {
  const [size, setSize] = useState(0)

  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth)
    }

    window.addEventListener('resize', updateSize)
    updateSize()

    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return size
}