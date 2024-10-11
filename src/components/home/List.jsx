import CharByCharText from "./CharByCharText"

export default function List({ data, userStepNavigation }) {
  return (
    <ul className="flex flex-col gap-2 w-full" id="list-menu">
      {typeof data !== "string" ? (
        // eslint-disable-next-line react/prop-types
        data.map((row, key) => (
          <li
            className="list-none menu-items"
            key={`menu-option-${key + 1}`}
            id={`menu-option-${key + 1}`}
          >
            <p className="text-left">{row.title}</p>
          </li>
        ))
      ) : (
        <CharByCharText text={data} speed={1} />
      )}

      {userStepNavigation.length > 0 && typeof data !== "string" && (
        <li
          className="list-none menu-items"
          key={`back-option-${data.length + userStepNavigation.length}`}
          id={`menu-option-${data.length + 1}`}
          data-tag="back-option"
        >
          <p className="text-left">back</p>
        </li>
      )}
    </ul>
  )
}
