const { MongoClient } = require('mongodb')

let dbConnection
const dbUser = process.env.DB__USERNAME
const dbPassword = process.env.DB__PASSWORD

module.exports = {
  connectToDb: (callback) => {
    MongoClient.connect(`mongodb://${dbUser}:${dbPassword}@localhost:27017/?authMechanism=DEFAULT`)
      .then((client) => {
        dbConnection = client.db("bookstore")
        return callback()
      })
      .catch(err => {
        console.log(err)
        return callback(err)
      })
  },
  getDb: () => dbConnection

}