import axios from "axios";

const url = "/api/issues";

const getIssues = () => {
	return axios.get(url);
};

const addIssue = (newIssue) => {
	return axios.post(url, newIssue);
};

const deleteIssue = (issueId) => {
	const request = axios.delete(`${url}/${issueId}`);
	return request.then((response) => response.data);
};

const updateIssue = (id, newUpdatedIssue) => {
	const request = axios.patch(`${url}/${id}`, newUpdatedIssue);
	return request.then((response) => response.data);
};

export default { getIssues, addIssue, deleteIssue, updateIssue };
