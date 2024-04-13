'use client'
import React from 'react';
import withAuth from '../withAuth';

const AboutPage = () => {
  return (
    <div className='p-4'>
      About Page
    </div>
  );
};

export default withAuth(AboutPage);
