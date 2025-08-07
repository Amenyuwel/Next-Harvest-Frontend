export const generateReports = (farmers) => {
  // Count farmers by crop ID
  const cornFarmers = farmers.filter((f) => f.crop === "420").length;
  const riceFarmers = farmers.filter((f) => f.crop === "69").length;

  return [
    {
      id: 1,
      title: "Registered Farmers",
      icon: "mdi:account-group",
      stats: [
        { value: farmers.length, label: "Registered Farmers" },
        { value: cornFarmers, label: "Corn Farmers" },
        { value: riceFarmers, label: "Rice Farmers" },
      ],
    },
  ];
};
