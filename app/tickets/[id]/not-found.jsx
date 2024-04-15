'use client'
import withAuth from '@/app/withAuth'
import React from 'react'
import Link from 'next/link'

function notFound() {
    return (
        <main className="text-center">
          <h2 className="text-3xl">Ticket Not Found</h2>
          <p>We could not find the ticket you were looking for.</p>
          <p>Go back to all <Link href="/tickets">tickets</Link>.</p>
        </main>
      )
}

export default withAuth(notFound) 