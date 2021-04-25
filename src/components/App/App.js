import React from 'react';
import './App.css';
import TicketList from '../../components/TicketsList/TicketList';
import data from '../../utils/data';

function App() {
  const [tickets, setTickets] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [buttonSortActive, setButtonSortActive] = React.useState('price');
  const lazyLoadRef = React.useRef();

  React.useEffect(() => {
    setTickets(data.tickets.sort((a, b) => {
      return a.price - b.price;
    }));
  }, []);

  React.useEffect(() => {
    let options = {
      rootMargin: "0px 0px 200px 0px"
    };

    let callback = function (entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setCount(count + 5);
          observer = observer.disconnect();
        }
      });
    };

    let observer = new IntersectionObserver(callback, options);
    observer.observe(lazyLoadRef.current);
  }, [count]);

  function handleButtonSortClick(desc) {
    setButtonSortActive(desc);
    let func;
    const priceSortFunc = (a, b) => a.price - b.price;
    const durationSortFunc = (a, b) => {
      return (a.segments[0].duration + a.segments[1].duration) -
        (b.segments[0].duration + b.segments[1].duration);
    };
    const optimalSortFunc = (a, b) => {
      const countStopsMOW = a.segments[0].stops.length + a.segments[1].stops.length;
      const countStopsHKT = b.segments[0].stops.length + b.segments[1].stops.length;
      if (a === b) {
        return (a.segments[0].duration + a.segments[1].duration) -
          (b.segments[0].duration + b.segments[1].duration);
      }
      return countStopsMOW - countStopsHKT;
    };

    if (desc === 'price') func = priceSortFunc;
    if (desc === 'duration') func = durationSortFunc;
    if (desc === 'optimal') func = optimalSortFunc;
    setTickets(tickets.sort(func));
  }

  return (
    <div className="page">
      <main className="content">
        <TicketList
          tickets={tickets}
          count={count}
          buttonActive={buttonSortActive}
          onButtonSortClick={handleButtonSortClick}
        />
        <div className="lazy-load" ref={lazyLoadRef}/>
      </main>
    </div>
  )
}

export default App;
