export const resolvers = {
    Query: {
    Test:()=>{
        return "success"
    },
    User:(parent, {userId}, context, info) =>{
        console.log(userId);
        if(userId == 1){
            return mock;
        }
        return null;
        // return{message: "could not find user under this ID"}; 
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