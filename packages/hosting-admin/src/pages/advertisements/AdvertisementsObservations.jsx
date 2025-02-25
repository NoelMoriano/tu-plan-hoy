import React from "react";
import { isEmpty } from "lodash";
import styled from "styled-components";
import Collapse from "antd/lib/collapse";
import Title from "antd/lib/typography/Title";

const { Panel } = Collapse;

const observations = {
  "advertisement-image": "Foto del anuncio",
  "advertisement-setup": "Contenido del anuncio",
};

export const AdvertisementsObservations = ({ advertisementsObservations }) => {
  return (
    <Container>
      <Title level={4}>Observaciones</Title>
      <p>
        Los siguientes anuncios no se activaron porque tienen observaciones.
      </p>
      {advertisementsObservations.map((advertisementObservation, index) => (
        <Collapse ghost key={index}>
          <Panel
            key={index}
            header={
              <Title level={5}>
                {advertisementObservation.advertisementSetup.detail.name}
              </Title>
            }
          >
            {Object.entries(advertisementObservation.observations).map(
              ([key, items]) => (
                <div key={key}>
                  {!isEmpty(items) && (
                    <Title level={5}>{observations[key]}</Title>
                  )}
                  <ul>
                    {items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </Panel>
        </Collapse>
      ))}
    </Container>
  );
};

const Container = styled.div`
  ul {
    padding-left: 1rem;
  }

  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    padding: 5px 11px;
  }

  .ant-collapse-content > .ant-collapse-content-box {
    padding-left: 2.5rem;
  }
`;
