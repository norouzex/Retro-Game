import { useEffect, useState } from "react"
import List from "./List"

export default function Home() {
  const allData = {
    title: "menu",
    data: [
      {
        title: "biography",
        data: "A dedicated developer with a passion for creating innovative software solutions, I possess expertise in various programming languages and frameworks, including PHP, Django, and Node.js. My journey began with a strong foundation in backend development, which has evolved to encompass full-stack capabilities, particularly with React and Next.js. I am currently focused on optimizing performance and scalability in my projects, while also exploring the intricacies of building exchange platforms. Driven by curiosity, I am always eager to learn new technologies and improve my skills. Outside of coding, I enjoy engaging with the developer community and sharing knowledge through collaboration.",
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
  const [userStepNavigation, setUserStepNavigation] = useState([])
  const [focusOption, setFocusOption] = useState(1) // Assume your first option has id 1
  const totalOptions = data.data.length + 1

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

  const scrollOnTextContent = (value) => {
    const scrollerElement = document.getElementById("scroller-screen")
    scrollerElement.scroll({
      top: scrollerElement.scrollTop + value,
      behavior: "smooth",
    })
  }

  const backSateAction = () => {
    if (userStepNavigation.length > 0) {
      const scrollerElement = document.getElementById("scroller-screen")
      scrollerElement.scroll({
        top: 0,
      })
      setUserStepNavigation((prev) => prev.slice(0, -1))
      setData(userStepNavigation.at(-1))
      moveArrow("up", true)
    }
  }

  const selectOption = () => {
    if (focusOption === data.data.length + 1) {
      backSateAction()
    } else {
      setUserStepNavigation((prev) => [...prev, data])
      setData(data.data[focusOption - 1])
    }
    moveArrow("up", true)
  }

  const keyUp = () => {
    if (typeof data.data === "string") {
      scrollOnTextContent(-10)
      return
    }
    moveArrow("up")
  }

  const keyDown = () => {
    if (typeof data.data === "string") {
      scrollOnTextContent(+10)
      return
    }
    moveArrow("down")
  }

  const keyEnter = () => {
    if (typeof data.data !== "string") {
      selectOption()
    } else {
      backSateAction()
      moveArrow("up", true)
    }
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 38) {
        // Up arrow
        keyUp()
      } else if (event.keyCode === 40) {
        keyDown()
      } else if (event.keyCode === 13) {
        // Enter  presed
        keyEnter()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [focusOption, data, userStepNavigation]) // No need to track lastArrowKey here

  return (
    <section>
      <div className="relative h-[650px] w-[365px] m-auto">
        <img
          src="/assets/img/console.png"
          className="h-[650px] w-[365px] absolute z-10 bg-no-repeat bg-contain"
        />
        <div className="dpad">
          <div className="dpad-up main-btn" onClick={keyUp}></div>
          <div className="dpad-down main-btn" onClick={keyDown}></div>
          <div className="dpad-left main-btn" onClick={backSateAction}></div>
          <div className="dpad-right main-btn" onClick={keyEnter}></div>
          <div className="dpad-center"></div>
        </div>
        <div
          className="absolute p-1 font-SaboRegular text-xs text-black z-0 bg-[#2b5329] w-[214px] h-[178px] left-1/2 top-[106px] -translate-x-1/2  overflow-hidden overflow-y-scroll scroll-width-none"
          id="scroller-screen"
        >
          <div
            className="flex flex-row  gap-2 justify-center overflow-y-scroll"
            id="screen"
          >
            <div className="relative w-3  flex-shrink-0">
              <img
                className="w-3 absolute transition-all"
                src="/public/assets/img/greater.svg"
                id="arrow"
              />
            </div>

            <List data={data.data} userStepNavigation={userStepNavigation} />
          </div>
        </div>
      </div>
    </section>
  )
}
