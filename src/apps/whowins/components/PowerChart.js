import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Bar = styled.div`
  &::after {
    background-color: ${(props) => (props.winning ? "#70B96E" : "#FC595B")};
    width: ${(props) => `${props.scale}%`};
    transform-origin: ${(props) => `${props.odd ? "right" : "left"}`};
    ${(props) => `${props.odd ? "margin-left: auto;" : ""}`}
  }
`;

const PowerChart = ({ power, heroes }) => {
  const [winner, setWinner] = useState({});
  useEffect(() => {
    let winner = null;
    heroes.forEach((hero) => {
      if (
        !winner ||
        Math.max(+winner.powerstats[power], +hero.powerstats[power])
      ) {
        winner = hero;
      }
    });
    setWinner(winner || {});
  }, [heroes, power, setWinner]);

  const bars = heroes.map((hero, index) => (
    <Bar
      className="ww-power-chart__bars-wrapper__bar"
      key={`bar-${power}-${hero.id}`}
      scale={hero.powerstats[power]}
      winning={hero.id === winner.id}
      odd={!(index % 2)}
    >
      <span
        className={`ww-power-chart__bars-wrapper__bar__value ${
          hero.id === winner.id
            ? `ww-power-chart__bars-wrapper__bar__value_winning`
            : ""
        }`}
      >
        {hero.powerstats[power]}
      </span>
    </Bar>
  ));

  return (
    <div className="ww-power-chart">
      <h3 className="ww-h3">{power}</h3>
      <div className="ww-power-chart__bars-wrapper">{bars}</div>
    </div>
  );
};

export default PowerChart;
