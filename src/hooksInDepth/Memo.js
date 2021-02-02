/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useMemo } from "react";

const fibonacci = (n) => {
  if (n <= 1) {
    return 1;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
};

const MemoComponent = () => {
  const [num, setNum] = useState(40);
  const [isGreen, setIsGreen] = useState(true);
  // without useMemo
  // const fib = fibonacci(num);

  // with useMemo
  //  Если я не использую useMemo, то при клике на кнопку, чтобы изменить цвет происходи пересчет числа фибоначи. Пока функция не вернет результат - ре-рендер не произойдет, даже если число, от которого высчитывается фибоначи не поменялось с прошлого рендера. По сути, что мы говорим: "Если аргумент функции не поменялся с прошлого рендера, не нужно снова высчитывать результат функции, чтобы произвести ре-рендер"
  const fib = useMemo(() => fibonacci(num), [num]);

  return (
    <div>
      <h1
        onClick={() => setIsGreen(!isGreen)}
        style={{ color: isGreen ? "limegreen" : "crimson" }}
      >
        useMemo Example
      </h1>
      <h2>
        Fibonacci of {num} is {fib}
      </h2>
      <button onClick={() => setNum(num + 1)}>➕</button>
    </div>
  );
};

export default MemoComponent;
