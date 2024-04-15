'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Spinner from '../components/Spinner';
import withAuth from '../withAuth';

async function getTickets() {
  const res = await fetch('http://localhost:4000/tickets', {
    next: {
      revalidate: 0 // use 0 to opt out of using cache
    }
  });

  return res.json();
}

function TicketList() {
    const [loading, setLoading] = useState(true);
    const [tickets, setTickets] = useState([]);
  
    useEffect(() => {
      const fetchTickets = async () => {
        const ticketsData = await getTickets();
        setTickets(ticketsData);
        setLoading(false);
      };
  
      fetchTickets();
    }, []);
  
    if (loading) {
      return <Spinner />;
    }
  
    return (
      <>
        {tickets.map((ticket) => (
          <div key={ticket.id} className="card my-5">
            <Link href={`/tickets/${ticket.id}`}>
              <h3>{ticket.title}</h3>
              <p>{ticket.body.slice(0, 200)}...</p>
              <div className={`pill ${ticket.priority}`}>
                {ticket.priority} priority
              </div>
            </Link>
          </div>
        ))}
        {tickets.length === 0 && (
          <p className="text-center">There are no open tickets, yay!</p>
        )}
      </>
    );
}

export default withAuth(TicketList) 