import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
 
import axios from 'axios'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';


import { BsPlus } from 'react-icons/bs'

import './TasksBoard.scss'


const TasksBoard2 = () => {
    
    const issues = [
        { id: 'task-1', content: "First task", status: 'Requested' },
        { id: 'task-2', content: "Second task", status: 'To do' },
        { id: 'task-3', content: "Third task", status: 'In progress' },
        { id: 'task-4', content: "Fourth task", status: 'Done' },
        { id: 'task-5', content: "Fifth task", status: 'Requested' }
      ];
      
      const cols = [
        {   
            name: "Requested"
        },
    
        {   
            name: "To do"
        },
    
        {   
           name: "In Progress"
        },
        {   
            name: "Done" 
        }
    ];
    
    const [columns, setColumns] = useState(cols)
    const [ data, setData ] = useState(issues)

    
    

      const onDragEnd = (result, columns, setColumns, data, setData) => {

      }

    
    return (
        <>
            <div className="board-columns">
                <DragDropContext onDragEnd={ result => onDragEnd(result, columns, setColumns) } >
                        { cols.map(singleCol => (
                              <div className="board-single-column" key={singleCol.name}>
                              <h3>{ singleCol.name }</h3>
                              <Droppable droppableId={singleCol.name} >
                                    {(provided, snapshot) => {
                                        return (
                                            <div className="column-tasks-wrapper" 
                                                { ...provided.droppableProps } 
                                                ref={ provided.innerRef }
                                                style={{
                                                    backgroundColor: snapshot.isDraggingOver ? '#afb8ea' : '#e0e3f5',
                                                    padding: 10,
                                                    minHeight: 500,
                                                    boxShadow: snapshot.isDraggingOver ? '0px 2px 7px 1px rgba(0, 0, 0, 0.1)' : 'none',
                                                }}
                                            >
                                            
                                            {issues.map((item, index) => {

                                                return (
                                                    <div key={ item.id }>
                                                    { item.status === singleCol.name &&
                                                    <Draggable draggableId={ item.id } index={ index }>
                                                        {(provided, snapshot) => (
                                                             <NaturalDragAnimation
                                                             style={provided.draggableProps.style}
                                                             snapshot={snapshot}
                                                           >                                                              
                                                                {style => (
                                                                <div className="task-card" 
                                                                    ref={ provided.innerRef }
                                                                    { ...provided.draggableProps }
                                                                    { ...provided.dragHandleProps }
                                                                    style={{
                                                                        userSelect: 'none',
                                                                        padding: 16,
                                                                        margin: '0 0 8px 0',
                                                                        minHeight: '50px',
                                                                        backgroundColor: snapshot.isDragging ? '#f5f6f8' : '#fff',
                                                                        ...style
                                                                    }}
                                                                >
                                                                    { item.content }
                                                                </div>
                                                                )}
                                                           
                                                            </NaturalDragAnimation>
                                                        )
                                                        }
                                                    </Draggable>
                                                    }
                                                </div>
                                                );
                                            
                                            })
                                            }
                                            { provided.placeholder }

                                            </div>
                                        )
                                    }
                                    }
                                </Droppable>
                          </div>
                          )
                        )
                        }
                         
                </DragDropContext>
            </div>
        </>
    )
}
export default TasksBoard2