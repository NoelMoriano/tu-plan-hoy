import React, { useState } from "react";
import styled from "styled-components";
import { Layout } from "../ui";
import { DrawerLayout } from "./DrawerLayout";
import { HeaderLayout } from "./HeaderLayout";
import { FooterLayout } from "./FooterLayout";
import { useNavigate } from "react-router";
import { BreadcrumbLayout } from "./Breadcrumb";
import { useAuthentication } from "../../providers";

const { Content } = Layout;

export const BaseLayout = ({ children }) => {
  const navigate = useNavigate();
  const { authUser } = useAuthentication();

  const [isVisibleDrawer, setIsVisibleDrawer] = useState(false);

  const onNavigateTo = (url) => navigate(url);

  return (
    <LayoutContainer>
      <Layout className="site-layout">
        <DrawerLayout
          isVisibleDrawer={isVisibleDrawer}
          setIsVisibleDrawer={setIsVisibleDrawer}
          user={authUser}
          onNavigateTo={onNavigateTo}
        />
        <HeaderLayout
          onNavigateTo={onNavigateTo}
          isVisibleDrawer={isVisibleDrawer}
          setIsVisibleDrawer={setIsVisibleDrawer}
          user={authUser}
        />
        <Content style={{ margin: "0 16px" }}>
          <BreadcrumbLayout user={authUser} />
          <div className="site-layout-background" style={{ padding: 24 }}>
            {children}
          </div>
        </Content>
        <FooterLayout />
      </Layout>
    </LayoutContainer>
  );
};

const LayoutContainer = styled(Layout)`
  min-width: 100vw;
  min-height: 100vh;
  .site-layout-background {
    background: #fff;
  }

  .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }
`;
