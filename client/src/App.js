import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios('http://127.0.0.1:8080/api/users');

			setData(result.data);
		};

		fetchData();
	}, []);

	console.log(data);

	return (
		<div className="app">
			{data.map((user) => (
				<>
					<h2>Logged user: {user.name}</h2>
					<div>
						{user.Issues.map((issue) => (
							<div
								key={issue.ID}
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									flexDirection: 'column',
								}}>
								<hp>Issue title: {issue.title}</hp>
								<p>Description: {issue.description}</p>
								<p>CreatedAt: {issue.CreatedAt}</p>
								<p>Id: {issue.ID}</p>
								<p>Reporter: {issue.reporter}</p>
								<p>Estimated: {issue.estimated}</p>
								<p>Timelog: {issue.timelog}</p>
								<p>Progress: {issue.progress}</p>
								<p>Priority: {issue.priority}</p>
							</div>
						))}
					</div>
				</>
			))}
		</div>
	);
}

export default App;
