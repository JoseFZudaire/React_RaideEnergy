// var config=require('./dbConfig');
// const sql=require('msnodesqlv8');
import config from "./dbConfig.js";
import sql from "msnodesqlv8";

export async function getLoginDetails(callback){
 try {
  sql.query(config,"select * from Productos",async(err,rows)=>{
   console.log(rows);
   callback(rows);
//    return rows;
  })
 } catch (error ) {
  console.log(error);
 }
}

export function hello() {
    return "Hello";
}

// module.exports={
//  getLoginDetails:getLoginDetails,
//  hello: hello
// }