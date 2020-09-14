import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

import axios from 'axios';
import './Sidebar.scss';

import { FcTrademark } from 'react-icons/fc';
import {
	BsChevronDown,
	BsChevronUp,
	BsGrid3X3,
	BsSearch,
} from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';

const Sidebar = () => {
	const [userInfo, setUserInfo] = useState(false);
	const [searchIssues, setSearchIssues] = useState(false);
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios('http://127.0.0.1:8080/api/users/1');

			setData(result.data);
		};

		fetchData();
	}, []);

	console.log(data);

	return (
		<>
			<div
				className={`account ${userInfo ? 'dropdown-active' : ''}`}
				onClick={() => setUserInfo(!userInfo)}>
				<div className="account-wrapper">
					<div className="avatar">
						<div className="info center">
							<FcTrademark />
							<p>{data.name}</p>
						</div>
						{userInfo ? <BsChevronUp /> : <BsChevronDown />}
					</div>
				</div>
			</div>
			{userInfo && (
				<div className="account-dropdown">
					<a>Item 1</a>
					<a>Item 2</a>
					<a>Item 3</a>
				</div>
			)}
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
					searchIssues ? 'dropdown-active' : ''
				}`}
				onClick={() => setSearchIssues(!searchIssues)}>
				{searchIssues ? (
					<div>
						<GrClose /> <span>Close search</span>
					</div>
				) : (
					<div>
						<BsSearch /> <span>Search issues</span>
					</div>
				)}
			</div>
			<div className="search-dropdown">
				{searchIssues && (
					<input
						type="text"
						autoFocus
						placeholder="Search issues here..."
					/>
				)}
			</div>

			<div className="projects">
				{data.Projects &&
					data.Projects.map((project) => <p>{project.name}</p>)}
			</div>
		</>
	);
};

export default Sidebar;
