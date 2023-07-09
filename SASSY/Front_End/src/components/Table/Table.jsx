import React, { useState } from "react"
import "./Table.scss"

function Table({
  title,
  headers,
  data,
  searchKey,
  handleAction,
  getInfo,
  noShrink,
  ...props
}) {
  const [query, setQuery] = useState("")
  const [filteredData, setFilteredData] = useState(data)

  function handleSearch(event) {
    setQuery(event.target.value)
    const filteredData = data.filter((row) =>
      row[searchKey].toLowerCase().includes(event.target.value.toLowerCase())
    )
    setFilteredData(filteredData)
  }

  function handleClick(event, key) {
    event.stopPropagation()
    handleAction(key)
  }

  return (
    <div className="table-container">
      <h1>{title}</h1>
      {searchKey && (
        <div className="table-search-container">
          <input
            type="text"
            placeholder={
              searchKey ? `Search by ${searchKey} . . .` : "Search here . . ."
            }
            value={query}
            onChange={handleSearch}
            className="table-search-input"
          />
        </div>
      )}
      <table className={!noShrink ? "shrink-table m-table" : "m-table"}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr
              key={index}
              onClick={getInfo ? () => getInfo(index) : null}
              className={getInfo ? "clickable hover-row" : null}
            >
              {Object.values(row).map((value, index) => (
                <td key={index}>{value ? value : "null"}</td>
              ))}

              {handleAction && (
                <td style={{ paddingTop: 5, paddingBottom: 5 }}>
                  <button
                    className={props.buttonClass || "btn-primary-sm"}
                    onClick={(event) => handleClick(event, row[props.clickKey])}
                  >
                    {props.buttonLabel}
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
