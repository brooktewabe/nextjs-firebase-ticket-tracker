import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserAuth } from "./context/AuthContext";
import Spinner from './components/Spinner';

const withAuth = (WrappedComponent) => {
  const hocComponent = (props) => {
    const router = useRouter();
    const { user } = UserAuth();
    const [loading, setLoading] = useState(true);
    const [redirecting, setRedirecting] = useState(false);

    useEffect(() => {
      const checkAuth = async () => {
        const isAuth = localStorage.getItem('isAuth');
        if (!isAuth && !user) {
          setRedirecting(true);
          router.push('/login');
        } else {
          setLoading(false);
        }
      };
      checkAuth();
    }, [router, user]);

    if (loading || redirecting) {
      return <div><Spinner/></div>;
    }

    return <WrappedComponent {...props} />;
  };

  return hocComponent;
};

export default withAuth;
