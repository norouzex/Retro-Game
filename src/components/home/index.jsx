// import React from "react"

export default function Home() {
  const getDistanceFromParentTop = () => {
    const parentElement = document.getElementById("screen")
    const childElement = document.getElementById("childElement")
    const arrow = document.getElementById("arrow")

    const parentRect = parentElement.getBoundingClientRect()
    const childRect = childElement.getBoundingClientRect()

    const distanceFromParentTop = childRect.top - parentRect.top
    arrow.style.transform = `translateY(${distanceFromParentTop}px)`
    console.log("Distance from parent top:", distanceFromParentTop)
  }
  return (
    <section onClick={getDistanceFromParentTop}>
      <div className="relative h-[650px] w-[365px] m-auto">
        <img
          src="/assets/img/console.png"
          className="h-[650px] w-[365px] absolute z-10 bg-no-repeat bg-contain"
        />
        <div className="absolute p-1 font-SaboRegular text-xs text-black z-0 bg-[#2b5329] w-[214px] h-[178px] left-1/2 top-[106px] -translate-x-1/2">
          <div
            className="flex flex-row h-full gap-2 -start justify-center"
            id="screen"
          >
            <div className="relative w-3 h-full flex-shrink-0">
              <img
                className="w-3 absolute transition-all"
                src="/public/assets/img/greater.svg"
                id="arrow"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-left">
                hi my name is mohammad and i live in iran and why im here
              </p>
              <p className="text-left" id="childElement">
                help
              </p>
              <p className="text-left">setting</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
