import React from 'react';
import './TicketList.css';
import Ticket from '../../components/Ticket/Ticket';
import Logo from '../../images/Logo.svg';
import {TICKETS_IN_A_ROW} from "../../utils/config";

function TicketList({ tickets, count, onButtonSortClick, buttonActive }) {

  function handleClick(e) {
    onButtonSortClick(e.target.value);
  }

  function handleChange(e) {
    console.log(e.target);
  }

  return (
    <section className='ticketList'>
      <a target='_blank' rel="noreferrer" href="https://www.aviasales.ru/" title="Aviasales"
         className="ticketList__link">
        <img src={Logo} alt="Логотип Авиасэйлс" className="ticketList__logo"/>
      </a>
      <div className="ticketList__filters">
        <h2 className="ticketList__filters-title">Количество пересадок</h2>
        <input onChange={handleChange} className="ticketList__checkbox" type="checkbox" name="filterAll" id="all"
               value="all"/>
        <label htmlFor="all" className="ticketList__checkbox-label">Все</label>
        <input onChange={handleChange} className="ticketList__checkbox" type="checkbox" name="filter" id="noOne"
               value="0"/>
        <label htmlFor="noOne" className="ticketList__checkbox-label">Без пересадок</label>
        <input onChange={handleChange} className="ticketList__checkbox" type="checkbox" name="filter" id="one"
               value="1"/>
        <label htmlFor="one" className="ticketList__checkbox-label">1 пересадка</label>
        <input onChange={handleChange} className="ticketList__checkbox" type="checkbox" name="filter" id="two"
               value="2"/>
        <label htmlFor="two" className="ticketList__checkbox-label">2 пересадки</label>
        <input onChange={handleChange} className="ticketList__checkbox" type="checkbox" name="filter" id="three"
               value="3"/>
        <label htmlFor="three" className="ticketList__checkbox-label">3 пересадки</label>
      </div>
      <div className="ticketList__button-container">
        <button
          className={`ticketList__button ${buttonActive === 'price' && 'ticketList__button_active'}`}
          onClick={handleClick}
          value={'price'}>Самый дешевый
        </button>
        <button
          className={`ticketList__button ${buttonActive === 'duration' && 'ticketList__button_active'}`}
          onClick={handleClick}
          value={'duration'}>Самый быстрый
        </button>
        <button
          className={`ticketList__button ${buttonActive === 'optimal' && 'ticketList__button_active'}`}
          onClick={handleClick}
          value={'optimal'}>Оптимальный
        </button>
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
