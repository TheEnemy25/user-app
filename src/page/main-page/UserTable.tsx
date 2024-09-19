import React from "react";
import { User } from "../../types/types";
import DeleteIcon from "../../assets/svg/DeleteIcon";

interface UserTableProps {
  users: User[];
  onDelete: (userName: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onDelete }) => (
  <table className="min-w-full divide-gray-200 border-2">
    <thead className="text-black border-b-2 px-5 py-3">
      <tr>
        <th className="px-6 py-3 text-left tracking-wider">Full Name</th>
        <th className="px-6 py-3 text-left tracking-wider">Department</th>
        <th className="px-6 py-3 text-left tracking-wider">Country</th>
        <th className="px-6 py-3 text-left tracking-wider">Status</th>
        <th className="px-6 py-3 text-left tracking-wider"></th>
      </tr>
    </thead>
    <tbody className="bg-white divide-gray-200">
      {users.map((user) => (
        <tr key={user.name}>
          <td className="px-6 py-4 rubik regular text-gray-900 ">
            {user.name}
          </td>
          <td className="px-6 py-4 text-gray-500">{user.department.name}</td>
          <td className="px-6 py-4 text-gray-500">{user.country.name}</td>
          <td className="px-6 py-4 text-gray-500">{user.status.name}</td>
          <td className="px-6 py-4 text-gray-500">
            <button onClick={() => onDelete(user.name)}>
              <DeleteIcon className="hover:text-red-500" />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default UserTable;
