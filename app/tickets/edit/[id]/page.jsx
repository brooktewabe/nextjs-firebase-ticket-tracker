"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/Spinner";
import withAuth from "@/app/withAuth";
import { UserAuth } from "../../../context/AuthContext";


function TicketDetails({ params }) {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [priority, setPriority] = useState("low");
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingTicket, setIsLoadingTicket] = useState(true);
    const { user } = UserAuth();

    const getTicket = async (id) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tickets/${id}`);
      if (!res.ok) {
        // notFound() // this wouldn't work  here because it would throw an error instead of redirect
        router.push("/tickets");
      }
      const data = await res.json();
      setTitle(data.title);
      setBody(data.body);
      setPriority(data.priority);
      setIsLoadingTicket(false); // Set loading to false after fetching ticket
    };
  
    useEffect(() => {
      getTicket(params.id);
    }, []);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
  
      const updatedTicket = { title, body, priority,  user_email: user.email  };
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tickets/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTicket),
      });
  
      if (res.status === 200) {
        router.push("/tickets");
      } else if (res.error) {
        // Handle error
        console.log(error);
        setIsLoading(false);
      }
    };
  
    if (isLoadingTicket) {
      return <Spinner />;
    }

    return (
        <main>
          <nav>
            <h2>Update Ticket Details</h2>
          </nav>
          <div className="card">
            <form onSubmit={handleSubmit} className="w-1/2">
              <label htmlFor="title">
                <span>Title:</span>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </label>
              <label>
                <span>Body:</span>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                />
              </label>
              <label>
                <span>Priority:</span>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </label>
              <button className="btn-primary" disabled={isLoading}>
                {isLoading ? <span>Updating...</span> : <span>Update Ticket</span>}
              </button>
            </form>
          </div>
        </main>
      );
}

export default withAuth(TicketDetails) 