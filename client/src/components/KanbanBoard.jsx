import React, {useState, useEffect} from 'react';
import axios from 'axios';

const KanbanBoard = () => {
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
        <>
            {data.map((user) => (
				<div key={user.ID}>
					<h2>Logged user: {user.name}</h2>
					<div>
						{user.Issues.map((issue) => (
							<div
								key={issue.ID}
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									flexDirection: 'row',
									border: '1px solid #ccc',
								}}>
								<p>Issue title: {issue.title}</p>
								<p>Description: {issue.description}</p>
								<p>CreatedAt: {issue.CreatedAt}</p>
								<p>Id: {issue.ID}</p>
								<p>Reporter: {issue.reporter}</p>
								<p>Estimated: {issue.estimated}</p>
								<p>Timelog: {issue.timelog}</p>
								<p>Progress: {issue.progress}</p>
								<p>Priority: {issue.priority}</p>
								<div>
									<h3>Comments:</h3>
									{issue.Comments.map((comment) => (
										<div key={comment.ID}>
											<p>{comment.content}</p>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			))}
        </>
    )
}

export default KanbanBoard
