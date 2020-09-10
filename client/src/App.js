import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';
import Layout from './components/Layout'
import KanbanBoard from './components/KanbanBoard'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {

	return (

		<Router>
			<Layout>
				<Switch>
					<Route
						exact
						path="/"
						component={KanbanBoard}

					/>
				</Switch>
			</Layout>
		</Router>
	);
}

export default App;
