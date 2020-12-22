import http from "./http-common";

    const getAll = () => {
        return http.get("/lists");
    }

    const get = id => {
        return http.get(`/lists/${id}`);
    }

    const create = data => {
        return http.post("/lists", data);
    }

    const update = (id, data) => {
        return http.put(`/lists/${id}`, data);
    }

    const remove = id => {
        return http.delete(`/lists/${id}`);
    }


export default {
    getAll,
    get,
    create,
    update,
    remove
}