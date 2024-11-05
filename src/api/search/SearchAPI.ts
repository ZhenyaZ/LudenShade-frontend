/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

type SearchAPI = {
  search: string;
  setSearchResults: (data: any) => void;
};

export default async function Search({ search, setSearchResults }: SearchAPI) {
  axios
    .get(import.meta.env.VITE_SEARCH_USER_URI, {
      withCredentials: true,
      params: { search },
    })
    .then((res) => setSearchResults(res.data))
    .catch((err) => setSearchResults(err.response.data));
}
