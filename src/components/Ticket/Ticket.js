import React from 'react';
import './Ticket.css';
import logo from '../../images/'

function Ticket(props) {

  return (
    <article className="ticket">
      <div className="ticket__header">
        <p className="ticket__price">{props.price}</p>
        <a href="#">
          <img src="" alt="S7 логотип"/>
        </a>
      </div>
    </article>
  )
}

export default Ticket;
