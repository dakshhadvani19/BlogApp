import config from '../Config/config';
import { Client, ID, Databases , Storage , Query } from 'appwrite';

export class Service{
  client = new Client();
  databases;
  storage;

  constructor(){
    this.client
    .setEndpoint(config.appwriteUrl)
    .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({title , slug , content , featuredImage , status , userId}){
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        ID.unique(),
        // also can use "unique" method to give unique ids
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      )
    } catch (error) {
      console.log("Appwrite service :: createPost :: error " , error);
    }
  }
  
  async updatePost(slug ,{title , content , featuredImage , status}){
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status
        }
      )
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error " , error);
    }
  }
  
  async deletePost(slug){
    try {
        await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      )
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error " , error);
      return false;
    }
  }
  
  async getPost(slug){
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      )
    } catch (error) {
      console.log("Appwrite service :: getPost :: error " , error);
      return false;
    }
  }
  
  async getPosts(queries = [Query.equal("status" , "active")]){
    // this function will get only active posts
    // arguement in the function will filter that only "active" status posts being showed on page
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries,
        // i could also write that "queries" loigc in the return statement inside "[]" .
      )
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error " , error);
      return false;
    }    
  }
  
  // File upload services
  async uploadFile(file){
    try {
      return await this.storage.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      )
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error " , error);
      return false;
    }
  }
  
  async deleteFile(fileId){
    try {
      return await this.storage.deleteFile(
        config.appwriteBucketId,
        fileId,
      )
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error " , error);
      return false;
    }
  }

  getFileview(fileId){
    return this.storage.getFileView(
      config.appwriteBucketId,
      fileId
    )
  }

  downloadFile(fileId) {
    try {
      return this.storage.getFileDownload(
          config.appwriteBucketId,
          fileId
      );
    } catch (error) {
        console.log("Appwrite service :: downloadFile :: error ", error);
        return false;
    }
  }
}
const service = new Service();
export default service;