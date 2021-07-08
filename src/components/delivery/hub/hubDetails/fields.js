export const hubDetailsFields = [
  { label: "Hub name", name: "name" },
  { name: "selector" },
  { label: "Coordinates Latitude", name: "hubLocation.lat", type: "number", nested: true },
  { label: "Coordinates Longitude", name: "hubLocation.lon", type: "number", nested: true },
  { label: "Address", name: "address", textarea: true, rows: 4 },
];

export const contactDetailsFields = [
  { label: "Oye Hub Manager Name", name: "contactInfo[0][name]" },
  { label: "Oye Hub Manager Contact", name: "contactInfo[0][number]", maxLength: 10 },

  { label: "Oye Ninja name", name: "contactInfo[1][name]" },
  { label: "Oye Ninja Contact", name: "contactInfo[1][number]", maxLength: 10 },

  { label: "Trainer name", name: "contactInfo[2][name]" },
  { label: "Trainer contact", name: "contactInfo[2][number]", maxLength: 10 },
];

export const SPOCField = [
  { label: "SPOC 1 name", name: "contactInfo[3][name]" },
  { label: "SPOC 1 contact", name: "contactInfo[3][number]", maxLength: 10 },
];
