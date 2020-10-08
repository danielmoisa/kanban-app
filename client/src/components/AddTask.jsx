import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

import services from './issues/issues';

import './AddTask.scss';

//Select input
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';

import { BsController, BsPlus } from 'react-icons/bs';

const AddTask = () => {
	const [issueInput, setIssueInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
			title: '',
			description: '',
			estimated: '',
			progress: '',
			priority: '',
		}
	);
	const [newProgress, setNewProgress] = useState('');
	const [newPriority, setNewPriority] = useState('');
	const [newProject, setNewProject] = useState('');

	//Get all projects
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios('http://127.0.0.1:8080/api/projects');

			setNewProject(result.data);
		};

		fetchData();
	}, []);

	const projectOptions = [...newProject];
	console.log(projectOptions);

	const filterProjects = (inputValue: string) => {
		return projectOptions.filter((i) =>
			i.name.toLowerCase().includes(inputValue.toLowerCase())
		);
	};

	const promiseOptions = (inputValue) =>
		new Promise((resolve) => {
			setTimeout(() => {
				resolve(filterProjects(inputValue));
			}, 1000);
		});

	//Select status data
	const progressOptions = [
		{ value: 'Backlog', label: 'Backlog' },
		{ value: 'To do', label: 'To do' },
		{ value: 'In progress', label: 'In progress' },
		{ value: 'Done', label: 'Done' },
	];
	const priorityOptions = [
		{ value: 'Low', label: 'Low' },
		{ value: 'Medium', label: 'Medium' },
		{ value: 'High', label: 'High' },
	];

	//Select style
	const selectStyle = {
		control: (styles) => ({ ...styles, backgroundColor: '#fff' }),
		option: (styles, { data, isDisabled, isFocused, isSelected }) => {
			return {
				...styles,
				backgroundColor: isSelected
					? '#2a60e4'
					: isFocused
					? '#e2e8f5'
					: '#fff',
				color: isSelected ? '#fff' : '#0d0c22',
				cursor: 'pointer',
			};
		},
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		setIssueInput({ [name]: value });
	};

	const addNewIssue = (e) => {
		e.preventDefault();

		const newIssue = {
			title: issueInput.title,
			description: issueInput.description,
			timelog: 0,
			estimated: Number(issueInput.estimated),
			progress: newProgress,
			priority: newPriority,
			ProjectID: newProject,
		};

		services.addIssue(newIssue);

		setIssueInput({
			title: '',
			description: '',
			estimated: '',
			priority: '',
		});
		setNewProgress('');

		// setNotification({ content: 'Issue successfully added.', type: 'success' });
		// setTimeout(() => {
		//     setNotification({content: null})
		//   }, 3000);
	};

	return (
		<div className="add-issue">
			<h2>Create new issue</h2>
			<div className="add-issue-form">
				<form onSubmit={addNewIssue}>
					{/* title */}
					<label htmlFor="title">Issue title</label>
					<input
						type="text"
						name="title"
						id="title"
						value={issueInput.title}
						onChange={handleChange}
					/>
					{/* description */}
					<label htmlFor="description">Issue description</label>
					<textarea
						name="description"
						id="description"
						value={issueInput.description}
						onChange={handleChange}
					/>
					{/* estimated */}
					<label htmlFor="estimated">Issue estimated</label>
					<input
						type="text"
						name="estimated"
						id="estimated"
						value={issueInput.estimated}
						onChange={handleChange}
					/>
					{/* progress */}
					<label htmlFor="progress">Issue status</label>
					<Select
						name="progress"
						id="progress"
						value={progressOptions.find(
							(x) => x.value === newProgress
						)}
						onChange={(e) => setNewProgress(e.value)}
						options={progressOptions}
						placeholder="Select status"
						noOptionsMessage={() =>
							'No available status for your search'
						}
						clearable={false}
						styles={selectStyle}
					/>
					{/* priority */}
					<label htmlFor="priority">Issue priority</label>
					<Select
						name="priority"
						id="priority"
						value={priorityOptions.find(
							(x) => x.value === newPriority
						)}
						onChange={(e) => setNewPriority(e.value)}
						options={priorityOptions}
						placeholder="Select priority"
						noOptionsMessage={() =>
							'No available priority for your search'
						}
						clearable={false}
						styles={selectStyle}
					/>
					{/* project */}
					<label htmlFor="project">Issue project</label>
					<AsyncSelect
						name="project"
						id="project"
						getOptionLabel={(project) => project.name}
						getOptionValue={(project) => project.ID}
						value={projectOptions.find(
							(x) => x.name === newProject
						)}
						onChange={(value) => setNewProject(value)}
						placeholder="Select project"
						noOptionsMessage={() => 'Search project'}
						clearable={false}
						styles={selectStyle}
						loadOptions={promiseOptions}
					/>
					{/* submit */}
					<button type="submit" className="submit-btn center">
						<div className="icon">
							<BsPlus />
						</div>{' '}
						Add issue
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddTask;
