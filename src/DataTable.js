// src/DataTable.js

import React, { useState } from 'react';
import './App.css'; // This should be in App.js


// Sample data
const initialData = [
    { lastName: 'Tanaka', firstName: 'Hiroshi', course: 'IT', birthdate: '2000-03-15' },
    { lastName: 'Saito', firstName: 'Yuki', course: 'CS', birthdate: '1998-07-20' },
    { lastName: 'Kobayashi', firstName: 'Aiko', course: 'IS', birthdate: '1995-12-05' },
    { lastName: 'Yamamoto', firstName: 'Taro', course: 'DS', birthdate: '1997-01-30' },
    { lastName: 'Watanabe', firstName: 'Keiko', course: 'IT', birthdate: '1996-09-12' },
    { lastName: 'Nakamura', firstName: 'Ryo', course: 'CS', birthdate: '1999-11-02' },
    { lastName: 'Kato', firstName: 'Sakura', course: 'IS', birthdate: '2001-04-18' },
    { lastName: 'Yoshida', firstName: 'Satoshi', course: 'DS', birthdate: '1994-05-22' },
    { lastName: 'Fujimoto', firstName: 'Haruki', course: 'IT', birthdate: '1995-08-29' },
    { lastName: 'Inoue', firstName: 'Miyuki', course: 'CS', birthdate: '1993-06-14' },
];


const DataTable = () => {
    const [data, setData] = useState(initialData);
    const [filters, setFilters] = useState({
        lastName: '',
        firstName: '',
        course: '',
        minDate: '',
        maxDate: '',
        minAge: '',
        maxAge: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const filterData = () => {
        return data.filter(item => {
            const birthDate = new Date(item.birthdate);
            const age = new Date().getFullYear() - birthDate.getFullYear();
            const isInAgeRange = (filters.minAge ? age >= filters.minAge : true) && (filters.maxAge ? age <= filters.maxAge : true);
            const isInDateRange = (filters.minDate ? birthDate >= new Date(filters.minDate) : true) &&
                                  (filters.maxDate ? birthDate <= new Date(filters.maxDate) : true);
            return (
                item.lastName.toLowerCase().includes(filters.lastName.toLowerCase()) &&
                item.firstName.toLowerCase().includes(filters.firstName.toLowerCase()) &&
                (filters.course ? item.course === filters.course : true) &&
                isInAgeRange &&
                isInDateRange
            );
        });
    };

    const filteredData = filterData();

    return (
        <div>
            <h1>Student Management System - Data Table</h1>
            <div>
                <input type="text" name="lastName" placeholder="Filter by Last Name" onChange={handleChange} />
                <input type="text" name="firstName" placeholder="Filter by First Name" onChange={handleChange} />
                <select name="course" onChange={handleChange}>
                    <option value="">All Courses</option>
                    <option value="IT">IT</option>
                    <option value="IS">IS</option>
                    <option value="CS">CS</option>
                    <option value="DS">DS</option>
                </select>
                <input type="number" name="minAge" placeholder="Min Age" onChange={handleChange} />
                <input type="number" name="maxAge" placeholder="Max Age" onChange={handleChange} />
                <input type="date" name="minDate" onChange={handleChange} />
                <input type="date" name="maxDate" onChange={handleChange} />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th>Course</th>
                        <th>Birthdate</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => {
                        const age = new Date().getFullYear() - new Date(item.birthdate).getFullYear();
                        return (
                            <tr key={index}>
                                <td>{item.lastName}</td>
                                <td>{item.firstName}</td>
                                <td>{item.course}</td>
                                <td>{item.birthdate}</td>
                                <td>{age}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
