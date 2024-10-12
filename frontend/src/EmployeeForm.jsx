/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button, Typography } from "@material-tailwind/react"

const EmployeeForm = ({ editEmployee, setEditEmployee }) => {
  const [formData, setFormData] = useState({ name: '', position: '', department: '', salary: '' });

  useEffect(() => {
    if (editEmployee) {
      setFormData(editEmployee);
    }
  }, [editEmployee]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editEmployee) {
      axios.put(`http://localhost:5000/api/employees/${editEmployee.id}`, formData)
        .then(() => setEditEmployee(null));
    } else {
      axios.post('http://localhost:5000/api/employees', formData);
    }
    setFormData({ name: '', position: '', department: '', salary: '' });
  };

  return (
    <>
    <Typography className='text-2xl font-bold text-center'>Employee Form</Typography>
    <form onSubmit={handleSubmit} className="p-4">
    
      <div className="mb-4">
        <Input type="text" name="name" label='Enter Your Name' value={formData.name} onChange={handleChange} className="w-full border" />
      </div>
      <div className="mb-4">
        <Input type="text" name="position" label='Enter Position' value={formData.position} onChange={handleChange} className="w-full border" />
      </div>
      <div className="mb-4">
        <Input type="text" name="department" label='Enter Your Department' value={formData.department} onChange={handleChange} className="w-full border" />
      </div>
      <div className="mb-4">
        <Input type="number" name="salary" label='Enter Your Salary' value={formData.salary} onChange={handleChange} className="w-full border" />
      </div>
      <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</Button>
    </form>
    </>
  );
};

export default EmployeeForm;
