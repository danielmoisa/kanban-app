import React, { useState } from 'react';
import './App.scss';
import axios from 'axios';

import Layout from './components/Layout'
import KanbanBoard from './components/KanbanBoard'
import TasksBoard from './components/TasksBoard'
import AddTask from './components/AddTask'
import SingleProject from './components/projects/SingleProject'
import SingleIssue from './components/issues/SingleIssue'
import Login from './components/Login'

//Notification box
import { ToastContainer } from 'react-toastify';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {

	return (
		<Router>
			<Layout>
				<Switch>
					<Route
						exact
						path="/"
						component={TasksBoard}
					/>
					<Route
						exact
						path="/add-task"
						component={AddTask}
					/>
					<Route
						exact
						path="/project/:projectId"
						component={SingleProject}
					/>
					<Route 
						exact 
						path="/issue/:issueId"
						component={SingleIssue}
					/>
					<Route
						exact
						path="/login"
						component={Login}
					/>
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
	);
}

export default App;
