import React, { useState, useEffect } from "react";
import { render } from "react-dom";

// import 'normalize.css';
import Svg from "./components/Svg";
import Select from "./components/Select";
import supermanSvg from "./images/superman.svg";
import batmanSvg from "./images/batman.svg";

const App = () => {
  const API = "https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api";
  const [heroes, setHeroes] = useState([]);
  const [heroA, setHeroA] = useState({});
  const [heroB, setHeroB] = useState({});

  async function fetchHeroes() {
    try {
      let res = await fetch(`${API}/all.json`);
      setHeroes((await res.json()) || []);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("fetchHeroes error", error);
    }
  }

  useEffect(() => {
    fetchHeroes();
  }, []);

  function startTesting() {}

  return (
    <div className="ww-container">
      <header className="ww-header ww-container__item">
        <h1 className="ww-h1">Who Wins</h1>
        <Svg className="svg-superman" svg={supermanSvg} />
        <Svg className="svg-batman" svg={batmanSvg} />
      </header>
      <main className="ww-container__item ww-main">
        <div className="ww-section">
          <h2 className="ww-h2 ww-h2_margin">What's this</h2>
          <div className="ww-p-block">
            <p className="ww-p-block__item">
              <strong>
                Who would win in a fight - Batman or Superman? Who’s stronger -
                Hulk or The Thing?
              </strong>
            </p>
            <p className="ww-p-block__item">
              If you like comic books or superhero movies, you definately had a
              couple of fights about this stuff with your fellow geeks.
            </p>
            <p className="ww-p-block__item">
              This is the ultimate tool to test you favourite superheroes and
              villians.
            </p>
            <p className="ww-p-block__item">
              Choose your pair and let them fight.
            </p>
          </div>
        </div>
        <div className="ww-block-test">
          <h2 className="ww-h2 ww-h2_block ww-block-test__heading">
            Test Your Heroes
          </h2>
          <div className="ww-block-test__hero ww-block-test__hero_a">
            <Select
              id="select-A"
              value={heroA}
              options={heroes}
              label="A: Choose Your Hero"
              onChange={setHeroA}
            />
            <div className="ww-block-test__hero__info">
              <div className="ww-block-test__hero__info__name">
                {heroA.name || "..."}
              </div>
              {heroA.images && heroA.images.md ? (
                <img src={heroA.images.md} alt="Hero A" />
              ) : (
                <Svg svg={batmanSvg} color="grey" />
              )}
            </div>
          </div>
          <div className="ww-block-test__hero ww-block-test__hero_b">
            <Select
              id="select-B"
              value={heroB}
              options={heroes}
              label="B: Choose Your Hero"
              onChange={setHeroB}
            />
            <div className="ww-block-test__hero__info">
              <div className="ww-block-test__hero__info__name">
                {heroB.name || "..."}
              </div>
              {heroB.images && heroB.images.md ? (
                <img src={heroB.images.md} alt="Hero A" />
              ) : (
                <Svg svg={supermanSvg} color="grey" />
              )}
            </div>
          </div>
          <button type="button" className="ww-button" onClick={startTesting}>
            Test
          </button>
        </div>
      </main>
      <footer className="ww-footer ww-container__item">
        <h2 className="ww-h1">Who Wins</h2>
        <div className="ww-copyrights">
          <p className="ww-copyrights__item">
            Developed by Andrey Kulakov, 2020
          </p>
          <p className="ww-copyrights__item">
            <a href="https://akabab.github.io/superhero-api/">
              Superheroes API
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

render(<App />, document.getElementById("root"));
