import React from 'react';

type RowData = {
    name: string;
    project: string;
    hours: number[];
    totalHours: number;
  }

interface RowProps {
  rowData: RowData;
  onRowUpdate: (updatedRow: RowData) => void;
}

const Row: React.FC<RowProps> = ({ rowData, onRowUpdate }) => {
  const handleInputChange = (index: number, value: number) => {
    const newHours = [...rowData.hours];
    newHours[index] = value;
    const total = newHours.reduce((acc, cur) => acc + cur, 0);

    // Update row data and trigger parent component update
    const updatedRow = { ...rowData, hours: newHours, totalHours: total };
    onRowUpdate(updatedRow);
  };

  return (
    <div className="row flex items-center justify-around">
      <input type="text" value={rowData.name} readOnly />
      <input type="text" value={rowData.project} readOnly />
      {rowData.hours.map((hours, index) => (
        <input
          key={index}
          type="number"
          value={hours}
          onChange={(e) => handleInputChange(index, parseInt(e.target.value))}
        />
      ))}
      <span>{rowData.totalHours}</span>
    </div>
  );
};

export default Row;
