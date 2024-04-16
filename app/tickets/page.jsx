"use client";
import { Suspense } from "react";
import TicketList from "./TicketList";
import Spinner from "../components/Spinner";
import Link from "next/link";
import withAuth from "../withAuth";

function Tickets() {
  return (
    <main>
      <nav>
        <div>
          <h2>Tickets</h2>
          <p>
            <small>Currently open tickets.</small>
          </p>
        </div>
        <Link href="/tickets/create" className="ml-auto">
          <button className="btn-primary">New Ticket</button>
        </Link>
      </nav>
      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </main>
  );
}

export default withAuth(Tickets);
