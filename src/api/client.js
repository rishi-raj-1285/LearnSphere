const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const TOKEN_KEY = 'learnsphere_token';

export function getStoredToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setStoredToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

async function parseJsonResponse(response) {
  const text = await response.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }
  return data;
}

export async function apiRequest(path, options = {}) {
  const headers = { ...(options.headers || {}) };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  }

  const token = getStoredToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  const data = await parseJsonResponse(response);

  if (response.status === 401) {
    setStoredToken(null);
    const err = new Error(data?.message || 'Authentication required');
    err.status = 401;
    throw err;
  }

  if (!response.ok) {
    const err = new Error(data?.message || `Request failed (${response.status})`);
    err.status = response.status;
    err.details = data?.details;
    throw err;
  }

  return data;
}

export const authApi = {
  register: (payload) => apiRequest('/api/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => apiRequest('/api/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  me: () => apiRequest('/api/auth/me')
};

export const userApi = {
  getProfile: () => apiRequest('/api/users/me'),
  updateProfile: (payload) => apiRequest('/api/users/me', { method: 'PATCH', body: JSON.stringify(payload) }),
  updatePreferences: (payload) =>
    apiRequest('/api/users/me/preferences', { method: 'PATCH', body: JSON.stringify(payload) }),
  updateSubjects: (payload) =>
    apiRequest('/api/users/me/subjects', { method: 'PATCH', body: JSON.stringify(payload) })
};

export const documentsApi = {
  list: (page = 1) => apiRequest(`/api/documents?page=${page}`),
  get: (id) => apiRequest(`/api/documents/${id}`),
  fileUrl: (id) => `${API_BASE}/api/documents/${id}/file`,
  upload: (file, subject, title) => {
    const form = new FormData();
    form.append('file', file);
    if (subject) form.append('subject', subject);
    if (title) form.append('title', title);
    return apiRequest('/api/documents/upload', { method: 'POST', body: form });
  },
  remove: (id) => apiRequest(`/api/documents/${id}`, { method: 'DELETE' })
};

export const conversationsApi = {
  list: () => apiRequest('/api/conversations'),
  create: (payload) => apiRequest('/api/conversations', { method: 'POST', body: JSON.stringify(payload) }),
  addMessage: (id, payload) =>
    apiRequest(`/api/conversations/${id}/messages`, { method: 'POST', body: JSON.stringify(payload) }),
  remove: (id) => apiRequest(`/api/conversations/${id}`, { method: 'DELETE' }),
  update: (id, payload) =>
    apiRequest(`/api/conversations/${id}`, { method: 'PATCH', body: JSON.stringify(payload) })
};

export const focusSessionsApi = {
  list: (page = 1) => apiRequest(`/api/focus-sessions?page=${page}`),
  create: (payload) => apiRequest('/api/focus-sessions', { method: 'POST', body: JSON.stringify(payload) }),
  complete: (id, payload) =>
    apiRequest(`/api/focus-sessions/${id}`, { method: 'PATCH', body: JSON.stringify(payload) })
};

export const progressApi = {
  list: (page = 1) => apiRequest(`/api/progress?page=${page}`),
  create: (payload) => apiRequest('/api/progress', { method: 'POST', body: JSON.stringify(payload) }),
  update: (id, payload) => apiRequest(`/api/progress/${id}`, { method: 'PATCH', body: JSON.stringify(payload) })
};

export const studyPlansApi = {
  list: (page = 1) => apiRequest(`/api/study-plans?page=${page}`),
  get: (id) => apiRequest(`/api/study-plans/${id}`),
  create: (payload) => apiRequest('/api/study-plans', { method: 'POST', body: JSON.stringify(payload) }),
  update: (id, payload) => apiRequest(`/api/study-plans/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),
  remove: (id) => apiRequest(`/api/study-plans/${id}`, { method: 'DELETE' }),
  updateTask: (id, taskId, payload) => apiRequest(`/api/study-plans/${id}/tasks/${taskId}`, { method: 'PATCH', body: JSON.stringify(payload) })
};

export async function checkApiHealth() {
  try {
    const res = await fetch(`${API_BASE}/api/health`);
    return res.json();
  } catch {
    return { success: false, api: 'unreachable' };
  }
}
