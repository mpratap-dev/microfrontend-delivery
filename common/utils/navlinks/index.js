const navLink = [
  {
    label: "Driver Support",
    path: "Driver-Support",
    inputData: true,
    menuItem: [
      {
        label: "Driver details",
        path: "/Details"
      },
      {
        label: "Current incentive plan",
        path: "/Incentive-Plan"
      },

      {
        label: "Ride & payout summary",
        path: "/Ride-Payout-Summary"
      },
      {
        label: "Wallet transactions",
        path: "/Wallet-Transactions"
      },

      {
        label: "Work summary",
        path: "/Work-Summary"
      },
      {
        label: "Driver referral",
        path: "/Driver-Referral"
      }
    ]
  },
  {
    label: "Rider Dashboard",
    path: "Rider-Dashboard",
    inputData: true,
    menuItem: [
      { label: "Rider Details", path: "/Details" },
      { label: "Ride Detail By CRN", path: "/Ride-detail" },
      { label: "Customer Ride History", path: "/Ride-history" },
      { label: "Wallet Transactions", path: "/Wallet-Transactions" },
      { label: "Pass Transactions", path: "/Pass-Transactions" }
    ]
  },
  {
    label: "Booking Dashboard",
    path: "Booking-Dashboard",
    inputData: true,
    menuItem: []
  },
  {
    label: "Ride Dashboard",
    path: "Ride-Dashboard",
    inputData: true,
    menuItem: []
  },
  {
    label: "Sanitization Dashboard",
    path: "Sanitization-Dashboard",
    inputData: true,
    menuItem: []
  },
  {
    label: "Vehicle Dashboard",
    path: "Vehicle-Dashboard",
    inputData: true,
    menuItem: []
  },
  {
    label: "Inactive Vehicle Dashboard",
    path: "Inactive-Vehicle-Dashboard",
    inputData: true,
    menuItem: []
  },
  {
    label: "Vehicle Profile Dashboard",
    path: "Vehicle-Profile-Dashboard",
    inputData: true,
    menuItem: []
  },
  {
    label: "Vehicle Performance Dashboard",
    path: "Vehicle-Performance-Dashboard",
    inputData: true,
    menuItem: []
  },
  {
    label: "Oye Money Plus Dashboard",
    path: "Oye-Money-Plus-Dashboard",
    inputData: true,
    menuItem: []
  },
  {
    label: "Ninja Pass Dashboard",
    path: "Ninja-Pass-Dashboard",
    inputData: true,
    menuItem: []
  },
  {
    label: "Vehicle Cash Collection Dashboard",
    path: "Vehicle-Cash-Collection-Dashboard",
    inputData: true,
    menuItem: []
  },
  {
    label: "Booking Acceptance Dashboard",
    path: "Booking-Acceptance-Dashboard",
    inputData: true,
    menuItem: []
  },
  {
    label: "Role Dashboard",
    path: "Role-Dashboard",
    inputData: true,
    menuItem: [
      { label: "Roles", path: "/Roles" },
      { label: "Users", path: "/Users" }
    ]
  },
  {
    label: "OnBoarding Dashboard",
    path: "OnBoarding-Dashboard",
    inputData: true,
    menuItem: [
      { label: "Owner", path: "/owner" },
      { label: "Driver", path: "/driver" },
      { label: "Vehicle", path: "/vehicle" }
    ]
  },
  {
    label: "Region Dashboard",
    path: "Region-Dashboard",
    inputData: true,
    menuItem: []
  },
  {
    label: "Stands Dashboard",
    path: "Stands-Dashboard",
    inputData: true,
    menuItem: []
  },
  {
    label: "Fare Dashboard",
    path: "Fare-Dashboard",
    inputData: true,
    menuItem: [
      { label: "Fare admin", path: "/Admin" },
      { label: "Stand fare", path: "/Stand-Fares" },
    ]
  },
  {
    label: "Banner Dashboard",
    path: "Banner-Dashboard",
    inputData: true,
    menuItem: []
  },
  {
    label: "Lifestyle Dashboard",
    path: "Lifestyle-Dashboard",
    inputData: true,
    menuItem: []
  },
  {
    label: "Forecast Dashboard",
    path: "Forecast-Dashboard",
    inputData: true,
    menuItem: []
  },
  {
    label: "Driver Payout Dashboard",
    path: "Driver-Payout-Dashboard",
    inputData: true,
    menuItem: []
  },
  {
    label: "Energy Dashboard",
    path: "Energy-Dashboard",
    inputData: true,
    menuItem: [
      { label: "Batteries", path: "/Battery" },
      { label: "Vendors", path: "/Vendor" },
      { label: "Charging station", path: "/Charging-Station" },
      { label: "Vehicle", path: "/Vehicle" },
      { label: "Generate QR codes", path: "/Generate-qr-codes"},
    ]
  },
  {
    label: "Demand heatmap dashboard",
    path: "Demand-Heatmap-Dashboard",
    inputData: true,
    menuItem: []
  },
  {
    label: "Delivery dashboard",
    path: "/delivery",
    inputData: true,
    menuItem: [
      {
        label: "Clients",
        path: "/clients",
      },
      {
        label: "Hubs",
        path: "/hubs"
      },
      {
        label: "Rate cards",
        path: "/rate-cards"
      },
      {
        label: "Requirements",
        path: "/requirements"
      },
      {
        label: "Client driver details",
        path: "/driver-details"
      },
      {
        label: "Client transactions",
        path: "/client-transactions"
      },
      {
        label: "Uploaded files",
        path: "/uploaded-files"
      },
    ]
  },
];

export default navLink;

export const getSortedNavlinks = (arr) => {
  return arr.sort((current, next) => current.label > next.label ? 1 : -1)
}