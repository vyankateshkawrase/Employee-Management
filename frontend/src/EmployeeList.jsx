/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import EmployeeForm from "./EmployeeForm"; // Import the form

const EmployeeList = ({ setEditEmployee }) => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false); // State to toggle the form

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/employees")
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  const handleAddEmployee = () => {
    setShowForm(true); // Show the form when button is clicked
  };

  const handleCloseForm = () => {
    setShowForm(false); // Close the form
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Employee List</h1>

      {/* Add Employee Button */}
      <div className="text-right mb-4">
        <button
          onClick={handleAddEmployee}
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Add Employee
        </button>
      </div>

      <table className="table-auto w-full border border-collapse border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Name
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Position
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Department
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Salary
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {employee.name}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {employee.position}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {employee.department}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                ${employee.salary}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => setEditEmployee(employee)}
                  className="text-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteEmployee(employee.id)}
                  className="text-red-500 ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Employee</h2>
              <button onClick={handleCloseForm} className="text-red-500">
                X
              </button>
            </div>
            {/* Employee form */}
            <EmployeeForm editEmployee={null} setEditEmployee={setEditEmployee} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
