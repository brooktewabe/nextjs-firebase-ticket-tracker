'use client'
import React, { useState, useEffect } from 'react'
import withAuth from './withAuth'
import Link from 'next/link'
import Chart from './components/Chart'

function Home() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    async function fetchTickets() {
      const res = await fetch('http://localhost:4000/tickets');
      const data = await res.json();
      // display recent ones
      setTickets(data.reverse().slice(0, 3));
    }
    fetchTickets();
  }, []);

  return (
    <main>
      <h2>Dashboard</h2>
      <Chart/>
      <div className="flex justify-center my-8">
        <Link href="/tickets">
          <button className=""><h2>View All Tickets</h2> </button>
        </Link>
      </div>

      <h2>Recent Tickets</h2>
      {tickets.map((ticket) => (
          <div key={ticket.id} className="card my-5">
            <Link href={`/tickets/${ticket.id}`}>
              <h3>{ticket.title}</h3>
              <p>{ticket.body.slice(0, 150)}...</p>
              <div className={`pill ${ticket.priority}`}>
                {ticket.priority} priority
              </div>
            </Link>
          </div>
      ))}
    </main>
  )
}

export default withAuth(Home)
