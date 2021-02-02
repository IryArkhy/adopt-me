import React, { useState } from "react";
import { css, keyframes } from "@emotion/react";
import { Link } from "@reach/router";
import colors from "./colors";

// template string feature came in 2015
// hear its a tag, and this runs a template litaral through a function

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const NavBar = () => {
  const [padding, setPadding] = useState(15);
  return (
    <header
      onClick={() => setPadding(padding + 5)}
      css={css`
        background-color: ${colors.primary};
        padding: ${padding}px;
      `}
      role="presentation"
    >
      <Link to="/">Adopt Me!</Link>
      <span
        css={css`
          font-size: 60px;
          display: inline-block;
          animation: 1s ${spin} linear infinite;

          &:hover {
            text-decoration: underline;
            animation: 1s ${spin} linear infinite reverse;
          }

          /* & > button {}
          button {} */
        `}
        aria-label="logo"
        role="img"
      >
        🐩
      </span>
    </header>
  );
};

export default NavBar;
