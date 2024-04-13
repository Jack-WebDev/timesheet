import Card from "@/components/timesheet/Card";
import DateRangeSelector from "@/components/timesheet/DatePicker";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const Timesheet = () => {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  const handleUpdateDateRange = (startDate: Date, endDate: Date) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
  };
	return (
		<div>
			<header className="flex items-center justify-around py-4">
				<div className="logo">LOGO</div>

				<div className="profile">
					<p className="flex items-center gap-4">
						Jack <FaChevronDown />
					</p>
				</div>
			</header>

			<main>
      <DateRangeSelector onUpdateDateRange={handleUpdateDateRange} />


				<div className="timesheet__container">
					<div className="timesheet_header flex items-center justify-around my-4">

						<button>Submit</button>
					</div>
					<div className="timesheet__details flex items-center justify-around">
						<div className="time__period">
							<h2>Week:</h2>
              <span>{selectedStartDate?.toLocaleDateString()} - {selectedEndDate?.toLocaleDateString()}</span>
						</div>

						<div className="total__hours">
							<h2>Total Hours:</h2>
						</div>
					</div>
        <Card/>
					
				</div>
			</main>
		</div>
	);
};

export default Timesheet;
