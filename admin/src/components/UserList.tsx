import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { deleteUser, getUsers } from "../services/user.service";
import { IUser } from "../utils/userInterface";
import Pagination from "./Pagination";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";

const UserList: React.FC = () => {
  const ITEMS_PER_PAGE = 8; // Nombre d'utilisateurs par page
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { confirm } = Modal;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (error) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  const handleDeleteUser = (id: number) => {
    confirm({
      title: "Êtes-vous sûr de vouloir supprimer cet utilisateur ?",
      icon: <ExclamationCircleFilled />,
      async onOk() {
        try {
          await deleteUser(id);
          setUsers(users.filter((user) => user.id !== id));
        } catch (error: any) {
          console.error("Échec de la suppression:", error?.message);
          setError(error?.message);
        }
      },
      onCancel() {
        console.log("Annulé");
      },
    });
  };
 
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Pagination
  const indexOfLastUser = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstUser = indexOfLastUser - ITEMS_PER_PAGE;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto p-4 text-center items-center">
      <h1 className="text-2xl font-bold mb-4 text-center">User List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-800">
            <tr>
              <th className="w-1/6 py-3 px-1 uppercase font-semibold text-sm">
                #id
              </th>
              <th className="w-1/6 py-3 px-1 uppercase font-semibold text-sm">
                Photo
              </th>
              <th className="w-1/6 py-3 px-1 uppercase font-semibold text-sm">
                Name
              </th>
              <th className="w-1/6 py-3 px-1 uppercase font-semibold text-sm">
                Email
              </th>
              <th className="w-1/6 py-3 px-1 uppercase font-semibold text-sm">
                Role
              </th>
              <th className="w-1/6 py-3 px-1 uppercase font-semibold text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-300">
                <td className="py-3 px-1">{user.id}</td>
                <td className="py-3 px-1">
                  <img
                    src={user.imagePath}
                    alt={user.userName}
                    className="w-10 h-8 rounded-full"
                  />
                </td>
                <td className="py-3 px-1">{user.userName}</td>
                <td className="py-3 px-1">{user.email}</td>
                <td className="py-3 px-1">{user.role ? "Admin" : "User"}</td>
                <td className="py-3 px-1 flex justify-center items-center">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 text-white px-1 py-2 rounded hover:bg-red-700 flex items-center text-center justify-center"
                  >
                    <FaTrash className="mr-2" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={paginate}
      />
    </div>
  );
};
export default UserList;
