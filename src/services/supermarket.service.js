import http from "./http-common";

class SupermarketDataService{
    getAll() {
        return http.get("/supermarkets");
    }

    get(id) {
        return http.get(`/supermarkets/${id}`);
    }

    create(data) {
        return http.post("/supermarkets", data);
    }

    update(id, data) {
        return http.put(`/supermarkets/${id}`, data);
    }

    delete(id) {
        return http.delete(`/supermarkets/${id}`);
    }

    deleteAll() {
        return http.delete(`/supermarkets`);
    }

    findByName(name) {
        return http.get(`/supermarkets?name=${name}`);
    }

    findByBairro(bairro) {
        return http.get(`/supermarkets?bairro=${bairro}`);
    }

    findByCity(city) {
        return http.get(`/supermarkets?city=${city}`);
    }

}

export default new SupermarketDataService();