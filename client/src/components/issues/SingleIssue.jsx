import React, { useEffect, useState, useRef, useReducer } from "react";
import axios from "axios";

import services from "./issues";

import { Link } from "react-router-dom";

import "./SingleIssue.scss";

import { BsLink45Deg, BsCheckAll } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { BiTimer, BiCheck } from "react-icons/bi";

//Import constants
import CONSTANTS from "../../constants/constants";
import { toast } from "react-toastify";

//Comments component
import CommentsList from "./../comments/CommentsList";

const SingleIssue = ({ match }) => {
	const [issue, setIssue] = useState("");

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
		};

		fetchData();
	}, [issueId]);
	const [deleteModal, setDeleteModal] = useState(false);
	const [logTime, setLogTime] = useState(false);

	//Copy page url
	const [copySuccess, setCopySuccess] = useState(false);
	const urlInputRef = useRef(null);

	//Default status & priority data
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

	//Copy page url
	const handleCopyUrl = (e) => {
		urlInputRef.current.select();
		document.execCommand("copy");

		setCopySuccess(true);
	};

	//Delete issue
	const deleteSingleIssue = (issueId) => {
		services.deleteIssue(issueId);

		toast.success("Issue successfully deleted");
	};

	//Update title
	const updateTitle = (id) => {
		const updateTitle = { ...issue, title: issue.title };
		services.updateIssue(id, updateTitle);
	};

	//Update description
	const updateDescription = (id) => {
		const updateDescription = { ...issue, description: issue.description };
		services.updateIssue(id, updateDescription);
	};

	//Update status
	const updateProgress = (id) => {
		const updateProgress = { ...issue, progress: issue.progress };
		services.updateIssue(id, updateProgress);
	};

	//Update priority
	const updatePriority = (id) => {
		const updatePriority = { ...issue, priority: issue.priority };
		services.updateIssue(id, updatePriority);
	};
	//Update estimated
	const updateEstimated = (id) => {
		const updateEstimated = {
			...issue,
			estimated: Number(issue.estimated),
		};
		services.updateIssue(id, updateEstimated);
	};
	//Update estimated
	const updateTimeLog = (id) => {
		const updateTimeLog = { ...issue, timelog: Number(issue.timelog) };
		services.updateIssue(id, updateTimeLog);
	};

	console.log(issue);

	return (
		<>
			{issue && (
				<div className="single-issue-wrapper" key={issue.ID}>
					<div className="main-col">
						{/* Title */}
						<div className="input-wrapper">
							<input
								type="text"
								defaultValue={issue.title}
								onChange={(e) =>
									setIssue({
										...issue,
										title: e.target.value,
									})
								}
							/>
							<div className="icon description">
								<BiCheck onClick={updateTitle(issue.ID)} />
							</div>
						</div>
						{/* Image */}
						<div className="input-wrapper">
							<img
								style={{ width: "100%" }}
								src={`/uploads/${issue.imgid}`}
								alt={issue.title}
							/>
						</div>
						{/* Description */}
						<div className="input-wrapper">
							<b>Description</b>
							<textarea
								name="description"
								id="description"
								defaultValue={issue.description}
								onChange={(e) =>
									setIssue({
										...issue,
										description: e.target.value,
									})
								}
							/>
							<div className="icon">
								<BiCheck
									onClick={updateDescription(issue.ID)}
								/>
							</div>
						</div>
						{/* Comments */}
						<CommentsList issue={issue} issueId={issueId} />
					</div>
					<div className="side-col">
						<div className="copy-delete">
							{/* Copy url */}
							{document.queryCommandSupported("copy") && (
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
									deleteModal ? "delete-active" : ""
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
						{/* Status */}
						<div className="status">
							<h4 className="side-title">Status</h4>
							<div className="side-content side-btn">
								<div className="icon">
									<BiCheck
										onClick={updateProgress(issue.ID)}
									/>
								</div>
								<select
									name="status"
									id="status"
									defaultValue={issue.progress}
									onChange={(e) =>
										setIssue({
											...issue,
											progress: e.target.value,
										})
									}>
									{progressOptions.map((singleIssue) => (
										<option
											value={singleIssue.value}
											key={singleIssue.value}>
											{singleIssue.label}
										</option>
									))}
								</select>
							</div>
						</div>
						{/* Priority */}
						<div className="priority">
							<h4 className="side-title">Priority</h4>
							<div className="side-content side-btn">
								<div className="icon">
									<BiCheck
										onClick={updateProgress(issue.ID)}
									/>
								</div>
								<select
									name="status"
									id="status"
									defaultValue={issue.priority}
									onChange={(e) =>
										setIssue({
											...issue,
											priority: e.target.value,
										})
									}>
									{priorityOptions.map((singleIssue) => (
										<option
											value={singleIssue.value}
											key={singleIssue.value}>
											{singleIssue.label}
										</option>
									))}
								</select>
							</div>
						</div>
						{/* Estimated */}
						<div className="estimated">
							<h4 className="side-title">Estimated (Hours)</h4>
							<div className="side-content input-wrapper">
								<input
									type="text"
									defaultValue={issue.estimated}
									onChange={(e) =>
										setIssue({
											...issue,
											estimated: Number(e.target.value),
										})
									}
								/>
								<div className="icon">
									<BiCheck
										onClick={updateEstimated(issue.ID)}
									/>
								</div>
							</div>
						</div>
						{/* Log time modal */}
						{logTime ? (
							<div className="log-time-modal">
								<div className="title">
									<h3>
										<BiTimer /> Log Time
									</h3>
								</div>
								<div className="content">
									<input
										type="text"
										defaultValue={issue.timelog}
										onChange={(e) =>
											setIssue({
												...issue,
												timelog: Number(e.target.value),
											})
										}
									/>
									<div className="icon">
										<BiCheck
											onClick={updateTimeLog(issue.ID)}
										/>
									</div>
									<div className="buttons center">
										<button
											className="delete primary-btn"
											onClick={(e) => setLogTime(false)}>
											Done
										</button>
									</div>
								</div>
							</div>
						) : (
							""
						)}
						<div
							className={`time-tracking ${
								logTime ? "active-log" : ""
							}`}
							onClick={(e) => setLogTime(!logTime)}>
							<h4 className="side-title">Time tracking</h4>
							<div className="side-content">
								<div className="icon">
									<BiTimer />
								</div>
								<div className="hours">
									<div className="meter">
										<span
											className={`${
												issue.timelog > issue.estimated
													? "done"
													: ""
											}`}
											style={{
												width: `${
													(issue.timelog * 100) /
													issue.estimated
												}%`,
											}}></span>
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
