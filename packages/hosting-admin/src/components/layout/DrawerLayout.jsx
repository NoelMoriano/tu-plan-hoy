import React from "react";
import styled from "styled-components";
import { version } from "../../firebase";
import { useAuthentication } from "../../providers";
import {
  faBoxes,
  faBuilding,
  faHome,
  faSignOutAlt,
  faSolarPanel,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mediaQuery } from "../../styles";
import { Drawer, Menu } from "../ui";

export const DrawerLayout = ({
  isVisibleDrawer,
  setIsVisibleDrawer,
  user,
  onNavigateTo,
}) => {
  const { logout } = useAuthentication();

  const menuItems = [
    {
      label: "Home",
      key: "home",
      icon: <FontAwesomeIcon icon={faHome} size="lg" />,
      isVisible: true,
      onClick: () => {
        onNavigateTo("/");
        setIsVisibleDrawer(false);
      },
    },
    {
      label: "Usuarios",
      key: "users",
      icon: <FontAwesomeIcon icon={faUsers} size="lg" />,
      isVisible: true,
      onClick: () => {
        onNavigateTo("/users");
        setIsVisibleDrawer(false);
      },
    },
    {
      label: "Categorias",
      key: "categories",
      icon: <FontAwesomeIcon icon={faBoxes} size="lg" />,
      isVisible: true,
      onClick: () => {
        onNavigateTo("/categories");
        setIsVisibleDrawer(false);
      },
    },
    {
      label: "Companias",
      key: "companies",
      icon: <FontAwesomeIcon icon={faBuilding} size="lg" />,
      isVisible: true,
      onClick: () => {
        onNavigateTo("/companies");
        setIsVisibleDrawer(false);
      },
    },
    {
      label: "Anuncios",
      key: "advertisements",
      icon: <FontAwesomeIcon icon={faSolarPanel} size="lg" />,
      isVisible: true,
      onClick: () => {
        onNavigateTo("/advertisements");
        setIsVisibleDrawer(false);
      },
    },
    {
      label: "Cerrar sesion",
      key: "logout",
      icon: <FontAwesomeIcon icon={faSignOutAlt} size="lg" />,
      isVisible: true,
      onClick: async () => {
        await logout();
        setIsVisibleDrawer(false);
      },
    },
  ];

  const filterByRoleCode = (items) => items.filter((item) => item.isVisible);

  return (
    <DrawerContainer
      key="right"
      title={
        <div className="header-title">
          <span>version: {version}</span>
        </div>
      }
      placement="right"
      closable={true}
      onClose={() => setIsVisibleDrawer(!isVisibleDrawer)}
      open={isVisibleDrawer}
      className="drawer-content"
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={filterByRoleCode(menuItems)}
      />
    </DrawerContainer>
  );
};

const DrawerContainer = styled(Drawer)`
  .header-title {
    color: #fff;
    text-align: right;
    font-size: 0.8em;
    font-weight: 400;
  }
  .drawer-content {
    width: 100% !important;
    ${mediaQuery.minTablet} {
      width: 300px !important;
    }
  }
`;
