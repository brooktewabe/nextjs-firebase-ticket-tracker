'use client'
import withAuth from '@/app/withAuth'
import CreateForm from './CreateForm'
function CreateTicket() {
    return (
        <main>
          <h2 className="text-center">Open a New Ticket</h2>
          <CreateForm />
        </main>
      )
}

export default withAuth(CreateTicket) 