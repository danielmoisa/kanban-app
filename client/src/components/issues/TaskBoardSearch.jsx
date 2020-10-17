import React from 'react'
import { Link } from "react-router-dom";

const TaskBoardSearch = ({ item }) => {
    return (
        <>
            <Link to={`/issue${item.ID}`}>
                <div className="status">
                    <div className={`progress ${item.progress.split(" ").join("")}`}>
                        <span>{ item.progress }</span>
                    </div>
                    <div className={`priority ${item.priority.split(" ").join("")}`}>
                        <span>{ item.priority }</span>
                    </div>
                </div>
                <div className="image">
                    <img src={`./uploads/${item.imgid ? 
                        item.imgid : 
                        'default-project.svg'}`} 
                        alt={item.title}
                    />
                </div>
                <h5>{item.title}</h5>
                <p>{item.description}</p>
            </Link>
        </>
    )
}

export default TaskBoardSearch
