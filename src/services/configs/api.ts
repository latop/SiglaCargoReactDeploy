import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  const { accessToken } = JSON.parse(
    localStorage.getItem("@pepsico:user") || "{}",
  );

  if (accessToken) {
    config.headers;
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use((response) => {
  if (response.headers["x-pagination"]) {
    const pagination = JSON.parse(response.headers["x-pagination"]);
    const normalizeData = {
      currentPage: pagination.CurrentPage || 1,
      hasNext: pagination.HasNext,
      hasPrevious: pagination.HasPrevious,
      pageSize: pagination.PageSize,
      totalPages: pagination.TotalPages,
      data: response.data,
      totalCount: pagination.TotalCount,
    };
    response.data = normalizeData;
  }

  return response;
});

api.interceptors.response.use((response) => {
  if (response.status === 401) {
    localStorage.removeItem("@pepsico:user");
    window.location.href = "/";
  }
  return response;
});

export default api;
