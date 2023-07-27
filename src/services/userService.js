import axios from "../axios";
const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};

const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", {
    data: { id: userId },
  });
};

const editUserService = (putData) => {
  return axios.put("/api/edit-user", putData);
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const getDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctor = () => {
  return axios.get(`/api/get-all-doctor`);
};
const saveDetailDoctor = (data) => {
  return axios.post("/api/save-info-doctor", data);
};

const getDetailDoctor = (input) => {
  return axios.get(`/api/get-info-doctor?id=${input}`);
};
export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getDoctorHomeService,
  getAllDoctor,
  saveDetailDoctor,
  getDetailDoctor,
};
