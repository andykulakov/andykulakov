import React, { useState, useEffect } from "react";

import Svg from "../components/Svg";
import Select from "./Select";

import batmanSvg from "../images/batman.svg";

const HeroSelect = ({
  name,
  hero,
  heroes,
  error,
  svg = batmanSvg,
  className,
  onHeroChange,
}) => {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (hero) {
      setLoaded(false);
      setLoading(true);
    }
  }, [hero]);

  function onImageLoad() {
    setLoading(false);
    setLoaded(true);
  }

  return (
    <div className={`ww-hero-select ${className}`}>
      <Select
        id={`select-${name}`}
        value={hero}
        options={heroes}
        label={`${name}: Choose Your Hero`}
        error={error}
        onChange={onHeroChange}
      />
      <figure
        className={`ww-hero-select__info ${
          loading ? "ww-hero-select__info_loading" : ""
        }
          ${loaded ? "ww-hero-select_loaded" : ""}`}
      >
        <figcaption className="ww-cloud">
          {(hero && hero.name) || "..."}
        </figcaption>
        <div
          className={`ww-hero-select__info__placeholder ${
            loading ? "ww-hero-select__info__placeholder_loading" : ""
          }
          ${loaded ? "ww-hero-select__info__placeholder_loaded" : ""}`}
        >
          <Svg svg={svg} color="#808080" />
        </div>
        {hero && hero.images && hero.images.sm && (
          <picture>
            <source media="(min-width: 1280px)" srcSet={hero.images.lg} />
            <img
              src={hero.images.md}
              alt={name}
              onLoad={() => onImageLoad()}
              className={`ww-hero-select__info__image ${
                loaded ? "ww-hero-select__info__image_loaded" : ""
              }`}
            />
          </picture>
        )}
      </figure>
    </div>
  );
};

export default HeroSelect;
