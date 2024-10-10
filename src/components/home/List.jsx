/* eslint-disable react/prop-types */

import CharByCharText from "./CharByCharText"

export default function List({ data }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {typeof data !== "string" ? (
        data.map((row, key) => (
          <li
            className="list-none menu-items"
            key={key}
            id={`menu-option-${key + 1}`}
          >
            <p className="text-left">{row.title}</p>
          </li>
        ))
      ) : (
        <CharByCharText text={data} speed={1} />
      )}
    </div>
  )
}
