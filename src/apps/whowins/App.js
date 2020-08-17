import React, { useState, useEffect, useRef } from "react";
import useForm from "./components/useForm";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { render } from "react-dom";

import Svg from "./components/Svg";
import HeroSelect from "./components/HeroSelect";
import Results from "./components/Results";

import supermanSvg from "./images/superman.svg";
import batmanSvg from "./images/batman.svg";

const App = () => {
  const switchProps = {
    classNames: "switch",
    timeout: { enter: 300, exit: 150 },
  };
  const API = "https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api";
  const isFirstUpdate = useRef(true);
  const {
    heroesForm,
    errors,
    hasErrors,
    handleChange,
    handleSubmit,
    handleReset,
  } = useForm(startTesting);
  const [heroes, setHeroes] = useState([]);

  const [mode, setMode] = useState("select");
  useEffect(() => {
    if (isFirstUpdate.current) {
      isFirstUpdate.current = false;
      return;
    }
    if (mode && document.querySelector("#ww-test")) {
      document.querySelector("#ww-test").scrollIntoView({ behavior: "smooth" });
    }
  }, [mode]);

  useEffect(() => {
    fetchHeroes();
  }, []);

  async function fetchHeroes() {
    try {
      let res = await fetch(`${API}/all.json`);
      setHeroes((await res.json()) || []);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("fetchHeroes error", error);
    }
  }

  function startTesting() {
    setMode("results");
  }

  function resetApp() {
    handleReset();
    setMode("select");
  }

  const heroSelects = Object.keys(heroesForm).map((key) => (
    <HeroSelect
      key={`hero-select-${key}`}
      className={`ww-form__hero ww-form__hero_${key}`}
      name={key}
      hero={heroesForm[key]}
      heroes={heroes}
      error={errors[key]}
      svg={key === "A" ? batmanSvg : supermanSvg}
      onHeroChange={(value) => handleChange(value, key)}
    />
  ));

  const mainBlock =
    mode === "select" ? (
      <CSSTransition key="select" {...switchProps}>
        <form className="ww-form" onSubmit={handleSubmit}>
          {heroSelects}
          <button
            type="submit"
            className={`ww-button ${hasErrors ? "ww-button_error" : ""}`}
          >
            <SwitchTransition>
              {!hasErrors ? (
                <CSSTransition key="no-errors" {...switchProps}>
                  <span>Start the fight</span>
                </CSSTransition>
              ) : (
                <CSSTransition key="errors" {...switchProps}>
                  <span>Choose Heroes</span>
                </CSSTransition>
              )}
            </SwitchTransition>
          </button>
        </form>
      </CSSTransition>
    ) : (
      <CSSTransition key="results" {...switchProps}>
        <Results heroes={Object.values(heroesForm)} resetApp={resetApp} />
      </CSSTransition>
    );

  return (
    <div className="ww-container">
      <header className="ww-header ww-container__item">
        <h1 className="ww-h1">Who Wins</h1>
        <Svg className="svg-superman" svg={supermanSvg} />
        <Svg className="svg-batman" svg={batmanSvg} />
      </header>
      <main className="ww-container__item ww-main">
        <section className="ww-section">
          <h2 className="ww-h2 ww-h2_margin">What's this</h2>
          <div className="ww-block-p">
            <p className="ww-block-p__item">
              <strong>
                Who would win in a fight - Batman or Superman? Who’s stronger -
                Hulk or The Thing?
              </strong>
            </p>
            <p className="ww-block-p__item">
              If you like comic books or superhero movies, you definitely had a
              couple of fights about this with your friends.
            </p>
            <p className="ww-block-p__item">
              This is the ultimate tool to test your favourite superheroes and
              villians.
            </p>
            <p className="ww-block-p__item">
              Choose your pair and let them fight.
            </p>
          </div>
        </section>
        <section id="ww-test" className="ww-test">
          <h2 className="ww-h2 ww-h2_block">Test Your Heroes</h2>
          <SwitchTransition>{mainBlock}</SwitchTransition>
        </section>
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
