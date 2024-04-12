'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserAuth } from "../context/AuthContext";


const AboutPage = () => {
  const router = useRouter();
  const { user } = UserAuth();

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuth');
    if (!isAuth && !user) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className='p-4'>
      About Page
    </div>
  );
};

export default AboutPage;
