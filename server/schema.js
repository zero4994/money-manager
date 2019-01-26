module.exports = {
    schema : 
    `
    scalar Date
    
    type User {
        user_id: Int
        first_name: String
        second_name: String
        sourname: String
        date_of_birth: Date
        password: String
    }
    type Query {
        Users: [User]
    }
    `
}