<!-- Open this in gitlab for more structured UI -->
# AsyncTable

Includes pagination, page size changer, collapsible rows, column search. 

## Usage

`data` and `columns` must be supplied in order to populate the table.

`data` format:

```js

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

```

`columns` format: 

```js
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

```

or for using states inside columns you can use hooks.

```js
import React from 'react';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { formatDateTime } from "../../../utils/date-handler";
import { green, red } from '@material-ui/core/colors';
import { DELIVERY_STATE_NAMES, DELIVERY_STATE } from '../../../constant/delivery';
import { makeStyles } from "@material-ui/core/styles";
import useSpacing from '../../../hooks/useSpacing';

const { INACTIVE, ACTIVE } = DELIVERY_STATE;

const color = {
  [INACTIVE]: red[500],
  [ACTIVE]: green[500]
};

const useStyles = makeStyles((theme) => ({
  status: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const useColumns = () => {
  const classes = useStyles();
  const spacing = useSpacing();

  return [
    {
      title: 'Client ID',
      dataIndex: 'id',
      key: 'id',
      search: true
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      search: true
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (text) => (text || '-')
    },
    {
      title: 'Status',
      dataIndex: 'state',
      key: 'status',
      render: (state, rowData) => {
        return (
        <span style={{ color: color[state] }} className={classes.status}>
          <FiberManualRecordIcon fontSize="small" className={spacing.mr1}/>
          {DELIVERY_STATE_NAMES[state]}
        </span>
      )},
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => (text || '-')
    },
    {
      title: 'Central SPOC',
      dataIndex: 'spocName',
      key: 'spocname',
      render: (text) => (text || '-')
    },
    {
      title: 'Central SPOC Contact',
      dataIndex: 'spocContact',
      key: 'spoccontact',
      render: (text) => (text || '-')
    },
    {
      title: 'Address',
      dataIndex: 'headOfficeAddress',
      key: 'location',
      render: (text) => (text || '-')
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => formatDateTime(date),
    },
  ]
}

export default useColumns;
```


Example usage:

```js
import React, { useEffect, useState } from "react";
import { getClients } from "../../../api/api/deliveryApi";
import AsyncTable from "../../common/Table/AsyncTable";
import UseColumns from "./clientListingColumns";

const Listing = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage,setTotalPage] = useState(1);

  const columns = useColumns(); // get columns from the hook

  const [filterData, setFilterData] = useState({
    search_via: undefined,
    search_val: undefined,
    page_number: 1, 
    page_size: 10
  });

  const getListingData = async () => {
    setLoading(true);
    try {
      const {status, data: { client, totalAvailableRecord }} = await getClients(filterData);
      if(status) {
        const totalPages = Math.ceil(totalAvailableRecord / filterData.page_size);

        setTableData(client);
        setTotalPage(totalPages);
      }
    } catch(error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilters = ({value, column, page, pageSize}) => {
    setFilterData({...filterData, page_number: page, page_size: pageSize});
  }

  const paginationProps = {
    total: totalPage,
    page: filterData.page_number,
    pageSize: filterData.page_size,
    handleChange: handleFilters,
    showSizeChanger: true,
  }

  useEffect(() => {
    getListingData();
  }, [filterData]);

  return (
    <>
      <AsyncTable
        pagination={paginationProps}
        data={tableData}
        dense
        scroll
        rowKey="id"
        loading={loading}
        columns={columns}
        handleChange={handleFilters}
      />
    </>
  );  
};

export default Listing;

```

# API

## Table


| Property                | Type              | Default  | Description                                                   |
| ----------------------- |:------------------| :--------|:--------------------------------------------------------------|
| data                    | `object[]`        | -        | Data record array to be displayed                             | 
| columns                 | `object[]`        | -        | Columns of table                                              |
| dense                   | `boolean`         | `false`  | Columns padding                                               |
| pagination              | `object`          | -        | Config of pagination. Please refer                            |
|                         |                   |          | pagination section for props that can be passed               |
| striped                 | `boolean`         | `false`  | Show striped rows                                             |
| handleChange            | `function`        | -        | Callback executed when rows is selected, or on columns search |
| rowKey                  | `string`          | `id`     | UniqueID to be used as key for rows                           |
| CollapseComponent       | `React.ReactNode` | -        | Component to be shown in collapses row                        |
| collapseComponentProps  | `object`          | -        | Props for CollapseComponent                                   |
| title                   | `string`          | -        | Title for table                                               |
| scroll                  | `boolean`         | `false`  | Horizontally scrollable table on overflow                     |
| loading                 | `boolean`         | `false`  | Show loader                                                   |
| selection               | `boolean`         | `false`  | Show checkboxes in first column for row selection             |
| elevation               | `number`          | -        | elevation for Paper component                                 |
| disableRow              | `function`        | `false`  | a condition can be returned from this function to certain     |
|                         |                   |          | disable rows                                                  |
| PageSizeComponent       | `React.ReactNode` | -        | Relpace page size changer with this component, provided       |
|                         |                   |          | pageSize changer is disabled                                  |


## Pagination

Format for pagination props:

```js
{
  total: 10,
  page: 1,
  pageSize: 10,
  handleChange: () => {},
  showSizeChanger: true,
}
```

| Property       | Type   | Default | Description                                       |
|----------------|--------|---------|---------------------------------------------------|
|total           |`number`|-        |Total number of pages                              |
|page            |`number`|-        |Active page                                        |
|pageSize        |`number`|10       |Page size                                          |
|handleChange    |`number`|-        |Callback executed on page change, page size change |
|showSizeChanger |`number`|-        |To show page size changer                          |