type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
};

export default function BodyTable(props: Props) {
  const { data } = props;

  return (
    <>
      {data.map((row) => (
        <tr
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          key={Object.values(row).join('')}
        >
          {Object.keys(row).map((key) => (
            <th
              key={row[key]}
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {row[key]}
            </th>
          ))}
        </tr>
      ))}
    </>
  );
}
