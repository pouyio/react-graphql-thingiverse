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
        thing(root: any, { id }: any, { dataSources }): any[] {
            return dataSources.thingsAPI.getThing(id);
        },
    },
};

export default resolverMap;