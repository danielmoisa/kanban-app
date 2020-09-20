import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SingleProject = ({ match }) => {
	const [project, setProject] = useState();
	const {
		params: { projectId },
	} = match;

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(
				`http://localhost:8080/api/projects/${projectId}`
			);

			setProject(result.data);
		};

		fetchData();
	}, [projectId]);


	return (
		<>
			{project && (
				<div className="single-project-wrapper">
					<h1>{project.name}</h1>
					<p>{project.category}</p>
					<p>{project.description}</p>
					{project.Issues &&
						project.Issues.map((issue) => (
							<div key={issue.ID}>
								<p>{issue.title}</p>
							</div>
						))}
				</div>
			)}
		</>
	);
};

export default SingleProject;
