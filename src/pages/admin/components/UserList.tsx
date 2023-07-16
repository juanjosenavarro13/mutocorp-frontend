import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, getAllUsers } from '../../../api/admin/getAllUsers';
import { Spinner } from '../../../shared/components';
import RegisterUser from './RegisterUser';

type Props = {
  getUsers: (users: User[]) => void;
};

export default function UserList(props: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { getUsers } = props;

  const fetchUsers = useCallback(async () => {
    const allUsers = await getAllUsers();
    setUsers(allUsers);
    getUsers(allUsers);
  }, [getUsers]);

  useEffect(() => {
    setLoading(true);
    fetchUsers().then(() => setLoading(false));
  }, [fetchUsers]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <h1 className="text-2xl text-center">Usuarios</h1>
          <div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Editar
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={user._id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.name}
                    </th>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <Link
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        to={`/admin/editRaider/${user._id}`}
                      >
                        Editar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="m-4">
            <RegisterUser onRegister={fetchUsers} />
          </div>
        </div>
      )}
    </>
  );
}
