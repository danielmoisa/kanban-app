import React from 'react'

import { GoComment } from 'react-icons/go'

const IssuesResults = ({ userIssues }) => {
    return (
        <div className="search-issues">
            { userIssues && userIssues.length > 0 ?
                userIssues.map((issue) => (
                    <div className="single-issue" key={ issue.ID }>
                        <h4>{ issue.title }</h4>
                       <div className="comments center">
                           <GoComment />
                           <span className="comments-count">
                               { issue.Comments.length }
                           </span>
                       </div>
                    </div>
                ))
            :
                <p>No issues found.</p>
            }
        </div>
    )
}

export default IssuesResults
