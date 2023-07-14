import { useState } from 'react';

export default function useToggleHidden() {
  const [hidden, setHidden] = useState(true);

  function toggleHidden() {
    setHidden(!hidden);
  }

  return { hidden, toggleHidden };
}
