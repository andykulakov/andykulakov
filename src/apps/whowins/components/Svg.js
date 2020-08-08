import React from "react";
import styled from "styled-components";

const SvgContainer = styled.svg`
  color: ${(props) => props.color || "inherit"};
  fill: currentColor;
  stroke: none;
`;

const Svg = ({ className, svg, color }) => {
  return (
    <SvgContainer className={className} viewBox={svg.viewBox} color={color}>
      <use xlinkHref={`#${svg.id}`} />
    </SvgContainer>
  );
};

export default Svg;
