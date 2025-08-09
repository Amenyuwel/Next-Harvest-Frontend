import React from "react";
import { Icon } from "@iconify/react";

const Reports = () => (
  <article className="flex h-full w-full flex-col rounded-2xl bg-white p-4 shadow">
    <header className="mb-4 flex-shrink-0">
      <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
        Training Reports
      </h2>
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
        <div className="flex flex-col rounded-xl bg-[var(--color-reports-bg)] p-3">
          <header className="mb-2 flex items-center justify-between">
            <h4 className="text-sm font-semibold text-black">CLASSES</h4>
            <Icon
              icon="carbon:pest"
              width="16"
              height="16"
              className="text-gray-500"
              aria-hidden="true"
            />
          </header>
          <div className="mb-3 text-center">
            <data value="38" className="text-3xl font-bold text-black">
              38
            </data>
            <span className="ml-1 text-xs text-gray-500" aria-label="percent">
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
                className="mr-2 text-black"
                aria-hidden="true"
              />
              <span className="text-gray-600">Insects</span>
            </div>
            <div className="flex items-center text-xs" role="listitem">
              <Icon
                icon="material-symbols:pest-control-rodent"
                width="12"
                height="12"
                className="mr-2 text-black"
                aria-hidden="true"
              />
              <span className="text-gray-600">Rodents</span>
            </div>
            <div className="flex items-center text-xs" role="listitem">
              <Icon
                icon="fluent-emoji-high-contrast:worm"
                width="12"
                height="12"
                className="mr-2 text-black"
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
