import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import axios from 'axios';
import CONSTANTS from '../constants/constants';

const onDragEnd = (result, columns, setColumns) => {
	if (!result.destination) return;
	const { source, destination } = result;

	if (source.droppableId !== destination.droppableId) {
		const sourceColumn = columns[source.droppableId];
		const destColumn = columns[destination.droppableId];
		const sourceItems = [...sourceColumn.items];
		const destItems = [...destColumn.items];
		const [removed] = sourceItems.splice(source.index, 1);
		destItems.splice(destination.index, 0, removed);
		setColumns({
			...columns,
			[source.droppableId]: {
				...sourceColumn,
				items: sourceItems,
			},
			[destination.droppableId]: {
				...destColumn,
				items: destItems,
			},
		});
	} else {
		const column = columns[source.droppableId];
		const copiedItems = [...column.items];
		const [removed] = copiedItems.splice(source.index, 1);
		copiedItems.splice(destination.index, 0, removed);
		setColumns({
			...columns,
			[source.droppableId]: {
				...column,
				items: copiedItems,
			},
		});
	}
};

function App() {
	const [columns, setColumns] = useState({
		requested: {
			name: CONSTANTS.REQUESTED,
			items: [],
		},
		todo: {
			name: CONSTANTS.TODO,
			items: [],
		},
		inProgress: {
			name: CONSTANTS.INPROGRESS,
			items: [],
		},
		done: {
			name: CONSTANTS.DONE,
			items: [],
		},
	});

	const [dataFromBackend, setDataFromBackend] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios('http://127.0.0.1:8080/api/projects/1');

			setDataFromBackend(result.data.Issues);
		};

		fetchData();
	}, []);

	useEffect(() => {
		const requestedColumn = dataFromBackend.filter(
			(item) => item.progress === CONSTANTS.REQUESTED
		);

		const todoColumn = dataFromBackend.filter(
			(item) => item.progress === CONSTANTS.TODO
		);

		const inProgressColumn = dataFromBackend.filter(
			(item) => item.progress === CONSTANTS.INPROGRESS
		);

		const doneColumn = dataFromBackend.filter(
			(item) => item.progress === CONSTANTS.DONE
		);

		setColumns({
			...columns,
			requested: {
				name: CONSTANTS.REQUESTED,
				items: requestedColumn,
			},
			todo: {
				name: CONSTANTS.TODO,
				items: todoColumn,
			},
			inProgress: {
				name: CONSTANTS.INPROGRESS,
				items: inProgressColumn,
			},
			done: {
				name: CONSTANTS.DONE,
				items: doneColumn,
			},
		});
	}, [dataFromBackend]);

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				height: '100%',
			}}>
			<DragDropContext
				onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
				{Object.entries(columns).map(([columnId, column], index) => {
					return (
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
							key={columnId}>
							<h2>{column.name}</h2>
							<div style={{ margin: 8 }}>
								<Droppable
									droppableId={columnId}
									key={columnId}>
									{(provided, snapshot) => {
										return (
											<div
												{...provided.droppableProps}
												ref={provided.innerRef}
												style={{
													background: snapshot.isDraggingOver
														? 'lightblue'
														: 'lightgrey',
													padding: 4,
													width: 250,
													minHeight: 500,
												}}>
												{column.items.map(
													(item, index) => {
														return (
															<Draggable
																key={item.ID.toString()}
																draggableId={item.ID.toString()}
																index={index}>
																{(
																	provided,
																	snapshot
																) => {
																	return (
																		<div
																			ref={
																				provided.innerRef
																			}
																			{...provided.draggableProps}
																			{...provided.dragHandleProps}
																			style={{
																				userSelect:
																					'none',
																				padding: 16,
																				margin:
																					'0 0 8px 0',
																				minHeight:
																					'50px',
																				backgroundColor: snapshot.isDragging
																					? '#263B4A'
																					: '#456C86',
																				color:
																					'white',
																				...provided
																					.draggableProps
																					.style,
																			}}>
																			{
																				item.title
																			}
																		</div>
																	);
																}}
															</Draggable>
														);
													}
												)}
												{provided.placeholder}
											</div>
										);
									}}
								</Droppable>
							</div>
						</div>
					);
				})}
			</DragDropContext>
		</div>
	);
}

export default App;
