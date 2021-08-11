import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { adminRouter } from "./routes";

import {Frame} from './components'
const menus = adminRouter.filter((route) => route.isNav === true);
class App extends Component {
	render() {
		return (
			<Frame menus = {menus}>
				{/* <div> 这里是公共的部分</div> */}
				<Switch>
					{adminRouter.map((route) => {
						return (
							<Route
								key={route.pathname}
								path={route.pathname}
								exact
								render={(routeProps) => {
									return <route.component {...routeProps} />;
								}}
							/>
						);
					})}
          <Redirect to={adminRouter[0].pathname} from='/admin' exact/>
          <Redirect to="/404" />
				</Switch>
			</Frame>
		);
	}
}

export default App;
