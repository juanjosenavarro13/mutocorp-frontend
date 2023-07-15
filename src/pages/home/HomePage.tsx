import { useTranslation } from 'react-i18next';
import { Spinner, Table } from '../../shared/components';
import { getRaiders } from '../../api';
import { useEffect, useState } from 'react';
import { Raider, TableRaiders } from '../../api/home/raiders.model';

export default function HomePage() {
  const [t] = useTranslation('home', { keyPrefix: 'home' });
  const [loading, setLoading] = useState(true);
  const [raiders, setRaiders] = useState<TableRaiders[]>([]);

  const transformData = (raiders: Raider[]) => {
    return raiders.map((raider) => {
      return {
        Name: raider.name,
        Hikoins: raider.hikoins.toString(),
      };
    });
  };

  useEffect(() => {
    getRaiders().then((res) => {
      setLoading(false);
      setRaiders(transformData(res));
    });
  }, [loading]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Table colums={[t('tableName'), 'Hikoins']} data={raiders} />
      )}
    </>
  );
}
