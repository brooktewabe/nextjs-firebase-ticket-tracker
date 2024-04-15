import { notFound } from "next/navigation"

export const dynamicParams = true // default val = true

export async function generateStaticParams() {
  const res = await fetch('http://localhost:4000/tickets')

  const tickets = await res.json()
 
  return tickets.map((ticket) => ({
    id: ticket.id
  }))
}

// can't be done in server side component tho 
const handleDelete = async (id, router) => {
    const res = await fetch(`http://localhost:4000/tickets/${id}`, {
      method: 'DELETE',
    });
    console.log(`Deleted ticket with ID ${id}`);
  
    if (res.ok) {
      router.push('/tickets');
      router.reload();
    }
  };

async function getTicket(id) {
  const res = await fetch(`http://localhost:4000/tickets/${id}`, {
    next: {
      revalidate: 60
    }
  })

  if (!res.ok) {
    notFound()
  }

  return res.json()
}


export default async function TicketDetails({ params }) {
  // const id = params.id
  const ticket = await getTicket(params.id)

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
      <button
            //   onClick={() => handleDelete(ticket.id)}
              className="absolute top-0 right-0 m-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  )
}



// 'use client'
// import { notFound } from "next/navigation"
// import { useRouter } from "next/navigation"

// async function getTicket(id) {
//   const res = await fetch(`http://localhost:4000/tickets/${id}`, {
//     next: {
//       revalidate: 60
//     }
//   });

//   if (!res.ok) {
//     notFound();
//   }

//   return res.json();
// }

// const handleDelete = async (id, router) => {
//   const res = await fetch(`http://localhost:4000/tickets/${id}`, {
//     method: 'DELETE',
//   });
//   console.log(`Deleted ticket with ID ${id}`);

//   if (res.ok) {
//     router.push('/tickets');
//     router.reload();
//   }
// };

// export default async function TicketDetails({ params }) {
//   const router = useRouter();
//   const ticket = await getTicket(params.id);

//   return (
//     <main>
//       <nav>
//         <h2>Ticket Details</h2>
//       </nav>
//       <div className="card relative">
//         <button
//           onClick={() => handleDelete(ticket.id, router)}
//           className="absolute top-0 right-0 m-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-4 w-4"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>
//         <h3>{ticket.title}</h3>
//         <small>Created by {ticket.user_email}</small>
//         <p>{ticket.body}</p>
//         <div className={`pill ${ticket.priority}`}>
//           {ticket.priority} priority
//         </div>
//       </div>
//     </main>
//   );
// }
