import React from 'react';
import './TicketList.css';
import Ticket from '../../components/Ticket/Ticket';
import Logo from '../../images/Logo.svg';
import {TICKETS_IN_A_ROW} from "../../utils/config";

function TicketList({ tickets, count }) {

  return (
    <section className='ticketList'>
      <a href="https://www.aviasales.ru/">
        <img src={Logo} alt="Логотип Авиасэйлс"/>
      </a>
      <div className="ticketList__filters">
        <h2 className="ticketList__filters-title">Количество пересадок</h2>
        <label htmlFor="all" className="ticketList__checkbox-label">Все</label>
        <input className="ticketList__checkbox" type="checkbox" name="filter" id="all" value="all"/>
        <label htmlFor="noOne" className="ticketList__checkbox-label">Без пересадок</label>
        <input className="ticketList__checkbox" type="checkbox" name="filter" id="noOne" value="0"/>
        <label htmlFor="one" className="ticketList__checkbox-label">1 пересадка</label>
        <input className="ticketList__checkbox" type="checkbox" name="filter" id="one" value="1"/>
        <label htmlFor="two" className="ticketList__checkbox-label">2 пересадки</label>
        <input className="ticketList__checkbox" type="checkbox" name="filter" id="two" value="2"/>
        <label htmlFor="three" className="ticketList__checkbox-label">3 пересадки</label>
        <input className="ticketList__checkbox" type="checkbox" name="filter" id="three" value="3"/>
      </div>
      <div className="ticketList__button-container">
        <button className="ticketList__button">Самый дешевый</button>
        <button className="ticketList__button">Самый быстрый</button>
        <button className="ticketList__button">Оптимальный</button>
      </div>
      <div className="ticketList__container">
        {tickets.slice(0, count + TICKETS_IN_A_ROW).map((ticket, i) => (
          <Ticket key={i} {...ticket} />))
        }
      </div>
    </section>
  )
}

export default TicketList;
