import React from 'react';
import './App.scss';
import axios from 'axios';

import Layout from './components/Layout'
import KanbanBoard from './components/KanbanBoard'
import TasksBoard from './components/TasksBoard'
import AddTask from './components/AddTask'

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
				</Switch>
			</Layout>
		</Router>
	);
}

export default App;
