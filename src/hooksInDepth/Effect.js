import React, { useState, useEffect } from "react";

const EffectComponent = () => {
  const [time, setTime] = useState(new Date());

  // this function is not immidiatelly run
  //it's delayed: the render will be first and then useEffect is scheduling its function to run later
  useEffect(() => {
    const timer = setTimeout(() => setTime(new Date()), 1000);
    return () => clearTimeout(timer);
  });

  return <h1>useEffect Example: {time.toLocaleTimeString()}</h1>;
};

// 1)  <h1>useEffect Example: {time.toLocaleTimeString()}</h1>; renders for the first time taking the default value from the state
// 2) the function you provide to useEffect is called
// 3) the function sets a new timer to run the setTimer with a new day in 1000 miliseconds. The function is using setTimeout and not the setInterval because it's rendering every single 1 second which is always scheduling a new timeout. It's a proof that it's constantly scheduling this action.

// 4) Now, you notice here that it's returning a function that calls clearTimeout. Because if you don't clear timeouts, you can potentially have weird bugs where I have this useEffect thing, and then I unmount it. And it's then going to try and call setTimeout, or rather, setTime again on an unmounted component, and that's bad, right? So here what I do is anytime that this runs, it grabs this timer. And if this gets unmounted, it'll clear the timer, right? So this function will get run, this is the clean up function.

export default EffectComponent;
