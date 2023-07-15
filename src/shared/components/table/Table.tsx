import { useState } from 'react';
import BodyTable from './bodyTable';
import HeadTable from './headTable';

type Props = {
  colums: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
};

export default function Table(props: Props) {
  const idsColums = Object.keys(props.data[0]);

  const colums = props.colums.map((col, index) => {
    return {
      id: idsColums[index],
      name: col,
    };
  });

  const [data, setData] = useState(props.data);

  const initialOrder = () => {
    return Object.keys(props.data[0]).map((key) => {
      return {
        key,
        order: 'asc',
      };
    });
  };

  const [order, setOrder] = useState(initialOrder());

  const changeOrder = (key: string) => {
    const index = order.findIndex((x) => x.key === key);

    if (order[index].order === 'asc') {
      setOrder(
        order.map((x) => {
          if (x.key === key) {
            return {
              ...x,
              order: 'desc',
            };
          }
          return x;
        })
      );
    } else {
      setOrder(
        order.map((x) => {
          if (x.key === key) {
            return {
              ...x,
              order: 'asc',
            };
          }
          return x;
        })
      );
    }
  };

  const orderByKey = (key: string) => {
    const newData = [...data];

    const index = order.findIndex((x) => x.key === key);

    changeOrder(key);

    if (order[index].order === 'desc') {
      newData.sort((x, y) => x[key].localeCompare(y[key]));
      newData.sort((x, y) => y[key] - x[key]);
    } else {
      newData.sort((x, y) => y[key].localeCompare(x[key]));
      newData.sort((x, y) => x[key] - y[key]);
    }

    setData(newData);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <HeadTable colums={colums} orderBy={orderByKey} />
          </tr>
        </thead>
        <tbody>
          <BodyTable data={data} />
        </tbody>
      </table>
    </div>
  );
}
