import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, Space, theme } from "antd";
import "./index.css"

import VaccineManagement from "../../pages/ManagerPage/VaccineManagement";
import StaffManagement from "../../pages/ManagerPage/StaffManagement";
import DoctorManagement from "../../pages/ManagerPage/DoctorManagement";
import InventoryManagement from "../../pages/ManagerPage/InventoryManagement";

import VaccineByAge from "../../pages/ManagerPage/VaccineByAge";
import ComboManagement from "../../pages/ManagerPage/ComboManagement";

const { Header, Sider, Content } = Layout;

const SidebarManager = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [selectedTab, setSelectedTab] = useState("1");

  const handleMenuClick = (e) => {
    setSelectedTab(e.key); // Cập nhật tab khi chọn
  };

  // Nội dung tương ứng với mỗi tab
  const renderContent = () => {
    switch (selectedTab) {
      case "1":
        return <StaffManagement />;
      case "2":
        return <DoctorManagement />;
      case "3":
        return <InventoryManagement />;
      case "4":
        return <VaccineManagement />;
      case "5":
        return <ComboManagement />;
        case "6":
        return <VaccineByAge />;
      default:
        return <VaccineManagement />;
    }
  };

  const items = [
    {
      key: "1",
      label: "My Account",
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Profile",
    },
    {
      key: "3",
      label: "Billing",
    },
    {
      key: "4",
      label: "Settings",
      icon: <SettingOutlined />,
    },
  ];

  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed} width={250} style={{ backgroundColor: "#2A388F" }}>
        <div className="demo-logo-vertical" style={{ textAlign: "center", marginTop: "20px" }}>
          <img
            src="src/assets/logo-vnvc-tet-nguyen-dan.png"
            alt="VNVC Logo"
            className="h-12 rounded-md shadow-md transition-all duration-300 hover:shadow-xl"
          />
        </div>

        <Menu
        className="custom-menu"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ marginTop: "40px", backgroundColor: "#2A388F" }}
          onClick={handleMenuClick} // Xử lý sự kiện khi chọn tab
          selectedKeys={[selectedTab]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Quản lý nhân viên",
              style: {color: "white"}
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "Quản lý bác sĩ",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "Quản lý kho vaccine",
            },
            {
              key: "4",
              icon: <UploadOutlined />,
              label: "Quản lý vaccine",
            },
            {
              key: "5",
              icon: <AppstoreOutlined />, // Biểu tượng cho Quản lý Combo Vaccine
              label: "Quản lý Combo Vaccine",
            },
            {
              key: "6",
              icon: <AppstoreOutlined />, // Biểu tượng cho Quản lý Combo Vaccine
              label: "Quản lý lịch tiêm cho Vaccine",
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Nút Collapse */}
          <div>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </div>

          <div style={{ marginRight: "1rem" }}>
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
                </Space>
              </a>
            </Dropdown>
          </div>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default SidebarManager;
