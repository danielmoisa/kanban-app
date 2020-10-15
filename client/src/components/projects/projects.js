import axios from 'axios'

const url = 'http://127.0.0.1:8080/api/projects'

const getProjects = () => {
    return axios.get(url)
}

const addProject = (newProject) => {
    return axios.post(url, newProject)
}

const deleteProject = (ProjectId) => {
    const request = axios.delete(`${url}/${ProjectId}`);
    return request.then(response => response.data)
}

const updateProject = (id, newUpdatedProject) => {
    const request = axios.patch(`${url}/${id}`, newUpdatedProject)
    return request.then( response => response.data)
}

export default { getProjects, addProject, deleteProject, updateProject }