import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

export default class ThingsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api.thingiverse.com/';
    }

    willSendRequest(request: RequestOptions) {
        request.headers.set('Authorization', this.context.token);
    }

    getNewest() {
        return this.get('newest');
    }

    getPopular() {
        return this.get('popular');
    }

    getFeatured() {
        return this.get('featured');
    }

    getThing(id: number) {
        return this.get(`things/${id}`);
    }
};