import axios from 'axios'

const url = 'http://127.0.0.1:8080/api/issues'

const getIssues = () => {
    return axios.get(url)
}

const addIssue = (newIssue) => {
    return axios.post(url, newIssue)
}

const deleteIssue = (issueId) => {
    const request = axios.delete(`${url}/${issueId}`);
    return request.then(response => response.data)
}

export default { getIssues, addIssue, deleteIssue }