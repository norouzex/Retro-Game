/* eslint-disable react/prop-types */

import CharByCharText from "./CharByCharText"

export default function List({ data, userStepNavigation }) {
  return (
    <ul className="flex flex-col gap-2 w-full" id="list-menu">
      {typeof data !== "string" ? (
        data.map((row, key) => {
          return (
            <>
              <li
                className="list-none menu-items"
                key={key}
                id={`menu-option-${key + 1}`}
              >
                <p className="text-left">{row.title}</p>
              </li>
              {key === data.length - 1 && userStepNavigation.length && (
                <li
                  className="list-none menu-items"
                  key={key + 1}
                  id={`menu-option-${key + 2}`}
                  data-tag="back-option"
                >
                  <p className="text-left">back</p>
                </li>
              )}
            </>
          )
        })
      ) : (
        <CharByCharText text={data} speed={1} />
      )}
    </ul>
  )
}
