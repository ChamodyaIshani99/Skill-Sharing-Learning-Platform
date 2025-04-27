import axios from "axios";

const BASE_URL = "http://localhost:8081/api/learning-plans";

export const getAllPlans = () => axios.get(BASE_URL);
export const createPlan = (plan) => axios.post(BASE_URL, plan);
export const updatePlan = (id, plan) => axios.put(`${BASE_URL}/${id}`, plan);
export const deletePlan = (id) => axios.delete(`${BASE_URL}/${id}`);
export const getPlanById = (id) => axios.get(`${BASE_URL}/${id}`);
