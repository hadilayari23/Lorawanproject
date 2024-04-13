import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

function GroupedButtons() {
  let [count, setCount] = useState(0);

  function incrementCount() {
    count = count + 10;
    setCount(count);
  }
  function decrementCount() {
  
    count = count - 10;
    setCount(count);
  }


    return (
      <div>
      <div>{count}</div>
      <button onClick={incrementCount}>+</button>
      <button onClick={decrementCount}>-</button>
      </div>
    );
  }


export default GroupedButtons;