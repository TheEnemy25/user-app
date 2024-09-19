import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../mock/userSlice";
import { countries, departments, statuses } from "../mock/mockData";

const AddUser = () => {
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName && selectedCountry && selectedDepartment && selectedStatus) {
      dispatch(
        addUser({
          name: fullName,
          status: statuses.find(
            (status) => status.value === selectedStatus
          ) || { name: "Unknown", value: "UNKNOWN" },
          department: departments.find(
            (department) => department.value === selectedDepartment
          ) || { name: "Unknown", value: "UNKNOWN" },
          country: countries.find(
            (country) => country.value === selectedCountry
          ) || { name: "Unknown", value: "UNKNOWN" },
        })
      );
      setFullName("");
      setSelectedCountry("");
      setSelectedDepartment("");
      setSelectedStatus("");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">Add New User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border border-gray-300 rounded-md shadow-sm w-full p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country
            </label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="border border-gray-300 rounded-md shadow-sm w-full p-2"
              required
            >
              <option value="" disabled>
                Select a country
              </option>
              {countries.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="border border-gray-300 rounded-md shadow-sm w-full p-2"
              required
            >
              <option value="" disabled>
                Select a department
              </option>
              {departments.map((department) => (
                <option key={department.value} value={department.value}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-md shadow-sm w-full p-2"
              required
            >
              <option value="" disabled>
                Select a status
              </option>
              {statuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
