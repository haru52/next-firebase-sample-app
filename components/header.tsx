'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStateContext } from '@/components/state-provider';
import FirebaseAuthAdapter from '@/lib/adapters/firebase-auth-adapter';

const firebaseAuthAdapter = new FirebaseAuthAdapter();

export default function Header() {
  const Pathnames = {
    Home: '/',
    MyPage: '/my-page',
    TermsOfService: 'terms-of-service',
    PrivacyPolicy: 'privacy-policy',
  } as const;

  type Pathnames = (typeof Pathnames)[keyof typeof Pathnames];

  const currentPathname = usePathname();
  const { currentUser } = useStateContext();

  const getNavLinkClassNames = (pathname?: Pathnames) => {
    const commonClassNames = 'nav-link';
    return pathname === currentPathname
      ? `${commonClassNames} active`
      : commonClassNames;
  };

  const handleLogoutLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    firebaseAuthAdapter.logout();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" href={Pathnames.Home}>
          Next.js Firebase Sample App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={getNavLinkClassNames(Pathnames.Home)}
                aria-current="page"
                href={Pathnames.Home}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={getNavLinkClassNames(Pathnames.TermsOfService)}
                href={Pathnames.TermsOfService}
              >
                Terms of Service
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={getNavLinkClassNames(Pathnames.PrivacyPolicy)}
                href={Pathnames.PrivacyPolicy}
              >
                Privacy Policy
              </Link>
            </li>
            {currentUser !== null && (
              <>
                <li className="nav-item">
                  <Link
                    className={getNavLinkClassNames(Pathnames.MyPage)}
                    href={Pathnames.MyPage}
                  >
                    My page
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    href="#"
                    className={getNavLinkClassNames()}
                    onClick={handleLogoutLinkClick}
                  >
                    Logout
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
