import React from 'react';
import { NavLink } from "react-router-dom";

import { FaRegListAlt } from 'react-icons/fa'

const SearchProjects = ({ userProjects }) => {
    return (
        <div>
            <div className="projects">
				{userProjects &&
					userProjects.map((project) => 
                    <NavLink to={`/project/${project.ID}`} key={ project.ID } activeClassName="active-project">
                        <p>{ project.name }</p> 
                        <FaRegListAlt /> 
                        { project.Issues && project.Issues.length > 0 ? <span className="count center">{project.Issues.length}</span> : ''}
                    </NavLink>
                )}
			</div>
        </div>
    )
}

export default SearchProjects
