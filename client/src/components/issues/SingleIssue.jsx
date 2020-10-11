import React, { useEffect, useState, useRef, useReducer } from 'react';
import axios from 'axios';

import services from './issues';

import { Link } from 'react-router-dom';

import './SingleIssue.scss';

import { BsLink45Deg, BsCheckAll } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiTimer, BiCheck } from 'react-icons/bi';

//Notification box
import { toast } from 'react-toastify';

const SingleIssue = ({ match }) => {
	const [issue, setIssue] = useState('');
	const [newIssue, setNewIssue] = useState('');
	const {
		params: { issueId },
	} = match;
	//Fetching single issue
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(
				`http://localhost:8080/api/issues/${issueId}`
			);

			setIssue(result.data);
			setNewIssue(result.data);
		};

		fetchData();
	}, [issueId]);
	const [deleteModal, setDeleteModal] = useState(false);


	//Copy page url
	const [copySuccess, setCopySuccess] = useState(false);
	const urlInputRef = useRef(null);


	//Default status & priority data
	 const progressOptions = [ 
        { value: 'Backlog', label: 'Backlog' },
        { value: 'To do', label: 'To do' },
        { value: 'In progress', label: 'In progress' },
        { value: 'Done', label: 'Done' }
     ]
     const priorityOptions = [ 
      { value: 'Low', label: 'Low' },
      { value: 'Medium', label: 'Medium' },
      { value: 'High', label: 'High' }
	]
	
	//Copy page url
	const handleCopyUrl = (e) => {
		urlInputRef.current.select();
		document.execCommand('copy');

		setCopySuccess(true);
	};

	//Delete issue
	const deleteSingleIssue = (issueId) => {
		services.deleteIssue(issueId).then((response) => {
			setIssue(issue.issueId !== issue.ID);
		});
	};

	//Update title
	const updateTitle = (id) => {

		const updateTitle = { ...issue, title: newIssue.title }
		services.updateIssue(id, updateTitle)
		.then(response => {
			setNewIssue('')
		})
	}

	return (
		<>
			{issue && (
				<div className="single-issue-wrapper" key={issue.ID}>
					<div className="main-col">
						{/* Title */}
						<div className="input-wrapper">
							<input type="text" defaultValue={issue.title} 
								onChange={ e => setNewIssue({ ...newIssue, title: e.target.value }) } 
							/>
							<div className="icon" onClick={updateTitle(issue.ID)}>
								<BiCheck />
							</div>
						</div>
						{/* Description */}
						<div className="input-wrapper">
							<b>Description</b>
							<textarea name="description" id="description" defaultValue={issue.description} 
								onChange={ e => setNewIssue({ ...newIssue, description: e.target.value }) } 
							/>
							<div className="icon description">
								<BiCheck />
							</div>
						</div>
						<div className="comments-wrapper">
							{issue.Comments && issue.Comments.length > 0 ? (
								<h4>Issue comments</h4>
							) : (
								<h4>Add first comment</h4>
							)}
							{issue.Comments && issue.Comments.map((comment) => (
								<p key={comment.ID}>{comment.content}</p>
							))}
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
										issue?
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
												deleteSingleIssue(issue.ID)
											}>
											Delete
										</Link>
									</div>
								</div>
							)}
						</div>

						<div className="status">
							<h4 className="side-title">Status</h4>
							<div className="side-content side-btn">
								<select name="status" id="status">
									{ progressOptions.map(singleIssue => (
										<option 
										value={singleIssue.value} 
										key={singleIssue.value} 
										selected = { singleIssue.value === issue.progress ? 'selected' : ''  }
										>
											{ singleIssue.label }
										</option>
									)) }
								</select>
							</div>
						</div>
						<div className="priority">
							<h4 className="side-title">Priority</h4>
							<div className="side-content side-btn">
							<select name="status" id="status">
									{ priorityOptions.map(singleIssue => (
										<option 
										value={singleIssue.value} 
										key={singleIssue.value} 
										selected = { singleIssue.value === issue.priority ? 'selected' : ''  }
										>
											{ singleIssue.label }
										</option>
									)) }
								</select>
							</div>
						</div>
						<div className="estimated">
							<h4 className="side-title">Estimated (Hours)</h4>
							<div className="side-content input-wrapper">
								<input type="text" defaultValue={issue.estimated} 
									onChange={ e => setNewIssue({ ...newIssue, estimated: Number(e.target.value) }) }
								/>
								<div className="icon">
									<BiCheck />
								</div>
							</div>
						</div>
						<div className="time-tracking">
							<h4 className="side-title">Time tracking</h4>
							<div className="side-content">
								<div className="icon"><BiTimer /></div>
								<div className="hours">
									<div className="meter">
										<span style={{ width: `${issue.timelog * 100 / issue.estimated}%` }}></span>
									</div>
									<div className="logged-estimated">
										<span>{issue.timelog} logged</span>
										<span>{issue.estimated} estimated</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default SingleIssue;
