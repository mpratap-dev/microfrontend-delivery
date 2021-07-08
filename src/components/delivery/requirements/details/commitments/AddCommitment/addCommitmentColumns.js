const UseColumns = () => [
  {
    title: "Mobile Number",
    dataIndex: "mobileNumber",
    key: "mobileNumber",
  },
  {
    title: "Name",
    dataIndex: "driverFirstName",
    key: "driverFirstName",
    render: (value, rowData) => rowData.driverFirstName ? (rowData.driverFirstName  + " " +  rowData.driverLastName): "-",
  },
  {
    title: "VBN No.",
    dataIndex: "oyeNumber",
    key: "oyeNumber",
    width: 65
  },
];

export default UseColumns;
