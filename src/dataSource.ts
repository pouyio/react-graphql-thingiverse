import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

export default class ThingsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api.thingiverse.com/';
    }

    willSendRequest(request: RequestOptions) {
        request.headers.set('Authorization', this.context.token);
    }

    async getNewest() {
        return this.get('newest');
    }

    async getPopular() {
        return this.get('popular');
    }

    async getFeatured() {
        return this.get('featured');
    }

    async getThing(id: number) {
        return this.get(`things/${id}`);
    }
};