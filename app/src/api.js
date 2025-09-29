import axios from 'axios';
const API_BASE = (import.meta.env.VITE_API_BASE || 'http://localhost:4000') +'/api';
const token = localStorage.getItem('token');
const config = { headers: { Authorization: `Bearer ${token}` } };


export const registerUser = (data) => axios.post(`${API_BASE}/auth/register`, data);
export const loginUser = (data) => axios.post(`${API_BASE}/auth/login`, data);
export const uploadQuestions = (data) => axios.post(`${API_BASE}/upload-questions`, data, config);
export const getQuestionsByDate = (date) => axios.get(`${API_BASE}/get-questions?date=${date}`, config);
export const getAllQuestions = () => axios.get(`${API_BASE}/get-all-questions`, config);
export const submitQuiz = (data) => axios.post(`${API_BASE}/submit-quiz`, data, config);
export const getDashboard = () => axios.get(`${API_BASE}/dashboard`, config);

// Subject
export const createSubject = (data) => axios.post(`${API_BASE}/study/subjects`, data,config);
export const getSubjects = () => axios.get(`${API_BASE}/study/subjects`,config);

// Topic API
export const createTopic = (data) => axios.post(`${API_BASE}/study/topics`, data,config);
export const getTopicsBySubject = (subjectId) => axios.get(`${API_BASE}/study/topics/${subjectId}`,config);
export const getSingleTopic = (id) => axios.get(`${API_BASE}/study/topic/${id}`,config);
export const updateTopic = (id, data) => axios.put(`${API_BASE}/study/topic/${id}`, data,config);
export const deleteTopic = (id) => axios.delete(`${API_BASE}/study/topic/${id}`,config);



