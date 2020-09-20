import React from 'react'
import { Link } from "react-router-dom"


const SearchProjects = ({ userProjects }) => {
    return (
        <div>
            <div className="projects">
				{userProjects &&
					userProjects.map((project, index) => 
                    <Link to={`/project/${index + 1}`} key={ project.ID }><p>{ project.name }</p></Link>
                )}
			</div>
        </div>
    )
}

export default SearchProjects
