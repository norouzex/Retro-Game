/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"

export default function CharByCharText({ text, speed }) {
  const [displayedText, setDisplayedText] = useState("")

  useEffect(() => {
    if (typeof text !== "string") {
      console.error("Expected a string for the 'text' prop.")
      return
    }

    let index = 0

    const intervalId = setInterval(() => {
      if (index < text.length - 1) {
        setDisplayedText((prev) => prev + text[index])
        index++
      } else {
        clearInterval(intervalId)
      }
    }, speed)

    return () => clearInterval(intervalId)
  }, [text, speed])

  return <li className="text-left">{displayedText}</li>
}
