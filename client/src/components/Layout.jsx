import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Spinner from '../widgets/Spinner';

import { BsPeople, BsSearch } from 'react-icons/bs';
import { FcGenealogy } from 'react-icons/fc';
import { AiOutlinePlus } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';

import './Layout.scss';

import Header from './Header';
import Sidebar from './Sidebar';
import IssuesSearch from './issues/IssuesSearch'

const Layout = ({ children }) => {
	const [spinner, setSpinner] = useState(true);
	const [searchIssues, setSearchIssues] = useState(false)

	useEffect(() => {
		setTimeout(() => setSpinner(false), 1000);
	}, []);

	return (
		<div className="main">
			<div className="side">
				<div className="side-menu">
					<div className="menu-wrapper">
						<ul>
							<li className="logo">
								<Link to="/">
									<FcGenealogy />
								</Link>
							</li>
							<li onClick={ () => setSearchIssues(!searchIssues) }>
								<a>
									<BsSearch /> <span>Search issues</span>
								</a>
							</li>
							<li>
								<NavLink
									to="/add-task"
									activeClassName="active-link">
									<AiOutlinePlus /> <span>Add task</span>
								</NavLink>
							</li>
							<li>
								<a>
									<BsPeople /> <span>Account</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="sidebar">
					<Sidebar />
				</div>
			</div>
			<div className="content">
				<Header />
				{ searchIssues && 
					<div className={ `search-issues-modal ${
						searchIssues ? 'open-issues-modal' : ''
					}` }>
						<div className="overlay"></div>
						<div className="search-issues-wrapper">
							<div className="close-modal center" onClick={ () => setSearchIssues(false) }>
								<GrClose />
							</div>
							<IssuesSearch />
						</div>
					</div>
				}
				{spinner ? <Spinner /> : children}
			</div>
		</div>
	);
};

export default Layout;
