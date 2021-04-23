import React from 'react';
import './App.css';
import TiketList from '../../components/TiketsList/TicketList';
import data from '../../utils/data';

function App() {
  const [tickets, setTickets] = React.useState([]);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    setTickets(data);
  }, []);

  return (
    <div className="page">
      <main className="content">
        <TiketList
          tickets={data.tickets}
          count={count}
        />
      </main>
    </div>
  )
}

export default App;
