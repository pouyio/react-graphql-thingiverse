import { IResolvers } from 'graphql-tools';

const resolverMap: IResolvers = {
    Query: {
        newest(root, args, { dataSources }) {
            return dataSources.thingsAPI.getNewest();
        },
        popular(root, args, { dataSources }) {
            return dataSources.thingsAPI.getPopular();
        },
        featured(root, args, { dataSources }) {
            return dataSources.thingsAPI.getFeatured();
        },
        thing(root, { id }, { dataSources }) {
            return dataSources.thingsAPI.getThing(id);
        },
    },
};

export default resolverMap;