import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { BsPlus } from 'react-icons/bs';

import TasksBoardColumn from './TasksBoardColumn';

import './TasksBoard.scss';

const itemsFromBackend = [
	{ id: 'task-1', content: 'First task' },
	{ id: 'task-2', content: 'Second task' },
	{ id: 'task-3', content: 'Third task' },
	{ id: 'task-4', content: 'Fourth task' },
	{ id: 'task-5', content: 'Fifth task' },
];

const columnsFromBackend = {
	['column-1']: {
		name: 'Requested',
		items: itemsFromBackend,
	},
	['column-2']: {
		name: 'To do',
		items: [],
	},
	['column-3']: {
		name: 'In Progress',
		items: [],
	},
	['column-4']: {
		name: 'Done',
		items: [],
	},
};

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

const TasksBoard = () => {
	const [columns, setColumns] = useState(columnsFromBackend);

	return (
		<>
			<div className="board-columns">
				<DragDropContext
					onDragEnd={(result) =>
						onDragEnd(result, columns, setColumns)
					}>
					{Object.entries(columns).map(([id, column]) => {
						return (
							<div className="board-single-column">
								<h3>{column.name}</h3>
								<Droppable droppableId={id} key={id}>
									{(provided, snapshot) => {
										return (
											<div
												className="column-tasks-wrapper"
												{...provided.droppableProps}
												ref={provided.innerRef}
												style={{
													backgroundColor: snapshot.isDraggingOver
														? '#afb8ea'
														: '#e0e3f5',
													padding: 10,
													minHeight: 500,
													boxShadow: snapshot.isDraggingOver
														? '0px 2px 7px 1px rgba(0, 0, 0, 0.1)'
														: 'none',
												}}>
												{column.items.map(
													(item, index) => {
														return (
															<Draggable
																key={item.id}
																draggableId={
																	item.id
																}
																index={index}>
																{(
																	provided,
																	snapshot
																) => {
																	return (
																		<div
																			className="task-card"
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
																					? '#f5f6f8'
																					: '#fff',
																				...provided
																					.draggableProps
																					.style,
																			}}>
																			{
																				item.content
																			}
																		</div>
																	);
																}}
															</Draggable>
														);
													}
												)}
												{provided.placeholder}
												{/* Add task button on every column*/}
												{column.items.length > 0 ? (
													<Link
														to="/add-task"
														className="add-task center">
														<BsPlus />
														<span>
															Add another task
														</span>
													</Link>
												) : (
													''
												)}
											</div>
										);
									}}
								</Droppable>
							</div>
						);
					})}
				</DragDropContext>
			</div>
		</>
	);
};

export default TasksBoard;
