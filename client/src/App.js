import React from 'react';
import './App.scss';
import Layout from './components/Layout';
import KanbanBoard from './components/KanbanBoard';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
	return (
		<Router>
			<Layout>
				<Switch>
					<Route exact path="/" component={KanbanBoard} />
				</Switch>
			</Layout>
		</Router>
	);
}

export default App;
