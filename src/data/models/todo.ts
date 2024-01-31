import { Table } from "../../decorators/Table";
import { ApplicationRecord } from "../ApplicationRecord";


// @Table(table_name, primary_key)
@Table("todos", "createdAt")
export class Todo extends ApplicationRecord {

  _id:string;
  text:string;
  createdAt:number;
  done:boolean;

}
