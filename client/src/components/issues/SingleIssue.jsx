import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

import { Link } from "react-router-dom"

import './SingleIssue.scss'

import { BsLink45Deg, BsCheckAll } from 'react-icons/bs'

const SingleIssue = ({ match }) => {
    const [issue, setIssue] = useState();
    const {
        params: { issueId },
    } = match;

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
                    { issue.Comments.length > 0 ? <h4>Issue comments</h4> : <h4>Add first comment</h4> }
                    { issue.Comments.map((comment) => (
                            <p key={ comment.ID }>{ comment.content }</p>
                        ))
                    }
                    </div>
                   </div>
                   <div className="side-col">
                       { document.queryCommandSupported('copy') &&
                        <div className="copy-url" onClick={ handleCopyUrl }>
                           { copySuccess ?   
                           <div className="copy copied center side-btn"><BsCheckAll /> Url copied</div> : 
                           <div className="copy uncopied center side-btn"><BsLink45Deg />Copy issue url</div> 
                        }
                            <input type="text" ref={ urlInputRef } defaultValue={ window.location.href }/>
                        </div>
                       }
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
