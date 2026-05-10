import axios from 'axios'
import { reactive } from 'vue'

const API_URL = 'http://localhost:5000/api/auth'
const AUTH_KEY = 'internlink_auth'

const savedAuth = JSON.parse(localStorage.getItem(AUTH_KEY) || 'null')

export const authState = reactive({
  token: savedAuth?.token || '',
  user: savedAuth?.user || null
})

const persistAuth = (payload) => {
  authState.token = payload.token
  authState.user = payload.user
  localStorage.setItem(AUTH_KEY, JSON.stringify(payload))
}

export const clearAuth = () => {
  authState.token = ''
  authState.user = null
  localStorage.removeItem(AUTH_KEY)
}

export const authHeaders = () => ({
  Authorization: `Bearer ${authState.token}`
})

export const registerUser = async (form) => {
  const response = await axios.post(`${API_URL}/register`, form)
  persistAuth(response.data)
  return response.data
}

export const loginUser = async (form) => {
  const response = await axios.post(`${API_URL}/login`, form)
  persistAuth(response.data)
  return response.data
}

export const logoutUser = async () => {
  try {
    if (authState.token) {
      await axios.post(`${API_URL}/logout`, {}, { headers: authHeaders() })
    }
  } finally {
    clearAuth()
  }
}

export const requestPasswordReset = async (email) => {
  const response = await axios.post(`${API_URL}/forgot-password`, { email })
  return response.data
}

export const resetPassword = async ({ token, password }) => {
  const response = await axios.post(`${API_URL}/reset-password`, { token, password })
  return response.data
}

export const refreshCurrentUser = async () => {
  if (!authState.token) return null

  try {
    const response = await axios.get(`${API_URL}/me`, { headers: authHeaders() })
    authState.user = response.data.user
    localStorage.setItem(AUTH_KEY, JSON.stringify({
      token: authState.token,
      user: authState.user
    }))
    return authState.user
  } catch (err) {
    clearAuth()
    return null
  }
}
