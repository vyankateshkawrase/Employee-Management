import { useState } from 'react';
import EmployeeList from './EmployeeList';
import EmployeeForm from './EmployeeForm';

const App = () => {
  const [editEmployee, setEditEmployee] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <EmployeeForm editEmployee={editEmployee} setEditEmployee={setEditEmployee} />
      <EmployeeList setEditEmployee={setEditEmployee} />
    </div>
  );
};

export default App;
