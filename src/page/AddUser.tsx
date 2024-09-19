import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../mock/userSlice";
import { countries, departments, statuses } from "../mock/mockData";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import Button from "../components/Button";

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
          ) || {
            name: "Unknown",
            value: "UNKNOWN",
          },
          department: departments.find(
            (department) => department.value === selectedDepartment
          ) || {
            name: "Unknown",
            value: "UNKNOWN",
          },
          country: countries.find(
            (country) => country.value === selectedCountry
          ) || {
            name: "Unknown",
            value: "UNKNOWN",
          },
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
      <div className="bg-white p-8 shadow-lg w-full max-w-3xl">
        <h1 className="text-6xl tracking-widest mb-20 text-center karla medium">
          ADD USER
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <InputField
              label="Full Name"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <SelectField
              label="Department"
              value={selectedDepartment}
              options={departments}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            />

            <SelectField
              label="Country"
              value={selectedCountry}
              options={countries}
              onChange={(e) => setSelectedCountry(e.target.value)}
            />

            <SelectField
              label="Status"
              value={selectedStatus}
              options={statuses}
              onChange={(e) => setSelectedStatus(e.target.value)}
            />
          </div>

          <div className="flex justify-end mt-6">
            <div className="mr-5">
              <Button
                type="button"
                className="text-gray-600 border-gray-400"
                onClick={() => navigate("/users")}
              >
                Cancel
              </Button>
            </div>

            <div>
              <Button
                type="submit"
                className="px-10 py-2 text-gray-600 border-gray-400"
              >
                Add
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
