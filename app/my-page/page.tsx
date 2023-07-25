'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useStateContext } from '@/components/state-provider';
import FirebaseAuthAdapter from '@/lib/adapters/firebase-auth-adapter';

const firebaseAuthAdapter = new FirebaseAuthAdapter();

export default function MyPage() {
  const { userRepository, todoRepository, currentUser, isAuthenticating } =
    useStateContext();
  const { push } = useRouter();

  const handleDeleteAccountBtnClick = async () => {
    if (currentUser === null || todoRepository === undefined) return;

    if (!window.confirm('Are you sure you want to delete this account?'))
      return;

    await todoRepository.deleteAll();
    await userRepository.delete(currentUser.id);
    try {
      await firebaseAuthAdapter.deleteUser();
    } catch (e) {
      window.alert(`Delete user account failed!
Please logout and login again to refresh your credentials. Then delete your account.`);
      console.error(e);
      return;
    }
    push('/');
  };

  useEffect(() => {
    if (!isAuthenticating && currentUser === null) push('/');
  }, [isAuthenticating, currentUser, push]);

  return (
    <>
      {isAuthenticating ? (
        <p>Loading...</p>
      ) : (
        <>
          <table className="table">
            <tbody>
              <tr>
                <th scope="row">Name</th>
                <td>{currentUser?.name}</td>
              </tr>
              <tr>
                <th scope="row">Email</th>
                <td>{currentUser?.email}</td>
              </tr>
            </tbody>
          </table>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDeleteAccountBtnClick}
          >
            Delete this account
          </button>
        </>
      )}
    </>
  );
}
