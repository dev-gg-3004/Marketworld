import axios from "axios";

export const BaseUrl="https://63491dba0b382d796c7dea90.mockapi.io"
export const NewsUrl="https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=b8d4e733d9494a8ba1bf1cdee93cb975"


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