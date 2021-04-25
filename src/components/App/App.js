import React from 'react';
import './App.css';
import TiketList from '../../components/TiketsList/TicketList';
import data from '../../utils/data';

function App() {
  const [tickets, setTickets] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [buttonSortActive, setButtonSortActive] = React.useState(1);
  const lazyLoadRef = React.useRef();

  React.useEffect(() => {
    setTickets(data.tickets);
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
  });

  function handleButtonSortClick(num) {
    setButtonSortActive(+num);
  }

  return (
    <div className="page">
      <main className="content">
        <TiketList
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
