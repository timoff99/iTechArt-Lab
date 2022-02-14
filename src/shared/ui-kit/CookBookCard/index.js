import React from "react";
import { Col } from "../../helpers/Grid/Col";
import { Card } from "../Card";

export const CookBookCard = ({ spanList, ...props }) => {
  return (
    <Col span={spanList}>
      <Card {...props} sizes="sm" maxWidth={288} place="no-rates" />
    </Col>
  );
};
