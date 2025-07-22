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
    <div className="bg-white rounded-2xl shadow p-4 h-full w-full flex flex-col">
      <header className="mb-3 flex-shrink-0">
        <h2 className="text-lg font-bold text-black">Calendar</h2>
      </header>
      <div className="bg-[var(--color-calendar-highlight)] rounded-xl p-3 flex-1 flex flex-col min-h-0">
        <h3 className="text-center font-semibold text-sm mb-3 text-gray-700 flex-shrink-0">
          {monthName} {year}
        </h3>
        <div
          className="grid grid-cols-8 gap-1 flex-1"
          role="grid"
          aria-label={`Calendar for ${monthName} ${year}`}
        >
          <div className="text-xs text-gray-400" aria-hidden="true"></div>
          {daysShort.map((d) => (
            <div
              key={d}
              className="text-xs text-gray-500 text-center font-medium"
              role="columnheader"
              aria-label={`${
                d === "Mo"
                  ? "Monday"
                  : d === "Tu"
                  ? "Tuesday"
                  : d === "We"
                  ? "Wednesday"
                  : d === "Th"
                  ? "Thursday"
                  : d === "Fr"
                  ? "Friday"
                  : d === "Sa"
                  ? "Saturday"
                  : "Sunday"
              }`}
            >
              {d}
            </div>
          ))}
          {weeks.map((week, i) => (
            <React.Fragment key={i}>
              <div
                className="text-xs text-gray-400 flex items-center justify-center font-medium"
                aria-label={`Week ${i + 1}`}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              {week.map(({ date, inMonth }, j) => {
                const isToday =
                  date.getDate() === today.getDate() &&
                  date.getMonth() === today.getMonth() &&
                  date.getFullYear() === today.getFullYear();
                return (
                  <button
                    key={j}
                    className={`text-sm flex items-center justify-center rounded-full w-8 h-8 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300
                      ${
                        isToday
                          ? "bg-gray-300 shadow-lg text-white font-bold"
                          : ""
                      }
                      ${!inMonth ? "text-gray-400" : "text-gray-700"}
                    `}
                    style={
                      isToday
                        ? {
                            boxShadow:
                              "0 4px 16px var(--color-calendar-shadow)",
                          }
                        : {}
                    }
                    role="gridcell"
                    aria-label={`${date.toDateString()}${
                      isToday ? ", today" : ""
                    }`}
                    aria-current={isToday ? "date" : undefined}
                  >
                    <time dateTime={date.toISOString().split("T")[0]}>
                      {date.getDate()}
                    </time>
                  </button>
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
