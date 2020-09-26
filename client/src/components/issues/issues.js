import axios from 'axios'

const url = 'http://127.0.0.1:8080/api/issues'

const getIssues = () => {
    return axios.get(url)
}

const addIssue = (newIssue) => {
    return axios.post(url, newIssue)
}

export default { getIssues, addIssue }