import React from 'react'
import { TiThMenuOutline } from 'react-icons/ti'
import { BsPeople, BsListCheck } from 'react-icons/bs'
import { FcGenealogy } from 'react-icons/fc'

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
						<li><a><TiThMenuOutline /></a></li>
						<li><a><BsPeople /></a></li>
						<li><a><BsListCheck /></a></li>
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
