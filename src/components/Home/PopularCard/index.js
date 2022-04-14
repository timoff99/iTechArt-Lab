import React from "react";

import { Box } from "../../../shared/helpers/Box";
import { Grid } from "../../../shared/helpers/Grid";
import { Col } from "../../../shared/helpers/Grid/Col";
import { Loader } from "../../../shared/ui-kit/Loader";
import { colors } from "../../../theme";
import { MostPopularCard } from "../MostPopularCard";

export const PopularCard = ({ items, variant, openCookBook }) => {
  return (
    <>
      {items ? (
        <Grid>
          <Col span={[4, 6, 6]}>
            <MostPopularCard items={items[0]} variant={variant} openCookBook={openCookBook} />
          </Col>
          <Col span={[4, 6, 6]}>
            <MostPopularCard
              items={items[1]}
              variant={variant}
              openCookBook={openCookBook}
              pt={`${(258 / 600) * 100}%`}
            />
            <Grid nested>
              <Col span={[4, 6, 6]}>
                <MostPopularCard items={items[2]} variant={variant} openCookBook={openCookBook} />
              </Col>
              <Col span={[4, 6, 6]}>
                <MostPopularCard items={items[3]} variant={variant} openCookBook={openCookBook} />
              </Col>
            </Grid>
          </Col>
        </Grid>
      ) : (
        <Box display="flex" justifyContent="center">
          <Loader color={colors.primary.main} height={"lg"} width={"lg"} />
        </Box>
      )}
    </>
  );
};
