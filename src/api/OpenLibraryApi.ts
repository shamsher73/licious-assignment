import axios from 'axios';

const BASE_URL = 'https://openlibrary.org';

const getBooks = async () => {
    const response = await axios.get(`${BASE_URL}/subjects/sci-fi.json?details=true`);
    return response.data.works;
};

const searchBooks = async (query: string) => {
    const response = await axios.get(`${BASE_URL}/search.json?q=${query}&page=1&limit=10`);
    return response.data.docs;
};

export { getBooks, searchBooks };