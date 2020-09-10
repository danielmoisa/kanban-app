import React, { useState } from 'react'

import './Sidebar.scss'

import { FcTrademark } from 'react-icons/fc'
import { BsChevronDown, BsChevronUp, BsGrid3X3, BsSearch } from 'react-icons/bs'
import { GrClose } from 'react-icons/gr'

const Sidebar = () => {

    const [userInfo, setUserInfo] = useState(false)
    const [searchIssues, setSearchIssues] = useState(false)

    return (
        <>
            <div className={`account ${ userInfo ?  'dropdown-active' : '' }`} onClick={ () => setUserInfo(!userInfo) }>
                <div className="account-wrapper">
                    <div className="avatar">
                        <div className="info center">
                            <FcTrademark />
                            <p>User name</p>
                        </div>
                        { userInfo ?  <BsChevronUp/> : <BsChevronDown /> } 
                    </div>
                </div>
            </div>
            { userInfo &&
                <div className="account-dropdown">
                    <a>Item 1</a>
                    <a>Item 2</a>
                    <a>Item 3</a>
                </div>
            }
            <div className="sidebar-item board">
                <BsGrid3X3 />
                <span>Kanban Board</span>
            </div>
            <div className={`sidebar-item search-issues ${ searchIssues ?  'dropdown-active' : '' }`} onClick={ () => setSearchIssues(!searchIssues) }>
                {searchIssues ? <div><GrClose /> <span>Close search</span></div> : <div><BsSearch /> <span>Search issues</span></div> }
            </div>
            <div className="search-dropdown">
                { searchIssues && 
                    <input type="text" autoFocus placeholder="Search issues here..."/>
                }
            </div>
        </>
    )
}

export default Sidebar
