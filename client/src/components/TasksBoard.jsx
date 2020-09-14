import React, { useState, useCallback, useRef, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import axios from 'axios';

import './TasksBoard.scss';

const channels = ['backlog', 'new', 'In progress', 'Done'];

const labelsMap = {
	backlog: 'Backlog',
	new: 'To Do',
	'In progress': 'In Progress',
	Done: 'Done',
};

const classes = {
	board: {
		display: 'flex',
		margin: '0 auto',
	},
	column: {
		minWidth: 200,
		width: '18vw',
		height: '80vh',
		margin: '0 auto',
		backgroundColor: '#FCC8B2',
		border: '1px solid #fff',
	},
	columnHead: {
		textAlign: 'center',
		padding: 10,
		fontSize: '1.2em',
		backgroundColor: '#C6D8AF',
	},
	item: {
		padding: 10,
		margin: 10,
		fontSize: '0.8em',
		cursor: 'pointer',
		backgroundColor: 'white',
	},
};

const Kanban = () => {
	const [tasks, setTaskStatus] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios('http://127.0.0.1:8080/api/projects/1');

			setTaskStatus(result.data.Issues);
		};

		fetchData();
	}, []);

	const changeTaskStatus = useCallback(
		(id, progress) => {
			let task = tasks.find((task) => task.ID === id);
			const taskIndex = tasks.indexOf(task);
			task = { ...task, progress };
			let newTasks = update(tasks, {
				[taskIndex]: { $set: task },
			});
			setTaskStatus(newTasks);
		},
		[tasks]
	);

	return (
		<main>
			<DndProvider backend={HTML5Backend}>
				<section className="board-columns">
					{channels.map((channel) => (
						<KanbanColumn
							key={channel}
							status={channel}
							changeTaskStatus={changeTaskStatus}>
							<div className="board-single-column">
								<h3>{labelsMap[channel]}</h3>

								<div>
									{tasks &&
										tasks
											.filter(
												(item) =>
													item.progress === channel
											)
											.map((item) => (
												<KanbanItem
													key={item.ID}
													id={item.ID}>
													<div className="column-tasks-wrapper">
														<div className="task-card">
															{item.title} <br />
															{item.description}
														</div>
													</div>
												</KanbanItem>
											))}
								</div>
							</div>
						</KanbanColumn>
					))}
				</section>
			</DndProvider>
		</main>
	);
};

export default Kanban;

const KanbanColumn = ({ status, changeTaskStatus, children }) => {
	const ref = useRef(null);
	const [, drop] = useDrop({
		accept: 'card',
		drop(item) {
			changeTaskStatus(item.id, status);
		},
	});
	drop(ref);
	return <div ref={ref}> {children}</div>;
};

const KanbanItem = ({ id, children }) => {
	const ref = useRef(null);
	const [{ isDragging }, drag] = useDrag({
		item: { type: 'card', id },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});
	const opacity = isDragging ? 0 : 1;
	drag(ref);
	return (
		<div ref={ref} style={{ opacity }}>
			{children}
		</div>
	);
};
