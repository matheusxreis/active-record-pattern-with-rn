
export function Table(tableName:string, PK?:string) {
 return function<T extends { new (...args: any[]): {} }>(constructor: T) {
   return class extends constructor {
     tableName = tableName
     PK = PK || '_id'  
     static tableName = tableName
     static PK = PK || '_id'  
   };
 }
}

