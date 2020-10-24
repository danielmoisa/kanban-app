import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import services from './projects';

import { Link } from 'react-router-dom';

import './SingleProject.scss';

//Icons
import { BsLink45Deg, BsCheckAll } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiCheck } from 'react-icons/bi';

//Notification box
import { toast } from 'react-toastify';

const SingleProject = ({ match }) => {
const [project, setProject] = useState();
const {
	params: { projectId },
} = match;
const [deleteModal, setDeleteModal] = useState(false);

//Copy page url
const [copySuccess, setCopySuccess] = useState(false);
const urlInputRef = useRef(null);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(
				`http://localhost:8080/api/projects/${projectId}`
			);

			setProject(result.data);
		};

		fetchData();
	}, [projectId]);

	const categoryOptions = [
		{ value: "Web Development", label: "Web Development" },
		{ value: "Marketing", label: "Marketing" },
		{ value: "Grafic Design", label: "Grafic Design" },
	];
	
	//Copy page url
	const handleCopyUrl = () => {
		urlInputRef.current.select();
		document.execCommand('copy');

		setCopySuccess(true);
	};

	//Delete project
	const deleteSingleProject = (projectId) => {
		services.deleteProject(projectId);

		toast.success('Project successfully deleted');
	};

	//Update name
	const updateName = (id) => {
		const updateName = { ...project, name: project.title }
		services.updateProject(id, updateName)
	}

	//Update description
	const updateDescription = (id) => {
		const updateDescription = { ...project, description: project.description }
		services.updateProject(id, updateDescription)
	}

	//Update status
	const updateCategory = (id) => {
		const updateCategory = { ...project, category: project.category }
		services.updateProject(id, updateCategory)
	}

	
	return (
		<>
			{project && (
			<div>
				<div className="single-issue-wrapper" key={project.ID}>
					<div className="main-col">
						{/* Name */}
						<div className="input-wrapper">
							<input type="text" defaultValue={project.name} 
								onChange={ e => setProject({ ...project, name: e.target.value }) } 
							/>
							<div className="icon description">
								<BiCheck onClick={updateName(project.ID)}/>
							</div>
						</div>
						{/* Description */}
						<div className="input-wrapper">
							<b>Description</b>
							<textarea name="description" id="description" defaultValue={project.description} 
								onChange={ e => setProject({ ...project, description: e.target.value }) }
							/>
							<div className="icon">
								<BiCheck onClick={updateDescription(project.ID)}/>
							</div>
						</div>
					</div>
					<div className="side-col">
						<div className="copy-delete">
							{/* Copy url */}
							{document.queryCommandSupported('copy') && (
								<div
									className="copy-url"
									onClick={handleCopyUrl}>
									{copySuccess ? (
										<div className="copy copied center side-btn">
											<BsCheckAll /> Url copied
										</div>
									) : (
										<div className="copy uncopied center side-btn">
											<BsLink45Deg />
											Copy url
										</div>
									)}
									<input
										type="text"
										ref={urlInputRef}
										defaultValue={window.location.href}
									/>
								</div>
							)}
							{/* Delete issue */}
							<div
								className={`delete-issue center ${
									deleteModal ? 'delete-active' : ''
								}`}
								onClick={() => setDeleteModal(!deleteModal)}>
								<AiOutlineDelete />
							</div>
							{deleteModal && (
								<div className="delete-issues-modal">
									<h4>
										Are you sure you want to delete this
										project?
									</h4>
									<div className="buttons center">
										<button
											className="cancel secondary-btn"
											onClick={() =>
												setDeleteModal(false)
											}>
											Cancel
										</button>
										<Link
											to="/"
											className="delete primary-btn"
											onClick={() =>
												deleteSingleProject(project.ID)
											}>
											Delete
										</Link>
									</div>
								</div>
							)}
						</div>
						{/* Status */}
						<div className="status">
							<h4 className="side-title">Category</h4>
							<div className="side-content side-btn">
							<div className="icon" >
								<BiCheck onClick={updateCategory(project.ID)}/>
							</div>
								<select name="category" id="category" defaultValue={project.category}
									onChange={ e => setProject({ ...project, category: e.target.value }) }
								>
									{ categoryOptions.map(singleCategory => (
										<option 
										value={singleCategory.value} 
										key={singleCategory.value} 
										>
											{ singleCategory.label }
										</option>
									)) }
								</select>
							</div>
						</div>
					</div>
				</div>
				{/* Project issues */}
				<div className="project-issues">
					{ project.Issues.length > 0 ? <h2>Project issues</h2> : '' }
					<div className="wrapper">
						{ project.Issues && 
							project.Issues.map(issue => (
								<Link to={`/issue/${issue.ID}`} className="single-issue" key={issue.ID}>
									<div className="issue-wrapper">
										<div className="status">
											<div className={`progress ${issue.progress.split(" ").join("")}`}>
												<span>{ issue.progress }</span>
											</div>
											<div className={`priority ${issue.priority.split(" ").join("")}`}>
												<span>{ issue.priority }</span>
											</div>
										</div>
										<div className="image">
											<img src={`../../uploads/${issue.imgid ? issue.imgid : 'default-project.svg'}`} alt={issue.title}/>
										</div>
										<div className="title">
										<h4>{ issue.title }</h4>
										</div>
									</div>
								</Link>
							))
						}
					</div>
				</div>
			</div>
			)}
		</>
	);
};

export default SingleProject;
