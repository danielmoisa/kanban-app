import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import { BsPeople, BsSearch } from 'react-icons/bs'
import { FcGenealogy } from 'react-icons/fc'
import { AiOutlinePlus } from 'react-icons/ai'

import './Layout.scss'

import Header from './Header'
import Sidebar from './Sidebar'

const Layout = ({ children }) => (
	<div className="main">
		<div className="side">
			<div className="side-menu">
				<div className="menu-wrapper">
					<ul>
						<li className="logo"><Link to="/" ><FcGenealogy /></Link></li>
						<li><a><BsSearch /> <span>Search issues</span> </a></li>
						<li><NavLink to="/add-task" activeClassName="active-link" ><AiOutlinePlus /> <span>Add task</span> </NavLink></li>
						<li><a><BsPeople /> <span>Account</span> </a></li>
					</ul>
				</div>
			</div>
			<div className="sidebar">
				<Sidebar />
			</div>
		</div>
		<div className="content">
			<Header />
			{children}
		</div>
	</div>
);

export default Layout
