'use client';

import { useEffect } from 'react';
import { useStateContext } from '@/components/state-provider';

export default function ClientParent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userRepository, currentUser } = useStateContext();

  useEffect(() => {
    import('bootstrap');

    if (currentUser === null) return;

    (async () => {
      const existingUser = await userRepository.findOne(currentUser.id);
      if (existingUser !== null) return;

      await userRepository.save(currentUser);
    })();
  }, [currentUser, userRepository]);

  return <>{children}</>;
}
