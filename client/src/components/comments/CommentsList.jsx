import React, { useState, useEffect } from 'react';

import axios from 'axios';

import services from './comments';

//Notification box
import { toast } from "react-toastify";

//Icons
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import comments from './comments';

const CommentsList = ({ issue, issueId }) => {
    const [comment, setComment] = useState('');
    const [existingComments, setExistingComments] = useState('');
    const [activeEdit, setActiveEdit] = useState(true);

    //Fetching single issue comments
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(
				`http://localhost:8080/api/issues/${issueId}`
			);

			setExistingComments(result.data.Comments);
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
            setExistingComments(existingComments.concat(response.data))
            setComment("")
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
        
        services.deleteComment(commentId).then(response => {
            const updatedCommentsList = issue.Comments.filter(comment => comment.ID !== commentId)
            setExistingComments(updatedCommentsList);
          })
		toast.success('Comment successfully deleted');
    };
    
    //Enable edit mode
    const enableEdit = (commentId) => {
        setActiveEdit(!activeEdit);
        
    }

    //Edit comment
    const updateSingleComment = (id) => {
        const updateContent = {...existingComments, content: existingComments.content};
        services.updateComment(id, updateSingleComment);
    }

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
                            <button className="secondary-btn" onClick={closeAddComment}>Cancel</button>
                            <button className="primary-btn" onClick={addNewComment}>Add</button>
                        </div>
                    :
                    ''
                    }
                </div>
                {existingComments && existingComments.map((singleComment) => (
                    <div className="single-comment" key={singleComment.ID}>
                      <div className="left">
                        <div className="author">
                                <h5>John Doe</h5>
                                <span>3 days ago</span>
                            </div>
                           { activeEdit ? 
                            <div>
                                <textarea defaultValue={singleComment.content} autoFocus 
                                    onChange={ (e) => setExistingComments({
                                        ...existingComments,
                                        content: e.target.value
                                    }) }
                                />
                                <a onClick={updateSingleComment(singleComment.ID)}></a>
                                </div>
                             :
                                <p>{singleComment.content}</p>
                            }
                        </div>
                        <div className="right">
                            <AiOutlineDelete className="delete" onClick={ () => deleteSingleComment(singleComment.ID) }/>
                            <AiOutlineEdit className="edit" />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default CommentsList
