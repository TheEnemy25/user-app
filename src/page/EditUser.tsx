import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { selectUser, updateUser, resetSelectedUser } from "../mock/userSlice";
import { countries, departments, statuses } from "../mock/mockData";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import Button from "../components/Button";

const EditUser = () => {
  const dispatch: AppDispatch = useDispatch();
  const { users, selectedUser } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState(selectedUser);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setFormData(selectedUser);
    setIsDirty(false);
  }, [selectedUser]);

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
        return {
          ...prev,
          [field]: {
            name: e.target.options[e.target.selectedIndex].text,
            value: e.target.value,
          },
        };
      }
      return prev;
    });
  };

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

  return (
    <div className="max-w-4xl mx-auto pt-20 pb-8 bg-white">
      <h1 className="text-6xl tracking-widest mb-20 text-center karla medium">
        EDIT USER
      </h1>

      <div className="mb-20 w-2/4">
        <SelectField
          label="User"
          value={formData?.name || ""}
          options={users.map((user) => ({ name: user.name, value: user.name }))}
          onChange={(e) => handleSelectUser(e.target.value)}
        />
      </div>

      {formData && (
        <div>
          <h3 className="text-lg font-semibold mb-4">User Information</h3>
          <div className="grid grid-cols-2 gap-6">
            <InputField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />

            <SelectField
              label="Department"
              value={formData.department.value}
              options={departments}
              onChange={(e) => handleSelectChange(e, "department")}
            />

            <SelectField
              label="Country"
              value={formData.country.value}
              options={countries}
              onChange={(e) => handleSelectChange(e, "country")}
            />

            <SelectField
              label="Status"
              value={formData.status.value}
              options={statuses}
              onChange={(e) => handleSelectChange(e, "status")}
            />
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            {isDirty && (
              <Button onClick={handleUndo} className="text-black">
                Undo
              </Button>
            )}

            <Button
              onClick={handleUpdateUser}
              className={isDirty ? "text-black" : "text-gray-300"}
              disabled={!isDirty}
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUser;
