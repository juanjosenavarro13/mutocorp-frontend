import { Table } from '../../shared/components';

export default function HomePage() {
  const datos = [
    {
      Name: 'fjuanxo',
      Hikoins: '100',
    },
    {
      Name: 'bmutombo',
      Hikoins: '200',
    },
    {
      Name: 'cgato',
      Hikoins: '50',
    },
    {
      Name: 'djewel',
      Hikoins: '50',
    },
  ];

  return <Table colums={Object.keys(datos[0])} data={datos} />;
}
