import {MongoClient, ServerApiVersion} from "mongodb";
import * as fs from 'fs'

type InitialData={
  collection:string,
  data:any[]
}[]

const url = `mongodb://root:example@mongocandidate:27017?authSource=admin`;
//connection string should be added
export const MongoDBClient = new MongoClient(url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
export const connectDB=async()=>{
    try{
      const connection= await MongoDBClient.connect();
      console.log("Connected succesfully!!!!")
      return connection
    }catch(err){
      console.log('error connecting to DB')
      process.exit(1)
    }
}


