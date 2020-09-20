import React from 'react'

import { GoComment } from 'react-icons/go'

const IssuesResults = ({ userIssues }) => {
    return (
        <div className="search-issues">
            { userIssues &&
                userIssues.map((issue) => (
                    <div className="single-issue" key={ issue.ID }>
                        <h4>{ issue.title }</h4>
                       
                    </div>
                ))
            }
        </div>
    )
}

export default IssuesResults
