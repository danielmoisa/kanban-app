import React, { useState, useReducer } from "react";

import services from "../projects/projects";

import "./AddProject.scss";

//Notification box
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BsPlus } from "react-icons/bs";

const AddProject = () => {
	const [projectInput, setProjectInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
			name: "",
			description: "",
			category: "Web Development",
		}
	);
	const [newProject, setNewProject] = useState(null);

	const categoryOptions = [
		{ value: "Web Development", label: "Web Development" },
		{ value: "Marketing", label: "Marketing" },
		{ value: "Grafic Design", label: "Grafic Design" },
	];

	const handleChange = (e) => {
		const { name, value } = e.target;

		setProjectInput({ [name]: value });
	};

	const addNewProject = (e) => {
		e.preventDefault();
		if (
			projectInput.name !== "" &&
			projectInput.description !== "" &&
			projectInput.category !== ""
		) {
			const newProject = {
				name: projectInput.name,
				description: projectInput.description,
                category: projectInput.category,
                userID: 1
			};

			services.addProject(newProject);

			setProjectInput({
				name: "",
				description: "",
                category: "",
			});
			setNewProject("");
			toast.success("Project successfully added!");
		} else {
			toast.error("All fields are required!");
		}
    }
	return (
		<div className="add-issue">
			<h2>Create new project</h2>
			<div className="add-issue-form">
				<form onSubmit={addNewProject}>
					{/* name */}
					<label htmlFor="name">Project title</label>
					<input
						type="text"
						name="name"
						id="name"
						value={projectInput.name}
						onChange={handleChange}
					/>
					{/* description */}
					<label htmlFor="description">Project description</label>
					<textarea
						name="description"
						id="description"
						value={projectInput.description}
						onChange={handleChange}
					/>
					{/* category */}
					<label htmlFor="category">Project category</label>
					<select
						name="category"
						id="category"
						defaultValue={projectInput.category}
						onChange={handleChange}>
						{categoryOptions.map((category) => (
							<option value={category.value} key={category.value}>
								{category.label}
							</option>
						))}
					</select>
					{/* submit */}
					<button type="submit" className="submit-btn center">
						<div className="icon">
							<BsPlus />
						</div>
						Add project
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddProject;
