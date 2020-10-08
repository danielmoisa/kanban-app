import React from 'react'

const projectsFilter = ({ projects, insertProjectValue }) => {
    return (
        <div className="project-results">
            { projects && projects.length > 0 ? 

                projects.map(project => (
                <div key={project.ID} id={project.ID} onClick={insertProjectValue(project.ID)} className="single-project">{ project.name }</div>
                ))
                :
                <p>No projects found...</p>

            }
        </div>
    )
}

export default projectsFilter
