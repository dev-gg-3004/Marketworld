import axios from "axios";
import { NewsUrl , BaseUrl } from "@env";

export const loginUserApi = async (userName) =>
  await axios.get(
  `${BaseUrl}/members?userName=${userName}`
);
export const memberDetailsApi = async () =>
  await axios.get(
  `${BaseUrl}/members`
);
export const UpdateMembersDataAPI = async (value) =>
  await axios.put(
  `${BaseUrl}/members/${value.userid}`,value
);
export const singleMemberDetailsApi = async (value) =>
  await axios.get(
  `${BaseUrl}/members/${value}`
);
export const memberAddIntoAPI = async (value) =>
  await axios.post(
  `${BaseUrl}/members`,value
);

export const NewsApiData = async () =>
  await axios.get(
  `${NewsUrl}`
);

export const stockApiData = async () =>
  await axios.get(
  `${BaseUrl}/stocks`
);

export const stockAddIntoAPI = async (value) =>
  await axios.post(
  `${BaseUrl}/stocks`,value
);

export const stockUpdateIntoAPI = async (value) =>
  await axios.put(
  `${BaseUrl}/stocks/${value.id}`,value
);

export const stockRemoveFromAPI = async (value) =>
  await axios.delete(
  `${BaseUrl}/stocks/${value.id}`
);

export const watchListApiData = async () =>
  await axios.get(
  `${BaseUrl}/watchlist`
);

const api = `http://rhapi.v2stech.com/sample-service/form-config/applicant/field?section=Additional Details&page-index=1&enabled-on=`

export const dataByToken = async (token) =>
await axios.get(api, { headers: {"Authorization" : `Bearer ${token}`} })