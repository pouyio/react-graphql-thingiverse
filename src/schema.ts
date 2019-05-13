import 'graphql-import-node';
import schemaDefs from '../schema/schema';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolverMap';
import { GraphQLSchema } from 'graphql';
// no @types :(
const { transpileSchema } = require('graphql-s2s').graphqls2s;

const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs: [transpileSchema(schemaDefs)],
    resolvers,
});

export default schema;