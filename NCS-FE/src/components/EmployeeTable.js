import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';

const columns = [
  {
    title: 'Employee ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email Address',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone Number',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Days Worked in Cafe',
    dataIndex: 'daysWorked',
    key: 'daysWorked',
  },
  {
    title: 'Cafe Name',
    dataIndex: 'cafeName',
    key: 'cafeName',
  },
  {
    title: 'Actions',
    dataIndex: 'id',
    key: 'actions',
    render: (id) => (
      <div>
        <Link to={`/editEmployee/${id}`}>Edit</Link>
        <span> / </span>
        <Link to={`/deleteEmployee/${id}`}>Delete</Link>
      </div>
    ),
  },
];

function EmployeeTable({ employees }) {
  return (
    <Table dataSource={employees} columns={columns} />
  );
}

export default EmployeeTable;