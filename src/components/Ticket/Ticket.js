import React from 'react';
import './Ticket.css';
import logo from '../../images/s7logo.png';

const Ticket = React.memo((props) => {
  const getNumbersExtensions = (n, titles) => {
    return titles[
      (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)
      ];
  };
  const getTimeFromMinutes = (minutes) => `${((minutes) / 60) | 0}ч ${(minutes % 60) | 0}м`;
  const getSumTravelTime = (date, duration) => {
    const timeStamp = Date.parse(date);
    const newDate = new Date(timeStamp);
    const newDuration = new Date(timeStamp + duration * 60 * 1000);
    const hoursAndMinutesDeparture = newDate.toLocaleString('default', { hour: 'numeric', minute: 'numeric' });
    const hoursAndMinutesArrival = newDuration.toLocaleString('default', { hour: 'numeric', minute: 'numeric' });
    return `${hoursAndMinutesDeparture} - ${hoursAndMinutesArrival}`
  };
  const wordEndings = ['- пересадка', '- пересадки', '- пересадок'];
  const extensionMOW = (getNumbersExtensions(props.segments[0].stops.length, wordEndings));
  const extensionHKT = (getNumbersExtensions(props.segments[1].stops.length, wordEndings));
  const travelDurationTimeInMinutesMOW = getTimeFromMinutes(props.segments[0].duration);
  const travelDurationTimeInMinutesHKT = getTimeFromMinutes(props.segments[1].duration);
  const timeMOW = getSumTravelTime(props.segments[0].date, props.segments[0].duration);
  const timeHKT = getSumTravelTime(props.segments[0].date, props.segments[1].duration);


  return (
    <article className="ticket" >
      <div className="ticket__header">
        <p className="ticket__price">{props.price} P</p>
        <a target='_blank' rel="noreferrer noopener" href="https://www.s7.ru/" className="ticket__link">
          <img src={logo} alt="S7 логотип" className="ticket__logo"/>
        </a>
      </div>
      <div className="ticket__info-container">
        <div className="ticket__info">
          <p className="ticket__info-text">MOW – HKT</p>
          <p className="ticket__info-sub-text">{timeHKT}</p>
        </div>
        <div className="ticket__info">
          <p className="ticket__info-text">В пути</p>
          <p className="ticket__info-sub-text ticket__info-sub-text_size_low">{travelDurationTimeInMinutesHKT}</p>
        </div>
        <div className="ticket__info">
          <p className="ticket__info-text">{`${props.segments[0].stops.length || 'без'} ${extensionMOW}`}</p>
          <p className="ticket__info-sub-text">{props.segments[0].stops.join(', ')}</p>
        </div>
        <div className="ticket__info">
          <p className="ticket__info-text">MOW - HKT</p>
          <p className="ticket__info-sub-text">{timeMOW}</p>
        </div>
        <div className="ticket__info">
          <p className="ticket__info-text">В пути</p>
          <p className="ticket__info-sub-text ticket__info-sub-text_size_low">{travelDurationTimeInMinutesMOW}</p>
        </div>
        <div className="ticket__info">
          <p className="ticket__info-text">{`${props.segments[1].stops.length || 'без'} ${extensionHKT}`}</p>
          <p className="ticket__info-sub-text">{props.segments[1].stops.join(', ')}</p>
        </div>
      </div>
    </article>
  )
});

export default Ticket;
