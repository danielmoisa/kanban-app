import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'
 
import { HiOutlineArrowLeft } from 'react-icons/hi'
import { BsPerson, BsPeople, BsPlus } from 'react-icons/bs'
import { AiOutlineSetting } from 'react-icons/ai'

const Header = () => {

    return (
        <div className="header">
            <div className="header-wrapper">
                <div className="header-left">
                    <Link to="/" className="arrow">
                        <HiOutlineArrowLeft />
                    </Link>
                    <div className="avatar-wrapper">
                        <div className="avatar">
                            <img src="../../logo.svg" alt="platform logo"/>
                        </div>
                        <div className="project-info">
                            <h4 className="name">
                                Projects Management Platform
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="header-right">
                    <Link to="/edit-account" className="me">
                        <div className="left center">
                            <BsPerson /><span>Me</span>
                        </div>
                        <div className="right center">
                            <BsPeople />
                        </div>
                    </Link>
                    <Link to="/add-issue" className="add-task center">
                        <BsPlus />
                        <span>Add Issue</span>
                    </Link>
                    <Link to="/add-project" className="settings center">
                        <AiOutlineSetting />
                        <span>Add Project</span>
                    </Link>            
                </div>
            </div>
        </div>
    )
}

export default Header
