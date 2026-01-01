import React, { useRef, useEffect } from "react";
import "./Spreadsheet.css";

function Spreadsheet({ rows = 20, cols = 10 }) {
  const tableRef = useRef(null);

  // Column names A, B, C...
  const getColumnName = (index) => {
    let name = "";
    while (index >= 0) {
      name = String.fromCharCode((index % 26) + 65) + name;
      index = Math.floor(index / 26) - 1;
    }
    return name;
  };

  // Enable column resizing
  useEffect(() => {
    const table = tableRef.current;
    if (!table) return;

    const cols = table.querySelectorAll("th");

    cols.forEach((col) => {
      const resizer = document.createElement("div");
      resizer.classList.add("resizer");
      col.style.position = "relative";
      col.appendChild(resizer);

      let startX, startWidth;

      resizer.addEventListener("mousedown", (e) => {
        startX = e.pageX;
        startWidth = col.offsetWidth;

        const onMouseMove = (e) => {
          const newWidth = startWidth + (e.pageX - startX);
          col.style.width = `${newWidth}px`;
        };

        const onMouseUp = () => {
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      });
    });
  }, []);

  return (
    <div className="spreadsheet">
      <table ref={tableRef}>
        <thead>
          <tr>
            <th className="corner"></th>
            {Array.from({ length: cols }, (_, i) => (
              <th key={i}>{getColumnName(i)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }, (_, rowIndex) => (
            <tr key={rowIndex}>
              <td className="row-header">{rowIndex + 1}</td>
              {Array.from({ length: cols }, (_, colIndex) => (
                <td key={colIndex} contentEditable className="cell"></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Spreadsheet;
