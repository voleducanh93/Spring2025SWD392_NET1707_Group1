import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  Space,
  theme,
} from "antd";

import VaccineManagement from "../../pages/ManagerPage/VaccineManagement";
import StaffManagement from "../../pages/ManagerPage/StaffManagement";
import DoctorManagement from "../../pages/ManagerPage/DoctorManagement";
import InventoryManagement from "../../pages/ManagerPage/InventoryManagement";


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
        return <StaffManagement/>
      case "2":
        return <DoctorManagement />;
      case "3":
        return <InventoryManagement />;
      case "4":
        return <VaccineManagement />; // Giả sử tab này cũng hiển thị VaccineManagement
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
      extra: "⌘P",
    },
    {
      key: "3",
      label: "Billing",
      extra: "⌘B",
    },
    {
      key: "4",
      label: "Settings",
      icon: <SettingOutlined />,
      extra: "⌘S",
    },
  ];
  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          className="demo-logo-vertical"
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          <img
            src="src/assets/logo-vnvc-tet-nguyen-dan.png"
            alt="VNVC Logo"
            className="h-12 rounded-md shadow-md transition-all duration-300 hover:shadow-xl"
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ marginTop: "40px" }}
          onClick={handleMenuClick} // Xử lý sự kiện khi chọn tab
          selectedKeys={[selectedTab]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Quản lý nhân viên",
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
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between", // Căn giữa các phần tử với không gian
            alignItems: "center", // Căn chỉnh các phần tử theo chiều dọc
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
            <Dropdown
              menu={{
                items,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar
                    style={{
                      backgroundColor: "#87d068",
                    }}
                    icon={<UserOutlined />}
                  />
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
