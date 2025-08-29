import { Link, useMatches, useLocation } from '@remix-run/react';

export type BreadcrumbHandle = {
  breadcrumb: (data?: any) => {
    title: string;
    to?: string;
  };
};

export default function Breadcrumb() {
  const matches = useMatches();
  const location = useLocation();
  
  // ホーム画面、ログイン画面、サインアップ画面では表示しない
  if (location.pathname === '/' || 
      location.pathname === '/login' || 
      location.pathname === '/signup' ||
      location.pathname.startsWith('/login/') ||
      location.pathname.startsWith('/signup/')) {
    return null;
  }

  return (
    <>
      {
        <nav
          className="flex h-12 px-5 p-4 py-3 text-gray-500"
          aria-label="breadcrumbs"
        >
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                to="/"
                className="inline-flex items-center text-sm font-medium"
                prefetch="intent"
              >
                <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                Home
              </Link>
              {
                matches
                  .filter((match) => match.handle && typeof match.handle === 'object' && match.handle !== null && 'breadcrumb' in match.handle)
                  .map((match, index) => {
                    const breadcrumb = (match.handle as BreadcrumbHandle).breadcrumb(match.data);
                    return (
                      <div key={index}>
                        <div className="flex items-center">
                          <ArrowRight className="mx-1" />
                          <Link to={breadcrumb.to || match.pathname} prefetch='intent'>
                            <span className="text-sm font-medium">
                              {breadcrumb.title}
                            </span>
                          </Link>
                        </div>
                      </div>
                    );
                  })
              }
            </li>
          </ol>
        </nav>
      }
    </>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`w-6 h-6 ${className}`}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"></path>
    </svg >
  );
}
