import React from "react";
import { Link } from "react-router-dom";

import { GoComment } from "react-icons/go";

const IssuesResults = ({ userIssues, setIssuesModal }) => {
	return (
		<div className="search-issues">
			{userIssues && userIssues.length > 0 ? (
				userIssues.map((issue, index) => (
					<Link
						key={issue.ID}
						to={`/issue/${issue.ID}`}
						onClick={() => setIssuesModal(false)}>
						<div className="single-issue">
							<h4>{issue.title}</h4>
							<div className="comments center">
								<GoComment />
								<span className="comments-count">
									{issue.Comments.length}
								</span>
							</div>
						</div>
					</Link>
				))
			) : (
				<p>No issues found.</p>
			)}
		</div>
	);
};

export default IssuesResults;
