import React from "react";
import styled from "styled-components";

const Svg = ({ className, svg, color }) => {
  const SvgContainer = styled.svg`
    color: ${color || "inherit"};
    fill: currentColor;
    stroke: none;
  `;

  return (
    <SvgContainer className={className} viewBox={svg.viewBox}>
      <use xlinkHref={`#${svg.id}`} />
    </SvgContainer>
  );
};

export default Svg;
