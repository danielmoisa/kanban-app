import React from 'react'

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
						<li className="logo"><a><FcGenealogy /></a></li>
						<li><a><BsSearch /> <span>Search issues</span> </a></li>
						<li><a><AiOutlinePlus /> <span>Add task</span> </a></li>
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
