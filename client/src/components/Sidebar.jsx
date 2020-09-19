import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

import SearchProjects from './projects/SearchProjects'

import axios from 'axios';
import './Sidebar.scss';

import { FcTrademark } from 'react-icons/fc';
import {
	BsGrid3X3,
	BsSearch,
} from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';

const Sidebar = () => {
	const [searchProjectsInput, setSearchProjectsInput] = useState(false);
	const [searchProjects, setSearchProjects] = useState('');
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios('http://127.0.0.1:8080/api/users/1');

			setData(result.data);
		};

		fetchData();
	}, []);

	const handleProjectsSearch = (e) => {
		setSearchProjects(e.target.value)
	  }
	  const userProjects = data.Projects

	  const results = () => {
		if(searchProjects === '') {
		  return userProjects;
		}
		return [...userProjects].filter(
			project => project.name.toLowerCase().includes(searchProjects.toLowerCase())
		)
	  }

	return (
		<>
			<div
				className="account">
				<div className="account-wrapper">
					<div className="avatar">
						<div className="info center">
							<FcTrademark />
							<p>{data.name}</p>
						</div>
					</div>
				</div>
			</div>
			<NavLink
				exact
				to="/"
				activeClassName="active-link"
				className="sidebar-item board">
				<BsGrid3X3 />
				<span>Kanban Board</span>
			</NavLink>
			<div
				className={`sidebar-item search-issues ${
					searchProjectsInput ? 'dropdown-active' : ''
				}`}
				onClick={() => setSearchProjectsInput(!searchProjectsInput)}>
				{searchProjectsInput ? (
					<div>
						<GrClose /> <span>Close search</span>
					</div>
				) : (
					<div>
						<BsSearch /> <span>Search projects</span>
					</div>
				)}
			</div>
			<div className="search-dropdown">
				{searchProjectsInput && (
					<input
						type="text"
						autoFocus
						placeholder="Search projects here..."
						value={ searchProjects }
						onChange={ handleProjectsSearch }
					/>
				)}
			</div>

			<SearchProjects userProjects={results()} />
		</>
	);
};

export default Sidebar;
