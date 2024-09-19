// UserMain.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { deleteUser, updateFilters, resetFilters } from "../mock/userSlice";
import DeleteIcon from "../assets/svg/DeleteIcon";
import Button from "../components/Button";
import { Link } from "react-router-dom";

function UserMain() {
  const dispatch: AppDispatch = useDispatch();
  const { users, filters, departments, countries, statuses } = useSelector(
    (state: RootState) => state.user
  );

  const handleDelete = (userName: string) => {
    dispatch(deleteUser(userName));
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    filterName: string
  ) => {
    dispatch(updateFilters({ [filterName]: e.target.value }));
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const selectedDepartments = [...filters.selectedDepartments];

    if (selectedDepartments.includes(value)) {
      selectedDepartments.splice(selectedDepartments.indexOf(value), 1);
    } else {
      selectedDepartments.push(value);
    }

    dispatch(updateFilters({ selectedDepartments }));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const filteredUsers = users.filter((user) => {
    const { selectedDepartments, selectedCountry, selectedStatus } = filters;
    const departmentMatch =
      selectedDepartments.length === 0 ||
      selectedDepartments.includes(user.department.value);
    const countryMatch =
      !selectedCountry || user.country.value === selectedCountry;
    const statusMatch = !selectedStatus || user.status.value === selectedStatus;

    return departmentMatch && countryMatch && statusMatch;
  });

  return (
    <main className="flex flex-col pt-20 px-20 bg-white">
      <h2 className="text-6xl tracking-widest mb-4 text-center karla medium">
        USERS
      </h2>

      <div className="mb-4">
        <Button borderColor="" onClick={handleResetFilters}>
          Reset Filters
        </Button>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Departments:</label>
        <select
          multiple
          onChange={handleDepartmentChange}
          value={filters.selectedDepartments}
          className="p-2 border border-gray-300 rounded"
        >
          {departments.map((department) => (
            <option key={department.value} value={department.value}>
              {department.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Country:</label>
        <select
          onChange={(e) => handleFilterChange(e, "selectedCountry")}
          value={filters.selectedCountry}
          className="p-2 border border-gray-300 rounded"
          disabled={filters.selectedDepartments.length < 3}
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.value} value={country.value}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Status:</label>
        <select
          onChange={(e) => handleFilterChange(e, "selectedStatus")}
          value={filters.selectedStatus}
          className="p-2 border border-gray-300 rounded"
          disabled={filters.selectedDepartments.length < 3}
        >
          <option value="">Select Status</option>
          {statuses.map((status) => (
            <option key={status.value} value={status.value}>
              {status.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mr-10 mb-4">
        <Button borderColor="">
          <Link to="/add-user">Add User</Link>
        </Button>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Department
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Country
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredUsers.map((user) => (
            <tr key={user.name}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {user.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.department.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.country.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.status.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button onClick={() => handleDelete(user.name)}>
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default UserMain;
