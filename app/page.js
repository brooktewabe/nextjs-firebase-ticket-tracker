'use client'
import React from 'react'
import withAuth from './withAuth'

function Home() {
  return (
    <div>Home</div>
  )
}

export default withAuth(Home)