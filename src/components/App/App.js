import React from 'react';
import './App.css';
import TicketList from '../../components/TicketsList/TicketList';
import data from '../../utils/data';
import mainApi from '../../utils/MainApi';
import {CONNECTION_REFUSED, SERVER_ERR, TOKEN_ERR} from "../../utils/constants";

function App() {
  const [originTickets, setOriginTickets] = React.useState([]);
  const [tickets, setTickets] = React.useState([]);
  const [checkboxes, setCheckboxes] = React.useState([
    { id: 2, value: '0', isChecked: false, desc: 'Без пересадок' },
    { id: 3, value: '1', isChecked: false, desc: '1 пересадка' },
    { id: 4, value: '2', isChecked: false, desc: '2 пересадки' },
    { id: 5, value: '3', isChecked: false, desc: '3 пересадки' }
  ]);
  const [mainCheckbox, setMainCheckbox] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const [sortType, setSortType] = React.useState('price');
  const [errMessage, setErrMessage] = React.useState('');
  const [loading, setLoading] = React.useState('');
  const lazyLoadRef = React.useRef();
  const priceSortFunc = (a, b) => a.price - b.price;
  const durationSortFunc = (a, b) => {
    return (a.segments[0].duration + a.segments[1].duration) -
      (b.segments[0].duration + b.segments[1].duration);
  };
  const optimalSortFunc = (a, b) => {
    const countStopsMOW = a.segments[0].stops.length + a.segments[1].stops.length;
    const countStopsHKT = b.segments[0].stops.length + b.segments[1].stops.length;
    if (countStopsMOW === countStopsHKT) return a.price - b.price;
    return countStopsMOW - countStopsHKT;
  };

  React.useEffect(() => {
    setLoading(true);
    mainApi.getSearchId()
      .then((res) => {
        mainApi.getTickets(res.searchId)
          .then((data) => {
            let dataId = data.tickets.map((elem, i) => {
              return { ...elem, id: i }
            });
            setOriginTickets(dataId);
            setTickets(dataId.sort(priceSortFunc));
          })
          .catch(() => {
            setErrMessage(SERVER_ERR);
          })
          .finally(() => setLoading(false));
      })
      .catch((err) => {
        if (err.toString() === 'TypeError: Failed to fetch') {
          setErrMessage(CONNECTION_REFUSED);
        } else {
          setErrMessage(TOKEN_ERR);
        }
      });
  }, []);

  React.useEffect(() => {
    if (tickets.length > 0) {
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
    }
  }, [count, tickets]);

  function handleButtonSortClick(type) {
    setTickets(sortFunc(tickets, type));
    setSortType(type);
  }

  function sortFunc(arr, type) {
    let func;
    if (type === 'price') func = priceSortFunc;
    if (type === 'duration') func = durationSortFunc;
    if (type === 'optimal') func = optimalSortFunc;
    return arr.sort(func);
  }

  function filterFunc(checkboxesArr) {
    let arg = [];
    for (let item of checkboxesArr) {
      if (item.isChecked) {
        arg.push(+item.value);
      }
    }
    if (arg.length === checkboxes.length) setMainCheckbox(true);
    if (arg.length > 0) {
      let filteredArr;
      filteredArr = originTickets.filter((elem) => {
        return arg.includes((elem.segments[0].stops.length + elem.segments[1].stops.length));
      });
      setTickets(sortFunc(filteredArr, sortType));
    } else {
      setTickets(sortFunc(originTickets, sortType));
    }
  }

  function handleCheckboxClick(evt) {
    const target = evt.target;
    if (target.id === 'all') {
      setMainCheckbox(target.checked);
      const newCheckboxesArr = checkboxes.map((elem) => ({ ...elem, isChecked: target.checked }));
      setCheckboxes(newCheckboxesArr);
      filterFunc(newCheckboxesArr);
    } else {
      if (!target.checked) setMainCheckbox(false);
      const newCheckboxesArr = checkboxes.map((elem) => elem.id === +target.id ? {
        ...elem,
        isChecked: !elem.isChecked
      } : elem);
      setCheckboxes(newCheckboxesArr);
      filterFunc(newCheckboxesArr);
    }
  }

  return (
    <div className="page">
      <main className="content">
        <TicketList
          tickets={tickets}
          count={count}
          onFilterCheckboxClick={handleCheckboxClick}
          sortType={sortType}
          onButtonSortClick={handleButtonSortClick}
          checkboxes={checkboxes}
          mainCheckbox={mainCheckbox}
          loading={loading}
          errMessage={errMessage}
        />
        <div className="lazy-load" ref={lazyLoadRef}/>
      </main>
    </div>
  )
}

export default App;
