export const graphData = {
  labels: [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ],
  datasets: [
    {
      label: "Rice Production",
      data: [65, 59, 80, 81, 56, 55, 40, 85, 90, 75, 82, 88],
      borderColor: "#10B981",
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: "#10B981",
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7,
    },
    {
      label: "Corn Production",
      data: [28, 48, 40, 19, 86, 27, 90, 65, 70, 55, 60, 75],
      borderColor: "#F59E0B",
      backgroundColor: "rgba(245, 158, 11, 0.1)",
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: "#F59E0B",
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7,
    },
  ],
};

export const graphOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        padding: 20,
        font: {
          size: 12,
          weight: "bold",
        },
      },
    },
    title: {
      display: false,
    },
    tooltip: {
      mode: "index",
      intersect: false,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      titleColor: "#fff",
      bodyColor: "#fff",
      borderColor: "#e5e7eb",
      borderWidth: 1,
      padding: 10,
      cornerRadius: 8,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: "#6b7280",
        font: { size: 11, weight: "bold" },
      },
    },
    y: {
      grid: {
        color: "#f3f4f6",
        drawBorder: false,
      },
      ticks: {
        color: "#6b7280",
        font: { size: 11, weight: "bold" },
        callback: (value) => value + "t",
      },
    },
  },
  elements: {
    point: { hoverBackgroundColor: "#fff" },
  },
  interaction: {
    mode: "nearest",
    axis: "x",
    intersect: false,
  },
};

export const notifications = [
  {
    id: 1,
    title: "Pest Detected",
    subtitle: "Rice Field",
    date: "May 13",
    tag: "last 2 days",
    icon: "solar:bug-bold",
    iconBg: "#DDF5D6",
    tagBg: "#FFE6B2",
    tagColor: "#FF9900",
  },
  {
    id: 2,
    title: "Irrigation Alert",
    subtitle: "Corn Field",
    date: "May 12",
    tag: "3 days ago",
    icon: "mdi:water-alert",
    iconBg: "#E0F2FE",
    tagBg: "#DBEAFE",
    tagColor: "#2563EB",
  },
  {
    id: 4,
    title: "Weather Warning",
    subtitle: "All Fields",
    date: "May 9",
    tag: "1 week ago",
    icon: "mdi:weather-lightning-rainy",
    iconBg: "#FEE2E2",
    tagBg: "#FEE2E2",
    tagColor: "#DC2626",
  },
  {
    id: 5,
    title: "Fertilizer Applied",
    subtitle: "Rice Field",
    date: "May 8",
    tag: "1 week ago",
    icon: "mdi:leaf",
    iconBg: "#D1FAE5",
    tagBg: "#D1FAE5",
    tagColor: "#059669",
  },
];

export const pestReportsData = [
  {
    id: 2,
    number: "02",
    pestName: "Snail",
    description: "Regular",
    recommended: "Manual Rams",
    activeMonth: "Decreased",
    season: "All season",
    image: "/api/placeholder/32/32",
  },
  {
    id: 3,
    number: "03",
    pestName: "Fall Armyworm",
    description: "Regular",
    recommended: "Manual Rams",
    activeMonth: "Decreased",
    season: "All season",
    image: "/api/placeholder/32/32",
  },
  {
    id: 4,
    number: "04",
    pestName: "Stem Borer",
    description: "Regular",
    recommended: "Manual Rams",
    activeMonth: "Decreased",
    season: "All season",
    image: "/api/placeholder/32/32",
  },
];

export const farmReports = [
  {
    id: 1,
    title: "Registered Farmers in System",
    icon: "ph:farm-fill",
    stats: [
      { label: "Total Registered", value: 7 },
      { label: "Corn Farmers", value: 4 },
      { label: "Rice Farmers", value: 3 },
    ],
  },
  {
    id: 2,
    title: "Recent Harvests",
    icon: "ph:farm-fill",
    stats: [
      { label: "Total Registered", value: 7 },
      { label: "Corn Farmers", value: 4 },
      { label: "Rice Farmers", value: 3 },
    ],
  },
];

export const pestReports = [
  {
    id: 1,
    title: "Pest Reports",
    icon: "ph:farm-fill",
    stats: [
      { label: "Total Registered", value: 7 },
      { label: "Corn Farmers", value: 4 },
      { label: "Rice Farmers", value: 3 },
    ],
  },
  {
    id: 2,
    title: "Average Income Est.",
    icon: "ph:farm-fill",
    stats: [
      { label: "Total Registered", value: 7 },
      { label: "Corn Farmers", value: 4 },
      { label: "Rice Farmers", value: 3 },
    ],
  },
];

