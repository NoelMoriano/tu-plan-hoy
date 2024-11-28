import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useAuthentication } from "../../providers";
import { theme } from "antd";
import { DrawerLayout } from "./DrawerLayout.jsx";
import { HeaderLayout } from "./HeaderLayout.jsx";
import { BreadcrumbLayout } from "./Breadcrumb.jsx";
import { Layout } from "../ui";

const { Content, Footer } = Layout;

export const BaseLayout = ({ children }) => {
  const navigate = useNavigate();
  const { authUser } = useAuthentication();

  const [isVisibleDrawer, setIsVisibleDrawer] = useState(false);

  const onNavigateTo = (url) => navigate(url);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <LayoutContainer>
      <DrawerLayout
        isVisibleDrawer={isVisibleDrawer}
        setIsVisibleDrawer={setIsVisibleDrawer}
        user={authUser}
        onNavigateTo={onNavigateTo}
      />
      <Layout>
        <HeaderLayout
          onNavigateTo={onNavigateTo}
          isVisibleDrawer={isVisibleDrawer}
          setIsVisibleDrawer={setIsVisibleDrawer}
          user={authUser}
        />
        <BreadcrumbLayout user={authUser} />
        <Content style={{ margin: "16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Tu Plan Hoy © {new Date().getFullYear()}
        </Footer>
      </Layout>
    </LayoutContainer>
  );
};

const LayoutContainer = styled(Layout)`
  min-width: 100vw;
  min-height: 100svh;
`;
