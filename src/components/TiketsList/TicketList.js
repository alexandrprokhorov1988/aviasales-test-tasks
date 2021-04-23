import React from 'react';
import './TicketList.css';
import Ticket from '../../components/Ticket/Ticket';

function TicketList(props) {

  return (
    <section className='ticketList'>
      <Ticket/>
    </section>
  )
}

export default TicketList;
