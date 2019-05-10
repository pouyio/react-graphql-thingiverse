import { IResolvers } from 'graphql-tools';

const resolverMap: IResolvers = {
    Query: {
        newest(root: any, args: any, { dataSources }): any[] {
            return dataSources.thingsAPI.getNewest();
        },
        popular(root: any, args: any, { dataSources }): any[] {
            return dataSources.thingsAPI.getPopular();
        },
        featured(root: any, args: any, { dataSources }): any[] {
            return dataSources.thingsAPI.getFeatured();
        },
    },
};

export default resolverMap;