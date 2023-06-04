import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';

const columns = [
  {
    title: 'Logo',
    dataIndex: 'logo',
    key: 'logo',
    render: (logo) => <img src={logo} alt="Cafe Logo" style={{ width: '50px' }} />,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Employees',
    dataIndex: 'employees',
    key: 'employees',
    render: (employees, record) => <Link to={`/employees?cafeId=${record.id}`}>{employees}</Link>,
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: 'Actions',
    dataIndex: 'id',
    key: 'actions',
    render: (id) => (
      <div>
        <Link to={`/editCafe/${id}`}>Edit</Link>
        <span> / </span>
        <Link to={`/deleteCafe/${id}`}>Delete</Link>
      </div>
    ),
  },
];

function CafeTable({ cafes }) {
  return (
    <Table dataSource={cafes} columns={columns} />
  );
}

export default CafeTable;