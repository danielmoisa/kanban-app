import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

import services from './issues/issues';

import './AddTask.scss';



import { BsController, BsPlus } from 'react-icons/bs';

const AddTask = () => {

   const [issueInput, setIssueInput] = useReducer(
       (state, newState) => ({ ...state, ...newState }),
       {
            title: '',
            description: '',
            estimated: '',
            progress: '',
            priority: ''

       }
   );
   const [newProject, setNewProject] = useState([]);
   
    
   //Get all projects
   useEffect(() => {
    const fetchData = async () => {
        const result = await axios('http://127.0.0.1:8080/api/projects');

        setNewProject(result.data);
    };

        fetchData();
    }, []);

   


    //Select status data
    const progressOptions = [ 
        { value: 'Backlog', label: 'Backlog' },
        { value: 'To do', label: 'To do' },
        { value: 'In progress', label: 'In progress' },
        { value: 'Done', label: 'Done' }
     ]
     const priorityOptions = [ 
      { value: 'Low', label: 'Low' },
      { value: 'Medium', label: 'Medium' },
      { value: 'High', label: 'High' }
    ]


    
   const handleChange = e => {
      const { name, value } = e.target;

       setIssueInput({ [name]: value });
   }


    const addNewIssue = e => {
        e.preventDefault();

        const newIssue = {
            title: issueInput.title,
            description: issueInput.description,
            timelog: 0,
            estimated: Number(issueInput.estimated),
            progress: issueInput.progress,
            priority: issueInput.priority,
            ProjectID: newProject,
        }

        services.addIssue(newIssue);

        setIssueInput({ 
            title: '',
            description: '',
            estimated: '',
            progress: '',
            priority: ''
        });

    }

    

    return (
        <div className="add-issue">
            <h2>Create new issue</h2>
            <div className="add-issue-form">
                <form onSubmit={addNewIssue}>
                    {/* title */}
                    <label htmlFor="title">Issue title</label>
                    <input type="text" name="title" id="title" value={issueInput.title} onChange={handleChange} />
                    {/* description */}
                    <label htmlFor="description">Issue description</label>
                    <textarea name="description" id="description" value={issueInput.description} onChange={handleChange} />
                    {/* estimated */}
                    <label htmlFor="estimated">Issue estimated</label>
                    <input type="text" name="estimated" id="estimated" value={issueInput.estimated} onChange={handleChange}/>
                    {/* progress */}
                    <label htmlFor="progress">Issue status</label>
                   <select name="progress" id="progress" value={issueInput.progress} onChange={handleChange}>
                       {    progressOptions.map(progress => (
                           <option value={progress.value}>{ progress.label }</option>
                            ))

                       }
                   </select>
                    {/* priority */}
                    <label htmlFor="priority">Issue priority</label>
                    <select name="priority" id="priority" value={issueInput.priority} onChange={handleChange}>
                       {    priorityOptions.map(priority => (
                           <option value={priority.value}>{ priority.label }</option>
                       ))

                       }
                   </select>
                     {/* project */}
                     <label htmlFor="project">Issue project</label>
                     <select name="project" id="project" value={newProject} onChange={ e => setNewProject(e.target.value) }>
                       {    newProject.map(project => (
                           <option value={project.ID}>{ project.name }</option>
                       ))

                       }
                   </select>
                    {/* submit */}
                    <button type="submit" className="submit-btn center"><div className="icon"><BsPlus /></div> Add issue</button>
                </form>
            </div>
        </div>
    )
}

export default AddTask
