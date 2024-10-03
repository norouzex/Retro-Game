/* eslint-disable react/prop-types */

export default function List({ data }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {data.map((row, key) => (
        <li
          className="list-none menu-items"
          key={key}
          id={`menu-option-${key + 1}`}
        >
          <p className="text-left">{row.title}</p>
        </li>
      ))}
    </div>
  )
}
