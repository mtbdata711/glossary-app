import { MongoClient } from "mongodb";


const dbUrl = process.env.MONGODB_URI || "mongodb+srv://matthew:fbG5tXg7G82ILJWX@cluster0-mimde.mongodb.net";
const configuration = { useNewUrlParser: true };

export const getClient = () => new MongoClient(dbUrl, configuration);
