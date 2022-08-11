import axios from 'axios'

const api = axios.create({
    baseURL: 'https://todo.api.devcode.gethired.id',
    headers: {
        "Content-type": "application/json"
    }
});

const activityUrl = '/activity-groups'
const todoUrl = '/todo-items'

const getActivity = async (params) => await api.get(activityUrl + `?email=${params}`)
const getActivityDetail = async (params) => await api.get(activityUrl + `/${params}`)
const createActivity = async (params) => await api.post(activityUrl, params)
const updateActivity = async (id, params) => await api.patch(activityUrl + `/${id}`, params)
const deleteActivity = async (id) => await api.delete(activityUrl + `/${id}`)

const createTodo = async (params) => await api.post(todoUrl, params)
const updateTodo = async ({id, params}) => await api.patch(todoUrl + `/${id}`, params)
const deleteTodo = async (id) => await api.delete(todoUrl + `/${id}`)

export {
    getActivity,
    getActivityDetail,
    createActivity,
    updateActivity,
    deleteActivity,
    createTodo,
    updateTodo,
    deleteTodo
}