import React, { useState, useEffect } from 'react';

import axios from 'axios';

import services from './comments';

//Notification box
import { toast } from "react-toastify";

//Icons
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

const CommentsList = ({ issue, issueId }) => {
    const [comment, setComment] = useState([]);
    const [existingComments, setExistingComments] = useState('');

    //Fetching single issue comments
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(
				`http://localhost:8080/api/comments`
			);

			setExistingComments(result.data);
		};

        fetchData();
	}, [issueId]);

    //Add new comment
    const addNewComment = e => {
        e.preventDefault()

        if(comment !== "" && comment.length > 5) {
          const newComment = {
            content: comment,
            IssueID: issue.ID
          }
          services.addComment(newComment).then(response => {
            setComment(issue.Comments.push(response.data))
            setComment("");
          })
          toast.success("Comment successfully added!");
        } else {
            toast.error("Add at least 6 characters!");
        }

    }

    //Close add comment
    const closeAddComment = () => {
        setComment('')
    }

    //Delete comment
    const deleteSingleComment = (commentId) => {
        // const commentToDelete = existingComments.find(comment => comment.id === commentId)

        services.deleteComment(commentId)

		toast.success('Comment successfully deleted');
	};

    return (
        <>
            <div className="comments-wrapper">
                {issue.Comments && issue.Comments.length > 0 ? (
                    <h4>Issue comments</h4>
                ) : (
                    <h4>Add first comment</h4>
                )}
                <div className="add-comment-input">
                    <textarea name="content" placeholder="Add new comment..." 
                        value={comment} 
                        onChange={ e => setComment(e.target.value) }
                    />
                    { comment.length > 0 ?
                        <div className="buttons">
                            <button className="secondary-btn" onClick={ closeAddComment}>Cancel</button>
                            <button className="primary-btn" onClick={addNewComment}>Add</button>
                        </div>
                    :
                    ''
                    }
                </div>
                {issue.Comments && issue.Comments.map((singleComment) => (
                    <div className="single-comment" key={singleComment.ID}>
                      <div className="left">
                        <div className="author">
                                <h5>John Doe</h5>
                                <span>3 days ago</span>
                            </div>
                            <p>{singleComment.content}</p>
                        </div>
                        <div className="right">
                            <AiOutlineDelete onClick={deleteSingleComment}/>
                            <AiOutlineEdit />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default CommentsList
