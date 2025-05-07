export const getListAnime = async (page = 0, query = "") => {
  const response = await fetch(
    // eslint-disable-next-line no-undef
    `${process.env.REACT_APP_API_BASE_URL}/anime?q=${query}&page=${page}&limit=24`
  );
  return await response.json();
};

export const getAnimeDetail = async (query = "") => {
  const response = await fetch(
    // eslint-disable-next-line no-undef
    `${process.env.REACT_APP_API_BASE_URL}/anime/${query}`
  );
  return await response.json();
};
