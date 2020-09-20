import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Link } from "react-router-dom"

import './SingleIssue.scss'

const SingleIssue = ({ match }) => {
    const [issue, setIssue] = useState();
    const {
        params: { issueId },
    } = match;

    useEffect (() => {
        const fetchData = async () => {
            const result = await axios (
                `http://localhost:8080/api/issues/${issueId}`
            );

            setIssue(result.data);
        };

        fetchData();
    }, [issueId]);

    return (
        <>
            { issue && (
                <div className="single-issue-wrapper">
                    <h2>{ issue.title }</h2>
                    <p>{ issue.description }</p>
                </div>
            )

            }
        </>
    )
}

export default SingleIssue
