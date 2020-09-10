import React, { useState } from 'react'

import './Header.scss'
 
import { HiOutlineArrowLeft } from 'react-icons/hi'
import { FcRegisteredTrademark } from 'react-icons/fc'
import { BsPerson, BsPeople, BsPlus } from 'react-icons/bs'
import { AiOutlineSetting } from 'react-icons/ai'

const Header = () => {

    const [settings, setSettings] = useState(false)

    return (
        <div className="header">
            <div className="header-wrapper">
                <div className="header-left">
                    <div className="arrow">
                        <HiOutlineArrowLeft />
                    </div>
                    <div className="avatar-wrapper">
                        <div className="avatar">
                            <FcRegisteredTrademark />
                        </div>
                        <div className="project-info">
                            <h4 className="name">
                                Covet Cast
                            </h4>
                            <p className="status">
                                In Progress
                            </p>
                        </div>
                    </div>
                </div>
                <div className="header-right">
                    <div className="me">
                        <div className="left center">
                            <BsPerson /><span>Me</span>
                        </div>
                        <div className="right center">
                            <BsPeople />
                        </div>
                    </div>
                    <div className="add-task center">
                        <BsPlus />
                        <span>Add Task</span>
                    </div>
                    <div className="settings center" onClick={ () => setSettings(!settings) }>
                        <AiOutlineSetting />
                    </div>
                    { settings && 
                        <div className="settings-menu">
                            <a>Item 1</a>
                            <a>Item 2</a>
                            <a>Item 3</a>
                        </div>
                    }                   
                </div>
            </div>
        </div>
    )
}

export default Header
