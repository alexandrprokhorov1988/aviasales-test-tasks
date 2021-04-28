import React from 'react';
import './App.css';
import TicketList from '../../components/TicketsList/TicketList';
import data from '../../utils/data';

function App() {
  const [originTickets, setOriginTickets] = React.useState([]);
  const [tickets, setTickets] = React.useState([]);
  const [checkboxes, setCheckboxes] = React.useState([
    { id: 2, value: '0', isChecked: true, desc: 'Без пересадок' },
    { id: 3, value: '1', isChecked: true, desc: '1 пересадка' },
    { id: 4, value: '2', isChecked: true, desc: '2 пересадки' },
    { id: 5, value: '3', isChecked: true, desc: '3 пересадки' }
  ]);
  const [mainCheckbox, setMainCheckbox] = React.useState(true);
  const [count, setCount] = React.useState(0);
  const [sortType, setSortType] = React.useState('price');
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

  // React.useEffect(() => {
  //   setLoading(true);
  //   mainApi.getSearchId()
  //     .then((res) => {
  //       mainApi.getTickets(res.searchId)
  //         .then((data) => {
  //           let dataId = data.tickets.map((elem, i) => {
  //             return { ...elem, id: i }
  //           });
  //           setOriginTickets(dataId);
  //         })
  //         .catch(() => console.log('Ошибка сервера'))
  //         .finally(()=>setLoading(false));
  //     })
  //     .catch(() => console.log('Ошибка токена'));
  // }, []);

  React.useEffect(() => {
    let dataId = data.tickets.map((elem, i) => {
      return { ...elem, id: i }
    });
    setOriginTickets(dataId);
    setTickets(dataId.sort(priceSortFunc));
  }, []);

  // React.useEffect(() => {
  //   if(originTickets.length > 0) {
  //     let arg = [];
  //     let filteredArr;
  //     let func;
  //
  //     for (let item of checkboxes) {
  //       if (item.isChecked) {
  //         arg.push(+item.value);
  //       }
  //     }
  //     if (arg.length > 0) {
  //       filteredArr = originTickets.filter((elem) => {
  //         return arg.includes((elem.segments[0].stops.length + elem.segments[1].stops.length));
  //       });
  //     }
  //     if (sortType === 'price') func = priceSortFunc;
  //     if (sortType === 'duration') func = durationSortFunc;
  //     if (sortType === 'optimal') func = optimalSortFunc;
  //     let newTickets = arg.length > 0 ? filteredArr.sort(func) : originTickets.sort(func);
  //
  //     setTickets(newTickets);
  //   }
  // }, [originTickets, checkboxes, sortType]);

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

  // function handleButtonSortClick(type) {
  //   let func;
  //   if (type === 'price') func = priceSortFunc;
  //   if (type === 'duration') func = durationSortFunc;
  //   if (type === 'optimal') func = optimalSortFunc;
  //   let newTickets = originTickets.sort(func);
  //   setTickets(newTickets);
  //   setSortType(type);
  // }

  function handleFilterCheckboxClick(evt) {
    let target = evt.target;
    if (target.id === 'all') {
      setMainCheckbox(target.checked);
      const changeIsChecked = checkboxes.map((elem) => ({ ...elem, isChecked: target.checked }));
      setCheckboxes(changeIsChecked);
      filterCheckboxes(changeIsChecked, originTickets)
    } else {
      if (!target.checked) setMainCheckbox(false);
      const changeIsChecked = checkboxes.map((elem) => elem.id === +target.id ? {
        ...elem,
        isChecked: !elem.isChecked
      } : elem);
      setCheckboxes(changeIsChecked);
      filterCheckboxes(changeIsChecked, originTickets);
    }
  }

  function filterCheckboxes(arr, originArr) {
    let arg = [];
    for (let item of arr) {
      if (item.isChecked) {
        arg.push(+item.value);
      }
    }
    if (arg.length > 0) {
      let filteredArr;
      filteredArr = originArr.filter((elem) => {
        return arg.includes((elem.segments[0].stops.length + elem.segments[1].stops.length));
      });
      setTickets(filteredArr);
    } else {
      setTickets(originArr);
    }
  }

  console.log(count);

  return (
    <div className="page">
      <main className="content">
        <TicketList
          tickets={tickets}
          count={count}
          onFilterCheckboxClick={handleFilterCheckboxClick}
          sortType={sortType}
          // onButtonSortClick={handleButtonSortClick}
          // onCheckboxFilterClick={handleFilterCheckboxClick}
          checkboxes={checkboxes}
          mainCheckbox={mainCheckbox}
          loading={loading}
        />
        <div className="lazy-load" ref={lazyLoadRef}/>
      </main>
    </div>
  )
}

export default App;
