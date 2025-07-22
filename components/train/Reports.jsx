import React from "react";
import { Icon } from "@iconify/react";
import ProgressBar from "@/components/dashboard/progressBar";

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
            <h4 className="text-sm font-semibold text-black">Pest Detection</h4>
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

        <div className="bg-[var(--color-reports-bg)] rounded-xl p-3 flex flex-col">
          <header className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-black">
              Disease Detection
            </h4>
            <Icon
              icon="carbon:pest"
              width="16"
              height="16"
              className="text-gray-500"
              aria-hidden="true"
            />
          </header>
          <div className="text-center mb-3">
            <data value="24" className="text-3xl font-bold text-black">
              24
            </data>
            <span className="text-xs text-gray-500 ml-1" aria-label="percent">
              %
            </span>
          </div>
          <div
            className="space-y-1"
            role="list"
            aria-label="Detected disease types"
          >
            <div className="flex items-center text-xs" role="listitem">
              <Icon
                icon="solar:bug-bold"
                width="12"
                height="12"
                className="text-black mr-2"
                aria-hidden="true"
              />
              <span className="text-gray-600">Leaf Blight</span>
            </div>
            <div className="flex items-center text-xs" role="listitem">
              <Icon
                icon="material-symbols:pest-control-rodent"
                width="12"
                height="12"
                className="text-black mr-2"
                aria-hidden="true"
              />
              <span className="text-gray-600">Root Rot</span>
            </div>
            <div className="flex items-center text-xs" role="listitem">
              <Icon
                icon="fluent-emoji-high-contrast:worm"
                width="12"
                height="12"
                className="text-black mr-2"
                aria-hidden="true"
              />
              <span className="text-gray-600">Fungal Infections</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Training Data Analysis */}
    <section className="flex-1" aria-labelledby="training-data">
      <header className="mb-3">
        <h3 id="training-data" className="text-lg font-semibold text-black">
          Training Data Analysis
        </h3>
      </header>
      <div className="flex items-end mb-3">
        <data value="15.4" className="text-4xl font-bold text-black mr-2">
          15.4
        </data>
        <span
          className="text-gray-400 text-sm font-semibold"
          aria-label="thousand samples per 3 months"
        >
          k/3m
        </span>
      </div>

      <div
        className="space-y-4"
        role="list"
        aria-label="Training data categories"
      >
        <div role="listitem">
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-semibold text-black text-sm">Healthy Crops</h4>
            <span
              className="text-sm text-gray-500"
              aria-label="6.4 thousand samples"
            >
              6.4k
            </span>
          </div>
          <ProgressBar label="Healthy Crops" value={70} max={100} />
        </div>

        <div role="listitem">
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-semibold text-black text-sm">
              Diseased Plants
            </h4>
            <span
              className="text-sm text-gray-500"
              aria-label="3.4 thousand samples"
            >
              3.4k
            </span>
          </div>
          <ProgressBar label="Diseased Plants" value={40} max={100} />
        </div>

        <div role="listitem">
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-semibold text-black text-sm">Pest Damage</h4>
            <span
              className="text-sm text-gray-500"
              aria-label="5.4 thousand samples"
            >
              5.4k
            </span>
          </div>
          <ProgressBar label="Pest Damage" value={60} max={100} />
        </div>
      </div>
    </section>
  </article>
);

export default Reports;
