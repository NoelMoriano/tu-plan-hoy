import React from "react";
import styled, { css } from "styled-components";
import { VirtualizedList, Spinner } from "../ui";

export const TableVirtualized = ({
  dataSource,
  columns,
  rowHeaderHeight,
  rowBodyHeight,
  loading = false,
}) => {
  return (
    <Container>
      <VirtualizedList
        dataSource={[null, ...dataSource]}
        rowHeight={({ index }) =>
          index === 0 ? (loading ? 120 : rowHeaderHeight) : rowBodyHeight
        }
        renderItem={(data, index) =>
          !data ? (
            <div>
              <RowHeader columns={columns} />
              {loading && <Spinner size="3x" height="12vh" />}
            </div>
          ) : (
            <RowBody data={data} columns={columns} index={index - 1} />
          )
        }
      />
    </Container>
  );
};

const RowHeader = ({ columns }) => (
  <RowHeaderContainer widthsColumns={columns.map((column) => column.width)}>
    {columns.map((column) => (
      <Cell key={column.title} className="cell-header" align="center">
        {column.title}
      </Cell>
    ))}
  </RowHeaderContainer>
);

const RowBody = ({ data, columns, index }) => (
  <RowBodyContainer widthsColumns={columns.map((column) => column.width)}>
    {columns.map((column) => (
      <Cell key={column.title} align={column.align}>
        {column.render(data, index)}
      </Cell>
    ))}
  </RowBodyContainer>
);

const Container = styled.section`
  height: 100%;
  position: relative;

  .ReactVirtualized__Grid__innerScrollContainer {
    overflow-x: scroll !important;
  }
`;

const RowContainer = styled.div`
  ${({ widthsColumns }) => css`
    width: 100%;
    height: 100%;
    display: grid;
    word-break: break-word;
    grid-template-columns: ${widthsColumns
      .map(([min, max]) => `minmax(${min},${max})`)
      .join(" ")};
  `}
`;

const RowHeaderContainer = styled(RowContainer)`
  ${({ theme }) => css`
    width: 100%;
    align-content: center;
    color: ${theme.colors.light};
    font-size: ${theme.font_sizes.small};
    font-weight: ${theme.font_weight.medium};

    .cell-header {
      background: ${theme.colors.tertiary};
      justify-content: center;
    }

    .cell-header:first-child {
      border-top-left-radius: ${theme.border_radius.small};
    }

    .cell-header:last-child {
      border-top-right-radius: ${theme.border_radius.small};
    }
  `}
`;

const RowBodyContainer = styled(RowContainer)`
  border-bottom: 1px solid #f0f0f0;
`;

const Cell = styled.div`
  ${({ align = "center", theme }) => css`
    width: 100%;
    height: 100%;
    padding: ${theme.paddings.medium} ${theme.paddings.x_small};
    text-align: ${align};
    align-items: ${align};
    display: flex;
    gap: ${theme.paddings.xx_small};
    flex-direction: column;
  `}
`;
