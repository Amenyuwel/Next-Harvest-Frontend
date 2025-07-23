import React from "react";
import ProgressBar from "./ProgressBar";
import { Icon } from "@iconify/react";

const ReportsColumn = () => (
  <section className="bg-white rounded-2xl shadow p-4 h-full w-full overflow-hidden flex flex-col">
    <header className="flex-shrink-0 mb-3">
      <h2 className="text-lg font-bold text-black">Farm Reports</h2>
    </header>

    {/* Top Section - Farmers and Pest Cards */}
    <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch mb-4 flex-shrink-0">
      {/* Farmers Section */}
      <article className="flex-1 bg-[var(--color-column-farmer)] rounded-xl p-3 flex flex-col relative min-h-[140px]">
        <header className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-black">
            Registered Farmers
          </h3>
          <Icon
            icon="ph:farm-fill"
            width="16"
            height="16"
            className="text-gray-500"
            aria-hidden="true"
          />
        </header>

        <div
          className="space-y-2 mt-2 ml-2"
          role="list"
          aria-label="Farmer statistics"
        >
          <div className="flex items-center" role="listitem">
            <data value="7" className="text-2xl font-bold text-black mr-2">
              7
            </data>
            <span className="text-gray-500 font-medium text-xs">
              Total Registered
            </span>
          </div>
          <div className="flex items-center" role="listitem">
            <data value="4" className="text-2xl font-bold text-black mr-2">
              4
            </data>
            <span className="text-gray-500 font-medium text-xs">
              Corn Farmers
            </span>
          </div>
          <div className="flex items-center" role="listitem">
            <data value="3" className="text-2xl font-bold text-black mr-2">
              3
            </data>
            <span className="text-gray-500 font-medium text-xs">
              Rice Farmers
            </span>
          </div>
        </div>
      </article>

      {/* Pests Section */}
      <article className="flex-1 bg-[var(--color-column-pests)] rounded-xl p-3 flex flex-col relative min-h-[140px]">
        <header className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-black">Pest Detection</h3>
          <Icon
            icon="carbon:pest"
            width="16"
            height="16"
            className="text-gray-500"
            aria-hidden="true"
          />
        </header>

        {/* Pest stats */}
        <div className="mt-2 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <data value="38" className="text-2xl font-bold text-black">
                38
              </data>
              <Icon
                icon="oui:security-signal-detected"
                width="14"
                height="14"
                className="text-black ml-1"
                aria-hidden="true"
              />
            </div>
          </div>
          <div
            className="space-y-2 mt-3 w-full flex flex-col items-start ml-4"
            role="list"
            aria-label="Pest detection categories"
          >
            <div className="flex items-center" role="listitem">
              <Icon
                icon="solar:bug-bold"
                width="14"
                height="14"
                className="text-black"
                aria-hidden="true"
              />
              <span className="text-gray-600 font-medium ml-2 text-xs">
                Insects Detected
              </span>
            </div>
            <div className="flex items-center" role="listitem">
              <Icon
                icon="material-symbols:pest-control-rodent"
                width="14"
                height="14"
                className="text-black"
                aria-hidden="true"
              />
              <span className="text-gray-600 font-medium ml-2 text-xs">
                Rodents Detected
              </span>
            </div>
            <div className="flex items-center" role="listitem">
              <Icon
                icon="fluent-emoji-high-contrast:worm"
                width="14"
                height="14"
                className="text-black"
                aria-hidden="true"
              />
              <span className="text-gray-600 font-medium ml-2 text-xs">
                Worms Detected
              </span>
            </div>
          </div>
        </div>
      </article>
    </div>

    {/* Bottom Section - Recent Harvest */}
    <section className="flex-1">
      <header className="mb-3">
        <h3 className="text-lg font-semibold text-black">Recent Harvest</h3>
      </header>

      <div className="flex items-end mb-2">
        <data value="110" className="text-3xl font-bold text-black mr-2">
          110
        </data>
        <span
          className="text-gray-400 text-sm font-semibold"
          aria-label="tons per 3 months"
        >
          t/3m
        </span>
      </div>

      {/* Recent Harvest Progress Bars */}
      <div
        className="space-y-3"
        role="list"
        aria-label="Harvest progress by crop type"
      >
        {/* Rice ProgressBar */}
        <div role="listitem">
          <h4 className="font-semibold text-black text-base mb-1">
            Rice Production
          </h4>
          <ProgressBar label="Rice" value={70} max={100} />
        </div>
        {/* Corn ProgressBar */}
        <div role="listitem">
          <h4 className="font-semibold text-black text-base mb-1">
            Corn Production
          </h4>
          <ProgressBar label="Corn" value={40} max={100} />
        </div>
      </div>
    </section>
  </section>
);

export default ReportsColumn;
