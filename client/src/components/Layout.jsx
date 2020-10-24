import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation  } from 'react-router-dom';

import Spinner from '../widgets/Spinner';

import { BsPeople, BsSearch } from 'react-icons/bs';
import { AiOutlinePlus, AiOutlineProject } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';

import './Layout.scss';

import Header from './Header';
import Sidebar from './Sidebar';
import IssuesSearch from './issues/IssuesSearch'

const Layout = ({ children }) => {
	const [spinner, setSpinner] = useState(true);
	const [issuesModal, setIssuesModal] = useState(false);

	useEffect(() => {
		setTimeout(() => setSpinner(false), 1000);
	}, []);

	//Get current path
	const location = useLocation();

	return (
		<div className="main">
			{ location.pathname !== '/login' &&
				<div className="side">
				<div className="side-menu">
					<div className="menu-wrapper">
						<ul>
							<li className="logo">
								<Link to="/">
									<img src="../../logo-sidemenu.svg" alt="platform logo"/>
								</Link>
							</li>
							<li onClick={ () => setIssuesModal(!issuesModal) }>
								<a>
									<BsSearch />
									<span>Search issues</span>
								</a>
							</li>
							<li>
								<NavLink
									to="/add-issue"
									activeClassName="active-link">
									<AiOutlinePlus /> <span>Add issue</span>
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/add-project"
									activeClassName="active-link">
									<AiOutlineProject /> <span>Add project</span>
								</NavLink>
							</li>
							<li>
								<NavLink to="/">
									<BsPeople /> <span>Account</span>
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
				<div className="sidebar">
					<Sidebar />
				</div>
			</div>
			}
			<div className="content">
			{ location.pathname !== '/login' && <Header /> }
				{ issuesModal && 
					<div className={ `search-issues-modal ${
						issuesModal ? 'open-issues-modal' : ''
					}` }>
						<div className="overlay"></div>
						<div className="search-issues-wrapper">
							<div className="close-modal center" onClick={ () => setIssuesModal(false) }>
								<GrClose />
							</div>
							<IssuesSearch setIssuesModal={ setIssuesModal } />
						</div>
					</div>
				}
				{spinner ? <Spinner /> : children}
			</div>
		</div>
	);
};

export default Layout;
