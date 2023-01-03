import { MongoClient, ObjectID } from "mongodb";

let url = "mongodb+srv://test:test@noderest.0jirv.mongodb.net";

export class CrudManager {
  public static async create(inputObj: any) {
    try {
      const client = await MongoClient.connect(url);
      const db = client.db("todo");
      await db.collection("items").insertOne(inputObj);
      client.close();

      return { opr: true };
    } catch (error) {
      return { opr: false };
    }
  }

  public static async read() {
    try {
      const client = await MongoClient.connect(url);
      const db = client.db("todo");
      const output = await db
        .collection("items")
        .find()
        .sort({ _id: -1 })
        .toArray();
      client.close();

      return output;
    } catch (error) {
      return { opr: false };
    }
  }

  public static async update(inputObj: any) {
    try {
      const client = await MongoClient.connect(url);
      const db = client.db("todo");

      let query = { _id: new ObjectID(inputObj._id) };
      let newData = { $set: { todo: inputObj.todo } };
      await db.collection("items").updateOne(query, newData);
      client.close();

      return { opr: true };
    } catch (error) {
      return { opr: false };
    }
  }

  public static async delete(inputObj: any) {
    try {
      const client = await MongoClient.connect(url);
      const db = client.db("todo");

      let query = { _id: new ObjectID(inputObj._id) };

      await db.collection("items").deleteOne(query);
      client.close();

      return { opr: true };
    } catch (error) {
      return { opr: false };
    }
  }
}
