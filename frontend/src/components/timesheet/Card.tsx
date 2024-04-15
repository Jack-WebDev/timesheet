

import React, { useState } from 'react';
import RowForm from './Row';

interface RowData {
  hours: number[];
}

const ProjectCard: React.FC = () => {
  const [rows, setRows] = useState<RowData[]>([{ hours: [0, 0, 0, 0, 0] }]); // Initialize with at least one row

  const addRow = () => {
    setRows([...rows, { hours: [0, 0, 0, 0, 0] }]);
  };


  return (
    <div className="project-card">
      <button onClick={addRow}>Add Row</button>
      <div className="flex items-center justify-around">
        <div>Project</div>
        <div>Task</div>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
          <div key={index}>{day}</div>
        ))}
        <div>Total Hours</div>
      </div>
      {rows.map((row, index) => (
        <RowForm key={index} />
      ))}
    </div>
  );
};

export default ProjectCard;





