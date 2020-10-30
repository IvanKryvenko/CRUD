import http from '../http-common';

class PositionDataService {
    getAll() {
        return http.get('/positions');
    }

    get(id) {
        return http.get(`/positions/${id}`);
    }

    create(data) {
        return http.post('/positions', data);
    }

    update(id, data) {
        return http.put(`/positions/${id}`, data);
    }

    delete(id) {
        return http.delete(`/positions/${id}`);
    }

    deleteAll() {
        return http.delete(`/tutorials`);
    }
}

export default new PositionDataService();