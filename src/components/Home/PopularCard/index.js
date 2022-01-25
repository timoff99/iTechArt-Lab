import React from "react";

import { Grid } from "../../../shared/helpers/Grid";
import { Col } from "../../../shared/helpers/Grid/Col";
import { ReactComponent as Options } from "../../../static/icons/options.svg";
import { StyledButton, RelativeCard, RelativeCard2, BoxGradient, StyledOptions } from "./styles";

export const PopularCard = ({ items, variant }) => {
  const handleClick = (event) => {
    event.preventDefault();
    console.log(1);
  };

  const handleOption = (event) => {
    event.preventDefault();
    console.log("option");
  };

  return (
    <Grid>
      <Col span={[4, 6, 6]}>
        <RelativeCard bg={items[0].image}>
          <BoxGradient>
            <StyledButton ml={8} mb={8} alignSelf="flex-end" variant={variant} onClick={(event) => handleClick(event)}>
              {items[0].cookBook}
            </StyledButton>
            <StyledOptions onClick={(event) => handleOption(event)}>
              <Options />
            </StyledOptions>
          </BoxGradient>
        </RelativeCard>
      </Col>
      <Col span={[4, 6, 6]}>
        <RelativeCard2 bg={items[1].image}>
          <BoxGradient>
            <StyledButton ml={8} mb={8} alignSelf="flex-end" variant={variant} onClick={(event) => handleClick(event)}>
              {items[1].cookBook}
            </StyledButton>
            <StyledOptions onClick={(event) => handleOption(event)}>
              <Options />
            </StyledOptions>
          </BoxGradient>
        </RelativeCard2>

        <Grid nested>
          <Col span={[4, 6, 6]}>
            <RelativeCard bg={items[2].image}>
              <BoxGradient>
                <StyledButton
                  ml={8}
                  mb={8}
                  alignSelf="flex-end"
                  variant={variant}
                  onClick={(event) => handleClick(event)}
                >
                  {items[2].cookBook}
                </StyledButton>
                <StyledOptions onClick={(event) => handleOption(event)}>
                  <Options />
                </StyledOptions>
              </BoxGradient>
            </RelativeCard>
          </Col>
          <Col span={[4, 6, 6]}>
            <RelativeCard bg={items[3].image}>
              <BoxGradient>
                <StyledButton
                  ml={8}
                  mb={8}
                  alignSelf="flex-end"
                  variant={variant}
                  onClick={(event) => handleClick(event)}
                >
                  {items[3].cookBook}
                </StyledButton>
                <StyledOptions onClick={(event) => handleOption(event)}>
                  <Options />
                </StyledOptions>
              </BoxGradient>
            </RelativeCard>
          </Col>
        </Grid>
      </Col>
    </Grid>
  );
};
