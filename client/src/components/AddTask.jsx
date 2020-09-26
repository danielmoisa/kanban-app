import React, { useState, useEffect } from 'react'
import axios from 'axios'

import services from './issues/issues'

import './AddTask.scss'

import { BsPlus } from 'react-icons/bs'

const AddTask = () => {

    const [issues, setIssues] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newReporter, setNewReporter] = useState('');
    const [newEstimate, setNewEstimate] = useState('');
    const [newPriority, setNewPriority] = useState('');

    useEffect(() => {
       services.getIssues()
       .then(response => {
           setIssues(response.data)
       })
    }, []);

    const addNewIssue = e => {
        e.preventDefault()

        const newIssue = {
            title: newTitle,
            description: newDescription,
            reporter: newReporter,
            timelog: 0,
            estimated: newEstimate,
            progress: 'In progress',
            priority: newPriority,
            ProjectID: 1,
        }

        services.addIssue(newIssue)
        .then(response => {
            setIssues(issues.concat(response.data))
        });

        setNewTitle('')
        setNewDescription('')
        setNewReporter('')
        setNewEstimate('')
        setNewPriority('')

        console.log('New issue added successfully!')
    }

    return (
        <div className="add-issue">
            <h2>Create new issue</h2>
            <div className="add-issue-form">
                <form onSubmit={addNewIssue}>
                    {/* title */}
                    <label htmlFor="title">Issue title</label>
                    <input type="text" name="title" id="title" value={newTitle} onChange={ e => setNewTitle(e.target.value) } />
                    {/* description */}
                    <label htmlFor="description">Issue description</label>
                    <input type="text" name="description" id="description" value={newDescription} onChange={ e => setNewDescription(e.target.value) }/>
                    {/* reporter */}
                    <label htmlFor="reporter">Issue reporter</label>
                    <input type="text" name="reporter" id="reporter" value={newReporter} onChange={ e => setNewReporter(e.target.value) }/>
                    {/* estimated */}
                    <label htmlFor="estimated">Issue estimated</label>
                    <input type="text" name="estimated" id="estimated" value={newEstimate} onChange={ e => setNewEstimate(e.target.value) }/>
                    {/* priority */}
                    <label htmlFor="priority">Issue priority</label>
                    <input type="text" name="priority" id="priority" value={newPriority} onChange={ e => setNewPriority(e.target.value) }/>
                    {/* submit */}
                    <button type="submit" className="center"><div className="icon"><BsPlus /></div> Add issue</button>
                </form>
            </div>
        </div>
    )
}

export default AddTask
