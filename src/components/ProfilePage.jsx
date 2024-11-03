import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Button, Form } from "react-bootstrap";
import { FaCamera, FaSignOutAlt, FaTrash, FaHome, FaCog } from "react-icons/fa";
import "../Navbar/App.scss"; // Ensure this file is correctly named and located

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Home", "home", <FaHome />),
  getItem("Users", "users"),
  getItem("Products", "products"),
  getItem("Add Product", "add"),
  getItem("Settings", "settings", <FaCog />, [
    getItem("Account", "account"),
    getItem("Log Out", "logout", <FaSignOutAlt />),
  ]),
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [profileImage, setProfileImage] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    const fetchTotalUsers = () => {
      // Simulate fetching total users from local storage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      setTotalUsers(users.length);
    };

    fetchTotalUsers();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSignOutClick = () => {
    // Clear local storage or remove user data if needed
    navigate("../Pages/Login");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct((prevState) => ({ ...prevState, image: file }));
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    console.log("Product added:", newProduct);
    setNewProduct({ name: "", price: "", description: "", image: null });
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["home"]}
          mode="inline"
          items={items}
          onClick={(e) => {
            if (e.key === "logout") {
              handleSignOutClick();
            } else {
              setActiveSection(e.key);
            }
          }}
        />
      </Sider>

      <Layout className="site-layout">
        <Header
          style={{ padding: 0, background: theme.useToken().colorBgContainer }}
        />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Profile</Breadcrumb.Item>
            <Breadcrumb.Item>
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </Breadcrumb.Item>
          </Breadcrumb>

          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: theme.useToken().colorBgContainer,
            }}
          >
            {activeSection === "home" && (
              <div className="home-container">
                <h2>Hello, User!</h2>
                <p>Email: user@example.com</p> {/* Replace with actual email if needed */}
                <p>UID: 123456789</p> {/* Replace with actual UID if needed */}

                <div className="profile-image-section">
                  <div className="profile-image-wrapper">
                    <img
                      src={profileImage || "default-avatar.png"}
                      className="profile-avatar"
                      onClick={() =>
                        document.getElementById("fileInput").click()
                      }
                      alt="Profile"
                    />
                    <div className="icons-wrapper">
                      {profileImage ? (
                        <div
                          className="delete-icon"
                          onClick={() => setProfileImage(null)}
                        >
                          <FaTrash size={20} />
                        </div>
                      ) : (
                        <div
                          className="camera-icon"
                          onClick={() =>
                            document.getElementById("fileInput").click()
                          }
                        >
                          <FaCamera size={20} />
                        </div>
                      )}
                    </div>
                  </div>
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
            )}

            {activeSection === "users" && (
              <div className="users-container">Users Section</div>
            )}
            {activeSection === "products" && (
              <div className="products-container">Products Section</div>
            )}
            {activeSection === "add" && (
              <div className="add-product-container">
                <h3>Add New Product</h3>
                <Form onSubmit={handleAddProduct}>
                  <Form.Group className="mb-3">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={newProduct.name}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      value={newProduct.price}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      value={newProduct.description}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Product Image</Form.Label>
                    <Form.Control type="file" onChange={handleImageChange} />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Add Product
                  </Button>
                </Form>
              </div>
            )}

            {activeSection === "account" && (
              <div className="account-container">
                <h3>Account Settings</h3>
                <p>Manage your account details and preferences here.</p>
              </div>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProfilePage;
