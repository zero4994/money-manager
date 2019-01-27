module.exports = {
  schema: `
    scalar Date
    
    type User {
        user_id: Int
        first_name: String
        second_name: String
        sourname: String
        date_of_birth: Date
        password: String
    }

    type Account {
        acc_num : Int
        user_id : Int
        acc_type: Int
        amount_available : Float
        max_amount_deposit : Float
    }

    type Transaction {
        id: Int
        acc_num: Int
        amount: Float
        type: Int
        executed_at: Date
    }

    input TransactionInput {
        amount: Float
        type: Int
    }

    type Query {
        Users: [User]
        LoginUser(username:String!, password: String!) : User
        AccountInfo(userId: Int!) : Account
        TransactionsByUser(userId: Int!): [Transaction]
    }

    type Mutation {
        NewTransaction(userId: Int!, transaction: TransactionInput!) : Transaction
    }
    `
};
