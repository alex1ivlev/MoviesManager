import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:8000/api',
})

api.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    if (token !== null ) {
        config.headers.Authorization = "Bearer " + token;
    }

    return config;
});

export const login = payload => api.post(`/users/login`, payload)
export const addMovie = payload => api.post(`/movies`, payload)
export const getAllMovies = () => api.get(`/movies`)
export const updateMovieById = (id, payload) => api.put(`/movies/${id}`, payload)
export const deleteMovieById = id => api.delete(`/movies/${id}`)
export const getMovieById = id => api.get(`/movies/${id}`)
export const getAllMembers = () => api.get(`/members`)
export const updateMemberById = (id, payload) => api.put(`/members/${id}`, payload)
export const deleteMemberById = id => api.delete(`/members/${id}`)
export const getMemberById = id => api.get(`/members/${id}`)
export const addMember = payload => api.post(`/members`, payload)
export const addMovieToMember = (member_id, movie_id) => api.post(`/members/${member_id}/movies/${movie_id}`)



const apis = {
    login,
    addMovie,
    getAllMovies,
    updateMovieById,
    deleteMovieById,
    getMovieById,
    getAllMembers,
    updateMemberById,
    deleteMemberById,
    addMember,
    addMovieToMember
}

export default apis;
