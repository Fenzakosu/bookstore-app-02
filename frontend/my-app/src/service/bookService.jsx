import AxiosConfig from '../config/AxiosConfig';

const RESOURCE = "/api/books";

export async function getAllBooks() {
    const response = await AxiosConfig.get(RESOURCE);
    return response.data;
}

export async function getBookById(id) {
    const response = await AxiosConfig.get(`${RESOURCE}/${id}`);
    return response.data;
}

export async function createBook(bookData) {
    const response = await AxiosConfig.post(RESOURCE, bookData);
    return response.data;
}

export async function updateBook(id, bookData) {
    // The book object must include the ID to match the URL parameter
    const bookWithId = { ...bookData, id: parseInt(id) };
    const response = await AxiosConfig.put(`${RESOURCE}/${id}`, bookWithId);
    return response.data;
}

export async function deleteBook(id) {
    const response = await AxiosConfig.delete(`${RESOURCE}/${id}`);
    return response.data;
}
