import React from "react";

// Helper to get weeks for a given month and year
function getWeeks(year, month) {
  const weeks = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  let current = new Date(firstDay);
  current.setDate(current.getDate() - ((current.getDay() + 6) % 7)); // Start from Monday

  while (current <= lastDay || weeks.length < 6) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push({
        date: new Date(current),
        inMonth: current.getMonth() === month,
      });
      current.setDate(current.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}

const daysShort = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const CalendarColumn = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const weeks = getWeeks(year, month);

  const monthName = today.toLocaleString("default", { month: "long" });

  return (
    <div
      className="bg-white rounded-3xl shadow p-6 flex flex-col justify-center"
      style={{ minWidth: 500, maxWidth: 530, height: 360 }} // Set a fixed height
    >
      <div className="bg-[#F9FFCC] rounded-2xl p-6 h-full flex flex-col justify-center">
        <div className="text-center font-bold text-lg mb-4 text-gray-700">
          {monthName} {year}
        </div>
        <div className="grid grid-cols-8 gap-2 flex-1 items-center">
          <div className="text-xs text-gray-400"></div>
          {daysShort.map((d) => (
            <div
              key={d}
              className="text-xs text-gray-500 text-center font-semibold"
            >
              {d}
            </div>
          ))}
          {weeks.map((week, i) => (
            <React.Fragment key={i}>
              <div className="text-xs text-gray-400 flex items-center justify-center font-semibold">
                {String(i + 1).padStart(2, "0")}
              </div>
              {week.map(({ date, inMonth }, j) => {
                const isToday =
                  date.getDate() === today.getDate() &&
                  date.getMonth() === today.getMonth() &&
                  date.getFullYear() === today.getFullYear();
                return (
                  <div
                    key={j}
                    className={`text-sm flex items-center justify-center rounded-full w-8 h-8
                      ${
                        isToday
                          ? "bg-gray-300 shadow-lg text-white font-bold"
                          : ""
                      }
                      ${!inMonth ? "text-gray-400" : "text-gray-700"}
                    `}
                    style={isToday ? { boxShadow: "0 4px 16px #bdbdbd" } : {}}
                  >
                    {date.getDate()}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarColumn;
