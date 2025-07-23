import React from "react";
import { Icon } from "@iconify/react";

const Reports = () => (
  <article className="bg-white rounded-2xl shadow p-4 h-full w-full flex flex-col">
    <header className="mb-4 flex-shrink-0">
      <h2 className="text-lg font-bold text-black">Training Reports</h2>
    </header>

    {/* Detection Analytics */}
    <section
      className="mb-4 flex-shrink-0"
      aria-labelledby="detection-analytics"
    >
      <h3 id="detection-analytics" className="sr-only">
        Detection Analytics
      </h3>
      <div className="flex flex-col gap-3">
        <div className="bg-[var(--color-reports-bg)] rounded-xl p-3 flex flex-col">
          <header className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-black">CLASSES</h4>
            <Icon
              icon="carbon:pest"
              width="16"
              height="16"
              className="text-gray-500"
              aria-hidden="true"
            />
          </header>
          <div className="text-center mb-3">
            <data value="38" className="text-3xl font-bold text-black">
              38
            </data>
            <span className="text-xs text-gray-500 ml-1" aria-label="percent">
              %
            </span>
          </div>
          <div
            className="space-y-1"
            role="list"
            aria-label="Detected pest types"
          >
            <div className="flex items-center text-xs" role="listitem">
              <Icon
                icon="solar:bug-bold"
                width="12"
                height="12"
                className="text-black mr-2"
                aria-hidden="true"
              />
              <span className="text-gray-600">Insects</span>
            </div>
            <div className="flex items-center text-xs" role="listitem">
              <Icon
                icon="material-symbols:pest-control-rodent"
                width="12"
                height="12"
                className="text-black mr-2"
                aria-hidden="true"
              />
              <span className="text-gray-600">Rodents</span>
            </div>
            <div className="flex items-center text-xs" role="listitem">
              <Icon
                icon="fluent-emoji-high-contrast:worm"
                width="12"
                height="12"
                className="text-black mr-2"
                aria-hidden="true"
              />
              <span className="text-gray-600">Worms</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </article>
);

export default Reports;
