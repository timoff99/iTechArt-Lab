import React from "react";

import { Col } from "../../helpers/Grid/Col";
import { Card } from "../Card";

export const CookBookCard = ({ spanList, openCookBook, ...props }) => {
  return (
    <Col span={spanList} display="flex" justifyContent="center">
      <Card {...props} sizes="sm" maxWidth={500} openCookBook={openCookBook} place="no-rates" />
    </Col>
  );
};
