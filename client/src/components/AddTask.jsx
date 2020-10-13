import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";

import services from "./issues/issues";

import "./AddTask.scss";

//Notification box
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Import constants
import CONSTANTS from "../constants/constants";

import { BsPlus } from "react-icons/bs";

const AddTask = () => {
	const [selectedFile, setSelectedFile] = useState(null);
	const [issueInput, setIssueInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
			title: "",
			description: "",
			estimated: "",
			progress: "",
			priority: "",
			project: "",
		}
	);
	const [newProject, setNewProject] = useState(null);

	//Get all projects
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios("http://127.0.0.1:8080/api/projects");

			setNewProject(result.data);
		};

		fetchData();
	}, []);

	//Select status data
	const progressOptions = [
		{ value: CONSTANTS.REQUESTED, label: CONSTANTS.REQUESTED },
		{ value: CONSTANTS.TODO, label: CONSTANTS.TODO },
		{ value: CONSTANTS.INPROGRESS, label: CONSTANTS.INPROGRESS },
		{ value: CONSTANTS.DONE, label: CONSTANTS.DONE },
	];

	const priorityOptions = [
		{ value: "Low", label: "Low" },
		{ value: "Medium", label: "Medium" },
		{ value: "High", label: "High" },
	];

	const handleChange = (e) => {
		const { name, value } = e.target;

		setIssueInput({ [name]: value });
	};

	const addNewIssue = (e) => {
		e.preventDefault();
		if (
			issueInput.title !== "" &&
			issueInput.description !== "" &&
			issueInput.estimated !== ""
		) {
			const newIssue = {
				title: issueInput.title,
				description: issueInput.description,
				timelog: 2,
				estimated: Number(issueInput.estimated),
				progress: issueInput.progress,
				priority: issueInput.priority,
				ProjectID: Number(issueInput.project),
				imgid: selectedFile && selectedFile.name,
			};

			services.addIssue(newIssue);

			setIssueInput({
				title: "",
				description: "",
				estimated: "",
				progress: "",
				priority: "",
			});
			setNewProject("");
			toast.success("Task successfully added!");
		} else {
			toast.error("All fields are required!");
		}
		// add file
		const formData = new FormData();
		formData.append("file", selectedFile);
		axios
			.post("http://127.0.0.1:8080/api/upload", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((res) => {
				console.log(res.statusText);
			});
	};

	const onChangeFile = (e) => {
		setSelectedFile(e.target.files[0]);
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
					<select
						name="progress"
						id="progress"
						value={issueInput.progress}
						onChange={handleChange}>
						{progressOptions.map((progress) => (
							<option value={progress.value} key={progress.value}>
								{progress.label}
							</option>
						))}
					</select>
					{/* priority */}
					<label htmlFor="priority">Issue priority</label>
					<select
						name="priority"
						id="priority"
						defaultValue={issueInput.priority}
						onChange={handleChange}>
						{priorityOptions.map((priority) => (
							<option value={priority.value} key={priority.value}>
								{priority.label}
							</option>
						))}
					</select>
					{/* project */}
					<label htmlFor="project">Issue project</label>
					<select
						name="project"
						id="project"
						defaultValue={issueInput.project}
						onChange={handleChange}>
						{newProject &&
							newProject.map((project) => (
								<option value={project.ID} key={project.ID}>
									{project.name}
								</option>
							))}
					</select>
					<input
						type="file"
						name="file"
						onChange={(e) => onChangeFile(e)}
					/>
					{/* submit */}
					<button type="submit" className="submit-btn center">
						<div className="icon">
							<BsPlus />
						</div>{" "}
						Add issue
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddTask;
