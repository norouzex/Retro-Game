import { useEffect, useState } from "react"
import List from "./List"

export default function Home() {
  const allData = {
    title: "menu",
    data: [
      {
        title: "biography",
        data: "im a developer",
      },
      {
        title: "projects",
        data: [
          {
            title: "nothing",
            data: "im a developer",
          },
          {
            title: "nothing",
            data: "im a developer",
          },
          {
            title: "nothing",
            data: "im a developer",
          },
        ],
      },
      {
        title: "socials",
        data: [
          {
            title: "my instagram",
            data: "im a developer",
          },
          {
            title: "my instagram",
            data: "im a developer",
          },
          {
            title: "my instagram",
            data: "im a developer",
          },
        ],
      },
      {
        title: "skills",
        data: "im a developer",
      },
      {
        title: "Games",
        data: [
          {
            title: "flappy",
            data: "im a developer",
          },
        ],
      },
      {
        title: "biography biography biography",
        data: "im a developer",
      },
      {
        title: "projects",
        data: [
          {
            title: "nothing",
            data: "im a developer",
          },
          {
            title: "nothing",
            data: "im a developer",
          },
          {
            title: "nothing",
            data: "im a developer",
          },
        ],
      },
      {
        title: "socials",
        data: [
          {
            title: "my instagram",
            data: "im a developer",
          },
          {
            title: "my instagram",
            data: "im a developer",
          },
          {
            title: "my instagram",
            data: "im a developer",
          },
        ],
      },
      {
        title: "skills",
        data: "im a developer",
      },
      {
        title: "Games",
        data: [
          {
            title: "flappy",
            data: "im a developer",
          },
        ],
      },
    ],
  }

  const [data, setData] = useState(allData)

  const [focusOption, setFocusOption] = useState(1) // Assume your first option has id 1

  const totalOptions = data.data.length // Total number of menu options (replace with your actual total)

  const getTargetList = (currentKeyPress) => {
    let newFocusOption = focusOption

    if (currentKeyPress === "up") {
      newFocusOption = Math.max(focusOption - 1, 1) // Prevent going below 1
    } else {
      newFocusOption = Math.min(focusOption + 1, totalOptions) // Prevent going above totalOptions
    }

    setFocusOption(newFocusOption)

    return `menu-option-${newFocusOption}`
  }

  const getDistanceFromParentTop = (targetList) => {
    const parentElement = document.getElementById("screen")
    const childElement = document.getElementById(targetList)

    if (!childElement) return 0

    const parentRect = parentElement.getBoundingClientRect()
    const childRect = childElement.getBoundingClientRect()

    return childRect.top - parentRect.top
  }

  const moveArrow = (currentKeyPress, reset = false) => {
    let targetList = ""
    if (!reset) {
      targetList = getTargetList(currentKeyPress)
    } else {
      targetList = `menu-option-1`
      setFocusOption(1)
    }

    const scrollerElement = document.getElementById("scroller-screen")
    const childElement = document.getElementById(targetList)
    const arrow = document.getElementById("arrow")

    if (childElement && arrow) {
      const position = getDistanceFromParentTop(targetList)
      arrow.style.transform = `translateY(${position}px)`

      const childRect = childElement.getBoundingClientRect()
      const scrollerRect = scrollerElement.getBoundingClientRect()

      // Check if the arrow is near the bottom of the scroller screen container
      if (childRect.bottom > scrollerRect.bottom) {
        // Scroll down
        scrollerElement.scrollTop += childRect.bottom - scrollerRect.bottom
      }

      // Check if the arrow is near the top of the scroller screen container
      if (childRect.top < scrollerRect.top) {
        // Scroll up
        scrollerElement.scrollTop -= scrollerRect.top - childRect.top
      }
    }
  }

  const selectOption = () => {
    setData(data.data[focusOption - 1])
    moveArrow("up", true)
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 38) {
        // Up arrow
        moveArrow("up")
      } else if (event.keyCode === 40) {
        // Down arrow
        moveArrow("down")
      } else if (event.keyCode === 13) {
        // Enter  presed
        selectOption()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [focusOption]) // No need to track lastArrowKey here

  return (
    <section>
      <div className="relative h-[650px] w-[365px] m-auto">
        <img
          src="/assets/img/console.png"
          className="h-[650px] w-[365px] absolute z-10 bg-no-repeat bg-contain"
        />
        <div
          className="absolute p-1 font-SaboRegular text-xs text-black z-0 bg-[#2b5329] w-[214px] h-[178px] left-1/2 top-[106px] -translate-x-1/2  overflow-hidden overflow-y-scroll scroll-width-none"
          id="scroller-screen"
        >
          <div className="flex flex-row  gap-2 justify-center" id="screen">
            <div className="relative w-3  flex-shrink-0">
              <img
                className="w-3 absolute transition-all"
                src="/public/assets/img/greater.svg"
                id="arrow"
              />
            </div>

            <List data={data.data} />
          </div>
        </div>
      </div>
    </section>
  )
}
