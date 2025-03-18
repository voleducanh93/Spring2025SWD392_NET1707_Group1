import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, Space, theme } from "antd";

import { clearLS } from "../../utils/auth";
import { toast } from "react-toastify";
import { AppContext } from "../../contexts/app.context";

import DoctorList from "../Doctor/DoctorList";


const { Header, Sider, Content } = Layout;

const SidebarDoctor = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); // Hook điều hướng
 const  {setIsAuthenticated} = useContext(AppContext);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [selectedTab, setSelectedTab] = useState("1");

  const handleMenuClick = (e) => {
    setSelectedTab(e.key);
  };

  // Xử lý khi nhấn vào menu dropdown (Hồ sơ, Ví tiền, Thoát)
  const handleDropdownClick = ({ key }) => {
    if (key === "2") {
      navigate("/user-profile"); // Chuyển hướng đến trang Hồ sơ
    } else if (key === "3") {
      navigate("/mywallet"); // Chuyển hướng đến trang Ví tiền
    } else if (key === "4") {
          toast.success("Đăng xuất thành công!");
          
          clearLS();
          setIsAuthenticated(false);
          navigate("/auth");
        
     
    }
  };

  // Nội dung tương ứng với mỗi tab
  const renderContent = () => {
    switch (selectedTab) {
      case "1":
        return <DoctorList />;
     
    }
  };

  const items = [
    {
      key: "1",
      label: "Tài khoản",
      disabled: true,
    },
    {
      key: "2",
      label: "Hồ sơ",
    },
    {
      key: "3",
      label: "Ví tiền",
    },
    {
      key: "4",
      label: "Thoát",
      icon: <SettingOutlined />,
    },
  ];

  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" style={{ textAlign: "center", marginTop: "20px" }}>
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
          onClick={handleMenuClick}
          selectedKeys={[selectedTab]}
          items={[
            {
              key: "1",
              
              label: "Quản lí Hồ Sơ",
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
            <Dropdown menu={{ items, onClick: handleDropdownClick }}>
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

export default SidebarDoctor;
