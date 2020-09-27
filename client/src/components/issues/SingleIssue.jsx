import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import services from './issues';

import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

import { Link } from "react-router-dom"

import './SingleIssue.scss'

import { BsLink45Deg, BsCheckAll } from 'react-icons/bs'
import { AiOutlineDelete } from 'react-icons/ai'

const SingleIssue = ({  match }) => {
    const [issue, setIssue] = useState();
    const {
        params: { issueId },
    } = match;
    const [deleteModal, setDeleteModal] = useState(false);
    const [notification, setNotification] = useState({content: null, type: null });

    //Copy page url
    const [copySuccess, setCopySuccess] = useState(false);
    const urlInputRef = useRef(null);

    //Fetching single issue
    useEffect (() => {
        const fetchData = async () => {
            const result = await axios (
                `http://localhost:8080/api/issues/${issueId}`
            );

            setIssue(result.data);
        };

        fetchData();
    }, [issueId]);

    //Copy page url
    const handleCopyUrl = (e) => {

        urlInputRef.current.select();
        document.execCommand('copy');

        setCopySuccess(true);
    }

    //Delete issue
    const deleteSingleIssue = (issueId) => {
        services.deleteIssue(issueId).then(response => {
            setIssue(issue.issueId !== issue.ID)
        });
        setNotification({ content: 'Issue successfully deleted.', type: 'success' });
        setTimeout(() => {
            setNotification({content: null})
          }, 3000);
    }

    return (
        <>
            { issue && (
                <div className="single-issue-wrapper">
                   <div className="main-col">
                   <textarea className="title" >{ issue.title }</textarea>
                        <div className="description">
                            <b>Description</b>
                            <textarea name="" id="" >{  issue.description }</textarea>
                            <div>
                        </div>
                    </div>
                    <div className="comments-wrapper">
                    { issue.Comments &&  issue.Comments.length > 0 ? <h4>Issue comments</h4> : <h4>Add first comment</h4> }
                    { issue.Comments.map((comment) => (
                            <p key={ comment.ID }>{ comment.content }</p>
                        ))
                    }
                    </div>
                   </div>
                   <div className="side-col">
                   
                     <div className="copy-delete">
                        {/* Copy url */}
                        { document.queryCommandSupported('copy') &&
                            <div className="copy-url" onClick={ handleCopyUrl }>
                            { copySuccess ?   
                            <div className="copy copied center side-btn"><BsCheckAll /> Url copied</div> : 
                            <div className="copy uncopied center side-btn"><BsLink45Deg />Copy url</div> 
                            }
                                <input type="text" ref={ urlInputRef } defaultValue={ window.location.href }/>
                                
                            </div>
                        }
                        {/* Delete issue */}
                       <div className="delete-issue center" onClick={ () => setDeleteModal(!deleteModal) }>
                                <AiOutlineDelete />
                            </div>
                            { deleteModal && 
                                <div className={`delete-issues-modal ${deleteModal ? 'delete-active': ''}`}>
                                    <h4>Are you sure you want to delete this issue?</h4>
                                    <div className="buttons center">
                                        <button className="cancel secondary-btn" onClick={ () => setDeleteModal(false) }>Cancel</button>
                                        <Link to="/" className="delete primary-btn" onClick={ () => deleteSingleIssue(issue.ID)}>Delete</Link>
                                    </div>
                                </div>
                            }
                       </div>
                      
                        <div className="status">
                            <h4 className="side-title">Status</h4>
                            <div className="side-content side-btn">{ issue.progress }</div>
                        </div>
                        <div className="priority">
                            <h4 className="side-title">Priority</h4>
                            <div className="side-content side-btn">{ issue.priority }</div>
                        </div>
                        <div className="estimated">
                            <h4 className="side-title">Estimated</h4>
                            <div className="side-content">{ issue.estimated }</div>
                        </div>
                   </div>
                </div>
            )

            }
        </>
    )
}

export default SingleIssue
