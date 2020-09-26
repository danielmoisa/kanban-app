import React from 'react'

import './AddTask.scss'

import { BsPlus } from 'react-icons/bs'

const addTask = () => {
    return (
        <div className="add-issue">
            <h2>Create new issue</h2>
            <div className="add-issue-form">
                <form action="">
                    {/* title */}
                    <label htmlFor="title">Issue title</label>
                    <input type="text" name="title" id="title" />
                    {/* description */}
                    <label htmlFor="description">Issue description</label>
                    <textarea type="text" name="description" id="description" />
                    {/* reporter */}
                    <label htmlFor="reporter">Issue reporter</label>
                    <input type="text" name="reporter" id="reporter" />
                    {/* estimated */}
                    <label htmlFor="estimated">Issue estimated</label>
                    <input type="text" name="estimated" id="estimated" />
                    {/* priority */}
                    <label htmlFor="priority">Issue priority</label>
                    <input type="text" name="priority" id="priority" />
                    {/* submit */}
                    <button type="submit" className="center"><div className="icon"><BsPlus /></div> Add issue</button>
                </form>
            </div>
        </div>
    )
}

export default addTask
