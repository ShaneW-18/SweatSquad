import {Database_lookup } from './userdata.js'
const connection = new Database_lookup();
export const resolvers = {
    Query: {
    Test:()=>{
        return "success"
    },
    User:(parent, {id}, context, info) =>{
        return connection.getUser(id);
    }
    }
}
const mock = {
    id: 1,
    username: 'Shane',
    password: 'Wiles',
    age: 22,
    email: 'swiles201@gmail.com',
    description: "sfd",
    following: null
}