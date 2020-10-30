import axios from "axios";

const url = "/api/comments";

const getComments = () => {
	return axios.get(url);
};

const addComment = (newComment) => {
	return axios.post(url, newComment);
};

const deleteComment = (commentId) => {
	const request = axios.delete(`${url}/${commentId}`);
	return request.then((response) => response.data);
};

const updateComment = (id, newUpdatedComment) => {
	const request = axios.patch(`${url}/${id}`, newUpdatedComment);
	return request.then((response) => response.data);
};

export default { getComments, addComment, deleteComment, updateComment };
