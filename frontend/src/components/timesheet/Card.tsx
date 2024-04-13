import React, { useState } from "react";
import Row from "./Row";

type RowData = {
	name: string;
	project: string;
	hours: number[];
	totalHours: number;
};

const Card: React.FC = () => {
	const [rows, setRows] = useState<RowData[]>([]);


	const addRow = () => {
		const newRow: RowData = {
			name: "",
			project: "",
			hours: [0, 0, 0, 0, 0],
			totalHours: 0,
		};
		setRows([...rows, newRow]);
	};

	const updateRow = (index: number, updatedRow: RowData) => {
		const updatedRows = [...rows];
		updatedRows[index] = updatedRow;
		setRows(updatedRows);
	};
	const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

	return (
		<div className="card">
			<div className="day-labels-header flex items-center justify-around">
				<div>Name</div>
				<div>Project</div>
				{daysOfWeek.map((day, index) => (
					<div key={index}>{day}</div>
				))}
				<div>Total Hours</div>
			</div>
			{rows.map((rowData, index) => (
				<Row
					key={index}
					rowData={rowData}
					onRowUpdate={(updatedRow) => updateRow(index, updatedRow)}
				/>
			))}
			<button onClick={addRow}>Add Row</button>


		</div>
	);
};

export default Card;
