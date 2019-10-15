import RestfulProvider from '../globals/restfulProvider/RestfulProvider';

const ORGANIZATION = '874733856693605';

export const getDesignations = (body) => {
	return RestfulProvider.get(`organization/designation/designations/pagination/${ORGANIZATION}`);
};

export const getRoles = (body) => {
	return RestfulProvider.get(`role/roles/pagination`);
};

export const getBranches = (body) => {
	return RestfulProvider.get(`organization/branch/branches/pagination/${ORGANIZATION}`);
};

export const getDepartments = (body) => {
	return RestfulProvider.get(`organization/department/departments/pagination/${ORGANIZATION}`);
};

export const getUsers = (body) => {
	return RestfulProvider.get(`user/users/${ORGANIZATION}`);
};

export const getUser = (id) => {
	return RestfulProvider.get(`user/get/${id}`);
};

export const registerUser = (body) => {
	return RestfulProvider.post(`user/register`, body);
};

export const updateUser = (body) => {
	return RestfulProvider.put(`user/update`, body);
};

export default { getDesignations, getRoles, getBranches, getDepartments, getUsers, getUser, registerUser, updateUser }