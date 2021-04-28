import React from 'react';
import './Checkbox.css';

const Checkbox = React.memo((props) => {

  function handleChange(e) {
    props.onCheckboxFilterClick(e.target);
  }

  return (
    <>
      <input type="checkbox"
             className="checkbox"
             checked={props.isChecked}
             onChange={handleChange}
             name={props.name}
             value={props.value}
             id={props.id}/>
      <label htmlFor={props.id} className="checkbox__label">{props.desc}</label>
    </>
  )
});

export default Checkbox;
