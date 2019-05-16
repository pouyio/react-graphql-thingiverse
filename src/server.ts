require('dotenv').config();
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';
import { parse } from 'query-string';
import schema from './schema';
import ThingsAPI from './dataSource';

const PORT = 3000;
const app = express();

const server = new ApolloServer({
    schema,
    context: ({ req }) => {
        const token = req.headers.authorization;
        return { token };
    },
    dataSources: () => ({ thingsAPI: new ThingsAPI() })
});

app.use('*', cors());
app.use(compression());
app.use(bodyParser.json());

app.post('/auth', (req, res) => {
    axios.request({
        method: 'POST',
        url: 'https://www.thingiverse.com/login/oauth/access_token',
        params: {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code: req.body.code,
        }
    }).then(r => res.json(parse(r.data)))
        .catch(err => res.send('there was an error'));
});

server.applyMiddleware({ app, path: '/graphql' });

createServer(app).listen({ port: PORT }, () => console.log(`server running on port ${PORT}`));