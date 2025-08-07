export const graphData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Rice Production",
      data: [65, 59, 80, 81, 56, 55, 40, 85, 90, 75, 82, 88],
      borderColor: "var(--color-rice)",
      backgroundColor: "rgba(163, 217, 119, 0.1)",
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: "var(--color-rice)",
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7,
    },
    {
      label: "Corn Production",
      data: [28, 48, 40, 19, 86, 27, 90, 65, 70, 55, 60, 75],
      borderColor: "var(--color-corn)",
      backgroundColor: "rgba(244, 197, 66, 0.1)",
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: "var(--color-corn)",
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
    id: 3,
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
    id: 4,
    title: "Pest Detected",
    subtitle: "Rice Field",
    date: "May 13",
    tag: "last 2 days",
    icon: "solar:bug-bold",
    iconBg: "#DDF5D6",
    tagBg: "#FFE6B2",
    tagColor: "#FF9900",
  },
];

export const pestReportsData = [
  {
    id: 2,
    number: "02",
    pestName: "Snail",
    recommended: "Manual Rams",
    activeMonth: "Decreased",
    season: "All season",
    image: "/api/placeholder/32/32",
  },
  {
    id: 3,
    number: "03",
    pestName: "Fall Armyworm",
    recommended: "Manual Rams",
    activeMonth: "Decreased",
    season: "All season",
    image: "/api/placeholder/32/32",
  },
  {
    id: 4,
    number: "04",
    pestName: "Stem Borer",
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
      { label: "Snail", value: 7 },
      { label: "Fall Armyworm", value: 4 },
      { label: "Stem Borer", value: 3 },
    ],
  },
];

export const farmersData = [
  {
    id: 1,
    rsbsa: "00001",
    name: "Emerson Alvarado",
    description: "Regular",
    crop: "Rice",
    area: "1.1 ha",
    barangay: "Lagao",
    contact: "+63 912 345 6789",
  },
  {
    id: 2,
    rsbsa: "00002",
    name: "Romel Birada",
    description: "Regular",
    crop: "Corn",
    area: "1.1 ha",
    barangay: "San Isidro",
    contact: "+63 912 345 6790",
  },
  {
    id: 3,
    rsbsa: "00003",
    name: "Billy Joe Mengote",
    description: "Premium",
    crop: "Rice",
    area: "10 ha",
    barangay: "Fatima",
    contact: "+63 912 345 6791",
  },
  {
    id: 4,
    rsbsa: "00004",
    name: "Kylie Malagamba",
    description: "Regular",
    crop: "Corn",
    area: "5 ha",
    barangay: "San Isidro",
    contact: "+63 912 345 6792",
  },
  {
    id: 5,
    rsbsa: "00005",
    name: "Anita Salubre Palomares",
    description: "Regular",
    crop: "Rice",
    area: "2 ha",
    barangay: "Lagao",
    contact: "+63 912 345 6793",
  },
];
