//https://codesandbox.io/s/github/btholt/react-hooks-examples/tree/master/
import React from "react";
import EffectComponent from "./Effect";
import StateComponent from "./State";
import Context from "./Context";
import Ref from "./Ref";
import Reducer from "./Reducer";
import Memo from "./Memo";
import Callback from "./Callback";
import LayoutEffect from "./LayoutEffect";
import ImperativeHandle from "./ImperativeHandle";

const Hooks = () => {
  return (
    <>
      <div style={{ padding: "0 20px" }}>
        <h1>Hooks In Depth</h1>
        <StateComponent />
        <hr />
        <EffectComponent />
        <hr />
        <Context />
        <hr />
        <Ref />
        <hr />
        <Reducer />
        <hr />
        <Memo />
        <hr />
        <Callback />
        <hr />
        <LayoutEffect />
        <hr />
        <ImperativeHandle />
      </div>
    </>
  );
};

export default Hooks;
