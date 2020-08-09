import React, { useState, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import PowerChart from "./PowerChart";
import Svg from "./Svg.js";

import restartSvg from "../images/restart.svg";

const Results = ({ heroes, resetApp }) => {
  const POWERSTATS = {
    intelligence: 0.3,
    strength: 0.15,
    speed: 0.05,
    durability: 0.1,
    power: 0.25,
    combat: 0.2,
  };
  const [winner, setWinner] = useState({});

  useEffect(() => {
    let winner = {};
    const results = heroes.map((hero) => ({
      ...hero,
      result: Object.keys(hero.powerstats).reduce((number, power) => {
        return (number += hero.powerstats[power] * POWERSTATS[power]);
      }, 0),
    }));
    results.forEach((hero) => {
      if (!winner.result || hero.result > winner.result) {
        winner = hero;
      }
    });
    setWinner(winner);
  }, []);

  const powerCharts = Object.keys(POWERSTATS).map((power) => (
    <CSSTransition
      in={true}
      appear={true}
      key={`power-chart-${power}`}
      classNames="chart"
      timeout={{ appear: 1000 }}
    >
      <PowerChart power={power} heroes={heroes} />
    </CSSTransition>
  ));

  return (
    <div id="ww-results" className="ww-results">
      <div className="ww-results__info">
        <div className="ww-results__info__names">
          {heroes.map((hero) => (
            <div key={`results-name-${hero.id}`} className="ww-cloud">
              {hero.name}
            </div>
          ))}
        </div>
        <TransitionGroup className="ww-results__charts">
          {powerCharts}
        </TransitionGroup>
        {winner && (
          <div className="ww-results__winner">{winner.name} wins!</div>
        )}
      </div>
      <button className="ww-button ww-results__reset" onClick={resetApp}>
        <Svg svg={restartSvg} />
        Try again
      </button>
    </div>
  );
};

export default Results;
