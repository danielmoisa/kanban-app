import React, { useState, useEffect } from "react";

import axios from "axios";

import services from "./comments";

//Notification box
import { toast } from "react-toastify";

//Icons
import { AiOutlineDelete } from "react-icons/ai";

const CommentsList = ({ issue, issueId }) => {
	const [comment, setComment] = useState("");
	const [existingComments, setExistingComments] = useState("");

	//Fetching single issue comments
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`/api/issues/${issueId}`);

			setExistingComments(result.data.Comments);
		};

		fetchData();
	}, [issueId]);

	//Add new comment
	const addNewComment = (e) => {
		e.preventDefault();

		if (comment !== "" && comment.length > 5) {
			const newComment = {
				content: comment,
				IssueID: issue.ID,
			};
			services.addComment(newComment).then((response) => {
				setExistingComments(existingComments.concat(response.data));
				setComment("");
			});
			toast.success("Comment successfully added!");
		} else {
			toast.error("Add at least 6 characters!");
		}
	};

	//Close add comment
	const closeAddComment = () => {
		setComment("");
	};

	//Delete comment
	const deleteSingleComment = (commentId) => {
		services.deleteComment(commentId).then((response) => {
			const updatedCommentsList = existingComments.filter(
				(comment) => comment.ID !== commentId
			);
			setExistingComments(updatedCommentsList);
		});
		toast.success("Comment successfully deleted");
	};

	return (
		<>
			<div className="comments-wrapper">
				<h4>Issue comments</h4>
				<div className="add-comment-input">
					<textarea
						name="content"
						placeholder="Add new comment..."
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>
					{comment.length > 0 ? (
						<div className="buttons">
							<button
								className="secondary-btn"
								onClick={closeAddComment}>
								Cancel
							</button>
							<button
								className="primary-btn"
								onClick={addNewComment}>
								Add
							</button>
						</div>
					) : (
						""
					)}
				</div>
				{existingComments &&
					existingComments.map((singleComment) => (
						<div className="single-comment" key={singleComment.ID}>
							<div className="left">
								<div className="author">
									<h5>John Doe</h5>
									<span>3 days ago</span>
								</div>

								<p>{singleComment.content}</p>
							</div>
							<div className="right">
								<AiOutlineDelete
									className="delete"
									onClick={() =>
										deleteSingleComment(singleComment.ID)
									}
								/>
							</div>
						</div>
					))}
			</div>
		</>
	);
};

export default CommentsList;
