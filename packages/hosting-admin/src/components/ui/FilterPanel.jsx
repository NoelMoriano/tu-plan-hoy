import React from "react";
import styled, { css } from "styled-components";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Typography from "antd/lib/typography";
import { lighten } from "polished";

const gutterNumber = 10;

export const FilterPanel = ({ title, subTitle, children }) => (
  <Container>
    <Col span={24}>
      <Typography.Title level={4}>
        {title}{" "}
        {subTitle && (
          <Typography.Text
            style={{ margin: 0, fontSize: "1rem" }}
            type="secondary"
          >
            {subTitle}
          </Typography.Text>
        )}
      </Typography.Title>
    </Col>
    <Col span={24}>
      <Row gutter={[gutterNumber, gutterNumber]}>{children}</Row>
    </Col>
  </Container>
);

const Container = styled(Row)`
  ${({ theme }) => css`
    width: 100%;
    background: ${lighten(0.07, theme.colors.tertiary)};
    border-radius: ${({ theme }) => theme.border_radius.x_small};
    border: none;
    padding: 0.7em 1em;
  `}
`;
