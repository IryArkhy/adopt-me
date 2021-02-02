import React, { useState, useRef } from "react";

const RefComponent = () => {
  const [stateNumber, setStateNumber] = useState(0);
  const numRef = useRef(0);

  function incrementAndDelayLogging() {
    // we setting the number, we increment it and this causes a re-render BUT
    // stateNumber actualy doesn't change here
    setStateNumber(stateNumber + 1);
    console.log(stateNumber);
    numRef.current++; // this line will give you an instant and correct inrement
    setTimeout(
      // because of the clousure we alert the previous state number and not current
      () => alert(`state: ${stateNumber} | ref: ${numRef.current}`),
      1000
    );
  }
  return (
    <div>
      <h1>useRef Example</h1>
      <button onClick={incrementAndDelayLogging}>delay logging</button>
      <h4>state: {stateNumber}</h4>
      <h4>ref: {numRef.current}</h4>
    </div>
  );
};

export default RefComponent;
