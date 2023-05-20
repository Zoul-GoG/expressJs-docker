const graphql = require('graphql');
const User = require('../models/userModel');

const {
    // graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLFloat,
} = graphql


const UserType = new GraphQLObjectType({
    name : 'user',
    fields : () => ({
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        created_at: { type: GraphQLString },
        updated_at: { type: GraphQLString },
    })
})

const userQuery = new GraphQLObjectType({
    name : 'userQueryType',
    fields : {
        users : {
            type : new GraphQLList(UserType),
            args : {name: {type: GraphQLString}},
            resolve(parent, args) {
                return User.find({name: args.name})
            }
        }
    }
})


var schema = new GraphQLSchema({
    query: userQuery
});

// var schema = new GraphQLSchema({
//     query: new GraphQLObjectType({
//         name: 'RootQueryType',
//         fields: {
//             hello: {
//                 type: GraphQLString,
//                 resolve() {
//                 return 'Hello API';
//                 },
//             },
//         },
//     })
// });
module.exports = schema;