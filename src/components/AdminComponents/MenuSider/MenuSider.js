import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import { AuditOutlined, HomeOutlined, TeamOutlined } from "@ant-design/icons";
import "./MenuSider.scss";

import { getAccessToken, getRol } from "../../../api/auth";

export const MenuSider = (props) => {
  const { menuCollapsed } = props;
  const { Sider } = Layout;
  const location = useLocation();
  return (
    <Sider className="admin-sider" collapsed={menuCollapsed}>
      <Menu
        theme="aliceblue"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
      >
        <Menu.Item key="/admin">
          <Link to={"/admin"}>
            <HomeOutlined />
            <span className="nav-text">Home</span>
          </Link>
        </Menu.Item>
        {getRol(getAccessToken()) === "admin" ||
        getRol(getAccessToken()) === "editor" ? (
          <Menu.Item key="/admin/users">
            <Link to={"/admin/users"}>
              <TeamOutlined />
              <span className="nav-text">Usuarios</span>
            </Link>
          </Menu.Item>
        ) : null}
        {getRol(getAccessToken()) === "coordinador" ? (
          <Menu.Item key="/admin/subjects">
            <Link to={"/admin/subjects"}>
              <TeamOutlined />
              <span className="nav-text">Asignaturas</span>
            </Link>
          </Menu.Item>
        ) : null}
      </Menu>
    </Sider>
  );
};

export default MenuSider;
