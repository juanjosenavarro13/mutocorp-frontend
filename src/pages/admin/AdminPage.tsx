import { useState } from 'react';
import { User } from '../../api';
import { UserList, RaiderList } from './components';

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);

  return (
    <div className="grid gap-6 mb-6 xl:grid-cols-2">
      <UserList getUsers={setUsers} />
      <RaiderList users={users} />
    </div>
  );
}
