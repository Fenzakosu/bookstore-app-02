import AxiosConfig from "../config/AxiosConfig";

const RESOURCE = "/api/authors";

export async function getAllAuthors() {
    const response = await AxiosConfig.get(RESOURCE);
    return response.data;
}

export async function getAuthorById(id) {
    const response = await AxiosConfig.get(`${RESOURCE}/${id}`);
    return response.data;
}
