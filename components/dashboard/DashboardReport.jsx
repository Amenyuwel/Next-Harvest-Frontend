import React from "react";
import { Icon } from "@iconify/react";
import { farmReports, pestReports } from "@/assets/dummydata.js";

const DashboardReport = () => (
  <section className="flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white p-4 shadow">
    <header className="mb-3 flex-shrink-0">
      <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
        Reports
      </h2>
    </header>

    <div className="scrollbar-hide flex-1 overflow-y-auto">
      {/* Farm Reports Section */}
      <div className="mb-6 flex flex-col gap-3">
        {farmReports.map((report) => (
          <article
            key={report.id}
            className="flex min-h-[140px] flex-col rounded-xl bg-[var(--color-column-farmer)] p-3"
          >
            <header className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                {report.title}
              </h3>
              <Icon
                icon={report.icon}
                width="16"
                height="16"
                className="text-gray-500"
                aria-hidden="true"
              />
            </header>

            <div
              className="mt-2 ml-2 space-y-2"
              role="list"
              aria-label={`${report.title} statistics`}
            >
              {report.stats.map((stat, index) => (
                <div key={index} className="flex items-center" role="listitem">
                  <data
                    value={stat.value}
                    className="mr-2 text-2xl font-bold text-[var(--color-text-primary)]"
                  >
                    {stat.value}
                  </data>
                  <span className="text-xs font-medium text-gray-500">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* Pest Reports Section */}
      <div className="mb-6 flex flex-col gap-3">
        {pestReports.map((report) => (
          <article
            key={report.id}
            className="flex min-h-[140px] flex-col rounded-xl bg-[var(--color-column-farmer)] p-3"
          >
            <header className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                {report.title}
              </h3>
              <Icon
                icon={report.icon}
                width="16"
                height="16"
                className="text-gray-500"
                aria-hidden="true"
              />
            </header>

            <div
              className="mt-2 ml-2 space-y-2"
              role="list"
              aria-label={`${report.title} statistics`}
            >
              {report.stats.map((stat, index) => (
                <div key={index} className="flex items-center" role="listitem">
                  <data
                    value={stat.value}
                    className="mr-2 text-2xl font-bold text-[var(--color-text-primary)]"
                  >
                    {stat.value}
                  </data>
                  <span className="text-xs font-medium text-gray-500">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default DashboardReport;
