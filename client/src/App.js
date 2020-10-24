import React from "react";
import "./App.scss";

import Layout from "./components/Layout";
import TasksBoard from "./components/TasksBoard";
import AddTask from "./components/AddTask";
import SingleProject from "./components/projects/SingleProject";
import SingleIssue from "./components/issues/SingleIssue";
import Login from "./components/Login";
import { CookiesProvider } from "react-cookie";
import withAuth from "./services/withAuth";
import Layout from "./components/Layout";
import TasksBoard from "./components/TasksBoard";
import AddTask from "./components/AddTask";
import SingleProject from "./components/projects/SingleProject";
import SingleIssue from "./components/issues/SingleIssue";
import Login from "./components/Login";

//Notification box
import { ToastContainer } from "react-toastify";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	return (
		<CookiesProvider>
			<Router>
				<Layout>
					<Switch>
						<Route
							exact
							path="/"
							component={withAuth(TasksBoard)}
						/>
						<Route
							exact
							path="/add-task"
							component={withAuth(AddTask)}
						/>
						<Route
							exact
							path="/project/:projectId"
							component={withAuth(SingleProject)}
						/>
						<Route
							exact
							path="/issue/:issueId"
							component={withAuth(SingleIssue)}
						/>
						<Route exact path="/login" component={Login} />
					</Switch>
				</Layout>
				<ToastContainer
					position="bottom-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={true}
					closeOnClick
					rtl={false}
					pauseOnHover
				/>
			</Router>
		</CookiesProvider>
	);
}

export default App;
