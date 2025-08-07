import React from "react";
import { Icon } from "@iconify/react";
import { useFarmers } from "../../hooks/useFarmers";
import { generateReports } from "../../utils/reportUtils";

const DashboardReport = () => {
  const { farmers, loading, error } = useFarmers();
  const reports = generateReports(farmers);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <section className="flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white p-4 shadow">
      <ReportHeader />
      <ReportList reports={reports} />
    </section>
  );
};

const LoadingState = () => (
  <section className="flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white p-4 shadow">
    <div className="flex h-full items-center justify-center">
      <p>Loading reports...</p>
    </div>
  </section>
);

const ErrorState = ({ error }) => (
  <section className="flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white p-4 shadow">
    <div className="flex h-full items-center justify-center">
      <p className="text-red-500">Error: {error}</p>
    </div>
  </section>
);

const ReportHeader = () => (
  <header className="mb-3 flex-shrink-0">
    <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
      Reports
    </h2>
  </header>
);

const ReportList = ({ reports }) => (
  <div className="scrollbar-hide flex-1 overflow-y-auto">
    <div className="mb-6 flex flex-col gap-3">
      {reports.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </div>
  </div>
);

const ReportCard = ({ report }) => (
  <article className="flex min-h-[140px] flex-col rounded-xl bg-[var(--color-column-farmer)] p-3">
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
        <StatItem key={index} stat={stat} />
      ))}
    </div>
  </article>
);

const StatItem = ({ stat }) => (
  <div className="flex items-center" role="listitem">
    <data
      value={stat.value}
      className="mr-2 text-2xl font-bold text-[var(--color-text-primary)]"
    >
      {stat.value}
    </data>
    <span className="text-xs font-medium text-gray-500">{stat.label}</span>
  </div>
);

export default DashboardReport;
