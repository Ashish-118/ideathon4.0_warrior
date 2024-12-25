import { Client, Account } from "appwrite"

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('676c206a00127c4136f0')

const account = new Account(client)

export { account, client }