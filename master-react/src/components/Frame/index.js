import React, { Component } from "react";

import { Layout, Menu, Breadcrumb, Icon } from "antd";

// import { adminRouter } from "../../routes";

import { withRouter } from "react-router-dom";

import logo from "./logo.png";
import "./frame.less";
import { Item } from "rc-menu";
const { Header, Content, Sider } = Layout;

// const menus = adminRouter.filter((route) => route.isNav === true);
@withRouter
class Frame extends Component {
	onMenuClick = (value) => {
		const { Item, key, keyPath, domEvent } = value;
		this.props.history.push(key);
	};

	render() {
		return (
			<Layout style={{ minHeight: "100%" }}>
				<Header
					className='header hsf-header'
					style={{ backgroundColor: "#fff" }}
				>
					<div className='logo'>
						<img src={logo} alt='buhuitu' />
					</div>
				</Header>
				<Layout>
					<Sider width={200} style={{ background: "#fff" }}>
						<Menu
							mode='inline'
							selectedKeys={this.props.location.pathname}
							// defaultOpenKeys={["sub1"]}
							style={{ height: "100%", borderRight: 0 }}
							onClick={this.onMenuClick}
						>
							{this.props.menus.map((menu) => {
								return (
									<Menu.Item key={menu.pathname}>
										<Icon type={menu.icon} />
										{menu.title}
									</Menu.Item>
								);
							})}
						</Menu>
					</Sider>
					<Layout style={{ padding: "16px" }}>
						<Content
							style={{
								background: "#fff",
								padding: 24,
								margin: 0,
								minHeight: 280,
							}}
						>
							{this.props.children}
						</Content>
					</Layout>
				</Layout>
			</Layout>
		);
	}
}

export default Frame;
