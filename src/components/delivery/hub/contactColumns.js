const contactColumns = [
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: (type) => type || '-'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Contact',
    dataIndex: 'number',
    key: 'number',
  },
];

export default contactColumns;