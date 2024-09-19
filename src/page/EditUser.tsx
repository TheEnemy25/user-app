import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { selectUser, updateUser, resetSelectedUser } from "../mock/userSlice";
import { countries, departments, statuses } from "../mock/mockData";

const EditUser = () => {
  const dispatch: AppDispatch = useDispatch();
  const { users, selectedUser } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState(selectedUser || null);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setFormData(selectedUser);
  }, [selectedUser]);

  const handleSelectUser = (name: string) => {
    dispatch(selectUser(name));
  };

  const handleUpdateUser = () => {
    if (formData) {
      dispatch(updateUser(formData));
      setIsDirty(false);
    }
  };

  const handleUndo = () => {
    dispatch(resetSelectedUser());
    setIsDirty(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      if (prev) {
        setIsDirty(true);
        return { ...prev, [e.target.name]: e.target.value };
      }
      return prev;
    });
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    field: string
  ) => {
    setFormData((prev) => {
      if (prev) {
        setIsDirty(true);
        return { ...prev, [field]: e.target.value };
      }
      return prev;
    });
  };

  return (
    <div className="flex flex-col p-4 bg-white">
      <h2 className="text-lg font-bold mb-4 text-center">Edit User</h2>

      <select
        className="mb-4 p-2 border border-gray-300 rounded"
        onChange={(e) => handleSelectUser(e.target.value)}
        defaultValue=""
      >
        <option value="">Select a user</option>
        {users.map((user) => (
          <option key={user.name} value={user.name}>
            {user.name}
          </option>
        ))}
      </select>

      {formData && (
        <div>
          <div className="mb-4">
            <label className="block text-gray-700">Full Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Department:</label>
            <select
              value={formData.department.value}
              onChange={(e) => handleSelectChange(e, "department")}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department.value} value={department.value}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Country:</label>
            <select
              value={formData.country.value}
              onChange={(e) => handleSelectChange(e, "country")}
              className="p-2 border border-gray-300 rounded"
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
            <label className="block text-gray-700">Status:</label>
            <select
              value={formData.status.value}
              onChange={(e) => handleSelectChange(e, "status")}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">Select Status</option>
              {statuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleUndo}
              className={`px-4 py-2 border rounded ${
                isDirty ? "bg-red-500 text-white" : "bg-gray-500 text-white"
              }`}
              style={{ display: isDirty ? "inline-block" : "none" }}
            >
              Undo
            </button>

            <button
              onClick={handleUpdateUser}
              className={`px-4 py-2 border rounded ${
                isDirty ? "bg-blue-500 text-white" : "bg-gray-500 text-white"
              }`}
              disabled={!isDirty}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUser;
