/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"

export default function CharByCharText({ text, speed }) {
  const [displayedText, setDisplayedText] = useState("")

  useEffect(() => {
    let index = 0

    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text[index])
      index++

      if (index === text.length) {
        clearInterval(intervalId)
      }
    }, speed)

    return () => clearInterval(intervalId)
  }, [text, speed])

  return <div>{displayedText}</div>
}
