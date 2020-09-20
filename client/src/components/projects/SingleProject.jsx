import React, { useState, useEffect } from 'react'
import axios from 'axios'

const SingleProject = ({ match }) => {
    const [project, setProject] = useState();
    const {
        params: { projectId },
    } = match;

    useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`http://localhost:8080/api/projects/${projectId}`);

            setProject(result.project);
		};

		fetchData();
	}, [projectId]);

    return (
        <div className="single-project-wrapper">
           <h1>{ projectId }</h1>
        </div>
    )
}

export default SingleProject
