import { notFound} from "next/navigation";
import DeleteButton from "./delete";
import EditButton from "./edit";

export const dynamicParams = true; 

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tickets`);

  const tickets = await res.json();

  return tickets.map((ticket) => ({
    id: String(ticket.id),
  }));
}

async function getTicket(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tickets/${id}`, {
    next: {
      // reloads the fetches after 1 min(1 min cache)
      revalidate: 60,
    },
  });

  if (!res.ok) {
    notFound();
  }
  return res.json();
}

export default async function TicketDetails({ params }) {
  const ticket = await getTicket(params.id);
// has premature render issue since this is a server component withAuth
// and localStorage check can't be used (both need client components)
// http://localhost:3000/tickets/1

  // let storage =''
  // if (typeof window === "undefined") {
  //   console.log('local storage is not defined')
  // }
  // if (typeof window !== "undefined") {
  //   storage = localStorage.getItem("isAuth") === "true";
  // }

  return (
    <main>
      {/* {storage? <></>: */}
      <>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <DeleteButton id={ticket.id} />
        <EditButton id={ticket.id} />
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
      </>
      {/* } */}
    </main>
  );
}
