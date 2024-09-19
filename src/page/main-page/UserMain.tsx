import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { deleteUser, updateFilters, resetFilters } from "../../mock/userSlice";
import DeleteIcon from "../../assets/svg/DeleteIcon";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import FilterSelect from "../../components/FilterSelect";
import UserTable from "./UserTable";

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
    <main className="flex flex-col py-20 px-8 bg-white border-2  w-full m-auto">
      <h1 className="text-6xl tracking-widest mb-20 text-center karla medium">
        USERS
      </h1>

      <div className="flex">
        <div className="flex w-full">
          <div className="mr-3">
            <FilterSelect
              label=""
              options={departments}
              selectedValues={filters.selectedDepartments}
              onChange={handleDepartmentChange}
              multiple
            />
          </div>

          <div className="mr-3">
            <FilterSelect
              label=""
              options={countries}
              selectedValue={filters.selectedCountry}
              onChange={(e) => handleFilterChange(e, "selectedCountry")}
              disabled={filters.selectedDepartments.length < 3}
            />
          </div>

          <div className="mr-3">
            <FilterSelect
              label=""
              options={statuses}
              selectedValue={filters.selectedStatus}
              onChange={(e) => handleFilterChange(e, "selectedStatus")}
              disabled={filters.selectedDepartments.length < 3}
            />
          </div>

          <div className="mt-2 px-3  h-10 items-center flex">
            <Button onClick={handleResetFilters}>
              <DeleteIcon />
            </Button>
          </div>
        </div>

        <div className="flex w-[200px] items-start">
          <Button>
            <Link to="/add-user">Add User</Link>
          </Button>
        </div>
      </div>

      <div className="divide-y">
        <UserTable users={filteredUsers} onDelete={handleDelete} />
      </div>
    </main>
  );
}

export default UserMain;
