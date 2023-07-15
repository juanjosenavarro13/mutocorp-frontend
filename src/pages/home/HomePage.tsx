import { useTranslation } from 'react-i18next';
import { Table } from '../../shared/components';

export default function HomePage() {
  const [t] = useTranslation('home', { keyPrefix: 'home' });

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

  return <Table colums={[t('tableName'), 'Hikoins']} data={datos} />;
}
