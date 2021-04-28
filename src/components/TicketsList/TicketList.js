import React from 'react';
import './TicketList.css';
import Ticket from '../../components/Ticket/Ticket';
import Checkbox from '../../components/Checkbox/Checkbox';
import Logo from '../../images/Logo.svg';
import {TICKETS_IN_A_ROW} from "../../utils/config";
import Preloader from '../../components/Preloader/Preloader';

function TicketList(
  { loading, checkboxes, tickets, count, onButtonSortClick, sortType, onFilterCheckboxClick, mainCheckbox }) {

  function handleClick(e) {
    onButtonSortClick(e.target.value);
  }

  function handleChange(e) {
    onFilterCheckboxClick(e);
  }

  return (
    <section className='ticketList'>
      <a target='_blank' rel="noreferrer noopener" href="https://www.aviasales.ru/" title="Aviasales"
         className="ticketList__link">
        <img src={Logo} alt="Логотип Авиасэйлс" className="ticketList__logo"/>
      </a>
      <div className="ticketList__filters">
        <h2 className="ticketList__filters-title">Количество пересадок</h2>
        <input type="checkbox"
               className="checkbox"
               checked={mainCheckbox}
               onChange={handleChange}
               name='all'
               value='all'
               id='all'/>
        <label htmlFor='all' className="checkbox__label">Все</label>
        {checkboxes.map((checkbox) => (
          <Checkbox key={checkbox.id} {...checkbox} onFilterCheckboxClick={onFilterCheckboxClick}/>))
        }
      </div>
      <div className="ticketList__button-container">
        <button
          className={`ticketList__button ${sortType === 'price' && 'ticketList__button_active'}`}
          onClick={handleClick}
          value={'price'}>Самый дешевый
        </button>
        <button
          className={`ticketList__button ${sortType === 'duration' && 'ticketList__button_active'}`}
          onClick={handleClick}
          value={'duration'}>Самый быстрый
        </button>
        <button
          className={`ticketList__button ${sortType === 'optimal' && 'ticketList__button_active'}`}
          onClick={handleClick}
          value={'optimal'}>Оптимальный
        </button>
      </div>
      <div className="ticketList__container">
        {loading ? <Preloader/> : tickets.slice(0, count + TICKETS_IN_A_ROW).map((ticket, i) => (
          <Ticket key={ticket.id} {...ticket} />))
        }
      </div>
    </section>
  )
}

export default TicketList;
