import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Raider, getAllRaiders } from '../../../api/admin';
import { Spinner } from '../../../shared/components';
import RegisterRaider from './RegisterRaider';
import { User } from '../../../api';

type Props = {
  users: User[];
};

export default function RaiderList(props: Props) {
  const [raiders, setRaiders] = useState<Raider[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getRaiders = async () => {
    getAllRaiders().then((raiders) => {
      setRaiders(raiders);
    });
  };

  useEffect(() => {
    if (props.users.length > 0) {
      getRaiders().then(() => {
        setLoading(false);
      });
    }
  }, [props.users.length]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <h1 className="text-center text-2xl">Raiders</h1>
          <div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    hikoins
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Editar
                  </th>
                </tr>
              </thead>
              <tbody>
                {raiders.map((raider) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={raider._id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {raider.name}
                    </th>
                    <td className="px-6 py-4">{raider.hikoins}</td>
                    <td className="px-6 py-4">
                      <Link
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        to={`/admin/editUser/${raider._id}`}
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
            <RegisterRaider users={props.users} onRegister={getRaiders} />
          </div>
        </div>
      )}
    </>
  );
}
