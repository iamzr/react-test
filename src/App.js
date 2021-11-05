import React, { useEffect } from "react";
import "./App.css";
function App() {
  let json = require("./data.json");

  useEffect(() => {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((item) => {
      const children = item.parentNode.parentNode.childElementCount;
      if (children < 5) {
        item.disabled = true;
      } else {
        item.checked = true;
      }
    });
  }, []);

  function handleChange(e) {
    console.log(e.target.checked);

    const parent = e.target.parentNode.parentNode;
    const stockElements = parent.querySelectorAll(".stock");
    console.log(stockElements);

    if (!e.target.checked) {
      stockElements.forEach((item) => {
        item.className = "stock hidden";
      });
    } else {
      stockElements.forEach((item) => {
        item.className = "stock";
      });
    }
  }

  function processData() {
    let rows = json.row.map((item) => {
      let level = item.level;

      let divs = item.locations.map((location) => {
        let name = location.name;

        let stock = location.stock.map((item) => {
          return (
            <React.Fragment>
              <td className="stock">{item.product}</td>
              <td className="stock">{item.qty}</td>
              <td className="stock">{item.replenishment}</td>
            </React.Fragment>
          );
        });

        return (
          <React.Fragment>
            <td>{name}</td>
            {stock}
          </React.Fragment>
        );
      });

      return divs.map((item, idx) => {
        return (
          <tr key={"row" + idx}>
            <td>
              <input
                type="checkbox"
                key={"checkbox" + idx}
                id={idx}
                onClick={(e) => handleChange(e)}
              ></input>
            </td>
            <td>{level}</td>
            <React.Fragment>{item}</React.Fragment>
          </tr>
        );
      });
    });

    return (
      <table>
        <tr>
          <th rowSpan="2" align="center" valign="top">
            Show Stock
          </th>
          <th rowSpan="2" align="center" valign="top">
            Level
          </th>
          <th rowSpan="2" align="center" valign="top">
            Locations
          </th>
          <th colSpan="3" align="center" valign="top">
            Stock
          </th>
        </tr>
        <tr>
          <td>Property</td>
          <td>Quantity</td>
          <td>Replenishment</td>
        </tr>
        <tbody>
          <React.Fragment>{rows}</React.Fragment>
        </tbody>
      </table>
    );
  }

  return (
    <div className="App">
      <h1>{json.label}</h1>
      <div>{processData()}</div>
    </div>
  );
}

export default App;
