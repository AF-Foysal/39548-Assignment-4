import "./App.css";
import { Button } from "@mui/material";
import React, { useState } from "react";

var rowCounter = 0;
var columnCounter = 0;

// Column Creator Function
function columnCreator(currentRow, amountToAdd) {
	let thisRow = document.getElementById("row" + currentRow);
	for (let i = 2; i < amountToAdd + 2; i++) {
		let newColumn = document.createElement("td");
		newColumn.className = "box";
		newColumn.id = "row" + currentRow + "-column" + i;
		if (thisRow) {
			thisRow.appendChild(newColumn);
		}
	}
}

function generateColumn() {
	let grid = document.getElementById("dynamic-grid");
	if (rowCounter === 0 && columnCounter === 0) {
		rowCounter += 1;
		columnCounter += 1;
		let myRow = document.createElement("tr");
		let rowData = document.createElement("td");
		myRow.id = "row" + rowCounter;
		rowData.className = "box";
		rowData.id = "row" + rowCounter + "-column" + columnCounter;
		if (grid) {
			grid.appendChild(myRow);
		}
		if (myRow) {
			myRow.appendChild(rowData);
		}
	} else {
		for (let i = 1; i <= rowCounter; i++) {
			let currentRow = document.getElementById("row" + i);
			let myColumn = document.createElement("td");
			var tempColumn = columnCounter + 1;
			myColumn.id = "row" + i + "-column" + tempColumn;
			myColumn.className = "box";
			currentRow.appendChild(myColumn);
		}
		columnCounter += 1;
	}
	console.log("ColumnCount: ", columnCounter, "rowCount:", rowCounter);
}

function generateRow() {
	let grid = document.getElementById("dynamic-grid");
	if (columnCounter === 0 && rowCounter === 0) {
		rowCounter += 1;
		columnCounter += 1;
		let myRow = document.createElement("tr");
		let rowData = document.createElement("td");
		myRow.id = "row" + rowCounter;
		rowData.className = "box";
		rowData.id = "row" + rowCounter + "-column" + columnCounter;
		if (grid) {
			grid.appendChild(myRow);
		}
		if (myRow) {
			myRow.appendChild(rowData);
		}
	} else {
		rowCounter += 1;
		let myRow = document.createElement("tr");
		let rowData = document.createElement("td");
		myRow.id = "row" + rowCounter;
		rowData.className = "box";
		rowData.id = "row" + rowCounter + "-column1";
		if (grid) {
			grid.appendChild(myRow);
		}
		if (myRow) {
			myRow.appendChild(rowData);
		}
		columnCreator(rowCounter, columnCounter - 1);
	}
	console.log("RowCount: ", rowCounter, "ColumnCount: ", columnCounter);
}

function deleteColumn() {
	let grid = document.getElementById("dynamic-grid");
	if (columnCounter > 0) {
		for (let i = 0; i < rowCounter; i++) {
			grid.rows[i].deleteCell(-1);
		}
		columnCounter--;

		if (columnCounter === 0) {
			for (let j = 0; j < rowCounter; j++) {
				grid.deleteRow(-1);
			}
			rowCounter = 0;
		}
		console.log(
			"Column Counter after remove: " +
				columnCounter +
				" rowCounter: " +
				rowCounter
		);
	}
}

function deleteRow() {
	let grid = document.getElementById("dynamic-grid");
	if (rowCounter > 0) {
		grid.deleteRow(-1);
		rowCounter--;
	}
	if (rowCounter === 0) {
		columnCounter = 0;
	}
	console.log(
		"Column Counter after remove: " +
			columnCounter +
			" rowCounter: " +
			rowCounter
	);
}

function removeAllColor() {
	const cells = document.querySelectorAll(".box");
	cells.forEach((cell) => {
		cell.style.backgroundColor = "white";
	});
}

function colorUncoloredCells(color) {
	const cells = document.querySelectorAll(".box");

	cells.forEach((cell) => {
		// Get the computed style of the cell
		const computedStyle = getComputedStyle(cell);

		// Check if the background color is white (in any format)
		if (
			computedStyle.backgroundColor === "rgb(255, 255, 255)" ||
			computedStyle.backgroundColor === "#ffffff" ||
			computedStyle.backgroundColor.toLowerCase() === "white" ||
			computedStyle.backgroundColor === "rgba(0, 0, 0, 0)" // Fully transparent
		) {
			cell.style.backgroundColor = color;
		}
    });
}

function colorAllCells(color) {
	const grid = document.getElementById("dynamic-grid");
	if (grid) {
	  const cells = grid.querySelectorAll(".box");
	  cells.forEach((cell) => {
		cell.style.backgroundColor = color;
	  });
	}
  }

function App() {
	const [color, setColor] = useState("#ff00ff");
	return (
		<div>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-evenly",
				}}
			>
				<Button
					variant='contained'
					color='success'
					style={{ color: "white" }}
					id='generate-column'
					onClick={(e) => generateColumn(e.target.value)}
				>
					Generate Column
				</Button>
				<Button
					variant='contained'
					color='success'
					style={{ color: "white" }}
					id='generate-row'
					onClick={(e) => generateRow(e.target.value)}
				>
					Generate Row
				</Button>
				<Button
					variant='contained'
					color='error'
					style={{ color: "white" }}
					onClick={(e) => deleteColumn(e.target.value)}
				>
					Remove Column
				</Button>
				<Button
					variant='contained'
					color='error'
					style={{ color: "white" }}
					onClick={(e) => deleteRow(e.target.value)}
				>
					Remove Row
				</Button>
				<Button
					variant='contained'
					color='error'
					style={{ color: "white" }}
					onClick={(e) => removeAllColor(e.target.value)}
				>
					Clear All Cells
				</Button>
				<Button
					variant="contained"
					color="warning"
					style={{ color: "white" }}
					onClick={() => colorAllCells(color)}
					>
					Color All Cells
				</Button>
				<Button
					variant="contained"
					color="info"
					style={{ color: "white" }}
					onClick={(e) => colorUncoloredCells(color,e.target.value)}
				>
					Color all Uncolored Cells
				</Button>
				<input
					type='color'
					value={color}
					onChange={(e) => setColor(e.target.value)}
				/>
				<h1>{color}</h1>
			</div>
			<table bgcolor='white' id='dynamic-grid'></table>
		</div>
	);
}

export default App;
