import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import axios from "axios";

import CONSTANTS from "../constants/constants";

import NaturalDragAnimation from "natural-drag-animation-rbdnd";

import "./TasksBoard.scss";

import { AiOutlinePlus } from "react-icons/ai";
import { BsSearch } from 'react-icons/bs'

import TaskBoardSearch from '../components/issues/TaskBoardSearch';

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
	const [searchIssues, setSearchIssues] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios("http://127.0.0.1:8080/api/issues");

			setDataFromBackend(result.data);
		};

		fetchData();
	}, []);

	useEffect(() => {
		const requestedColumn =
			dataFromBackend &&
			dataFromBackend.filter(
				(item) => item.progress === CONSTANTS.REQUESTED
			);

		const todoColumn =
			dataFromBackend &&
			dataFromBackend.filter((item) => item.progress === CONSTANTS.TODO);

		const inProgressColumn =
			dataFromBackend &&
			dataFromBackend.filter(
				(item) => item.progress === CONSTANTS.INPROGRESS
			);

		const doneColumn =
			dataFromBackend &&
			dataFromBackend.filter((item) => item.progress === CONSTANTS.DONE);

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

    // console.log(dataFromBackend)
    // const BoardFilter = (e) => {
	// 	const userIssues = dataFromBackend;
    //     if(searchIssues === '') {
    //         return userIssues;
    //     } 

    //     return [...userIssues].filter(
    //         issue => issue.title.toLowerCase().includes(searchIssues.toLowerCase())
    //     );
        
	// }

	return (
		<>
		{/* Search issues */}
		<div className="board-search-input">
			<div className="search-icon">
				<BsSearch />
			</div>
			<input 
				type="text" 
				autoFocus 
				placeholder="Search issues by title..." 
				value={ searchIssues } 
				onChange={ e => setSearchIssues(e.target.value) }
			/>
		</div>
	
		<div className="board-columns">
			{/* Issues columns */}
			<DragDropContext
				onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
				{Object.entries(columns).map(([columnId, column], index) => {
					return (
						<div className="board-single-column" key={columnId}>
							<h2>{column.name}</h2>
							<div style={{ margin: 8 }}>
								<Droppable
									droppableId={columnId}
									key={columnId}>
									{(provided, snapshot) => {
										return (
											<div
												className="column-tasks-wrapper"
												{...provided.droppableProps}
												ref={provided.innerRef}
												style={{
													backgroundColor: snapshot.isDraggingOver
														? "#afb8ea"
														: "#e0e3f5",
													padding: 10,
													minHeight: 500,
													boxShadow: snapshot.isDraggingOver
														? "0px 2px 7px 1px rgba(0, 0, 0, 0.1)"
														: "none",
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
																		<NaturalDragAnimation
																			style={
																				provided
																					.draggableProps
																					.style
																			}
																			snapshot={
																				snapshot
																			}>
																			{(
																				style
																			) => (
																				<div
																					className="task-card"
																					ref={
																						provided.innerRef
																					}
																					{...provided.draggableProps}
																					{...provided.dragHandleProps}
																					style={{
																						userSelect:
																							"none",
																						padding: 16,
																						margin:
																							"0 0 8px 0",
																						minHeight:
																							"50px",
																						borderRadius:
																							"5px",
																						backgroundColor: snapshot.isDragging
																							? "#f5f6f8"
																							: "#fff",
																						boxShadow: snapshot.isDragging
																							? "0px 2px 7px 1px rgba(0, 0, 0, 0.1)"
																							: "none",
																						...style,
																						...provided.draggableProps,
																					}}>
																					<TaskBoardSearch 
																						item={ item }
																					/>
																					
																				</div>
																			)}
																		</NaturalDragAnimation>
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
		</>
	);
}

export default App;
