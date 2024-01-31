import AsyncStorage from "@react-native-async-storage/async-storage"


export class ApplicationRecord {

  tableName:string = ""
  PK:string="_id"
  static tableName: string;
  static PK: string;

  async save() {
   
    const x = await AsyncStorage.getItem(this.tableName);
    let items = x ? JSON.parse(x) : [] 

    if(items.some(x=> x[this.PK] === this[this.PK])) {
      // if already exist, so update item
      items = items.map(i => {
        if(i[this.PK] === this[this.PK]) {
          return this
        }else {
          return i
        }
      })
    }else {
      // if not exist, so add item  
      items.push(this);
    }

    await AsyncStorage.setItem(this.tableName, JSON.stringify(items));
  }


  async update(obj){
    // update instance
    // this only saves in DB when save() method is triggered
    Object.keys(obj).forEach(o => {
      this[o] = obj[o]
    })
  }

  async destroy() {
    // remove current instance from the DB
    const x = await AsyncStorage.getItem(this.tableName);
    let items = x ? JSON.parse(x) : [] 
    items = items.filter(x=>x[this.PK] !== this[this.PK]);
    await AsyncStorage.setItem(this.tableName, JSON.stringify(items));
  }

  static async findBy(where:Object):Promise<this> {
    // find by any amount of properties and returns a new instance

    const obj = await this.findAll()
    const keys = Object.keys(where);
    const item = obj.find(item => keys.every(k => where[k] == item[k]))

    if(!item) { return null }
    const o = Object.assign(new this(), item) || null
    return o;
  }

  static async destroyAll(){ 
    // remove all items from the table 

    await AsyncStorage.removeItem(this.tableName)
  }

  static async findAll(){
    // returns all items from the table
    const x = await AsyncStorage.getItem(this.tableName);
   
    if(x) {
      return JSON.parse(x)
    }
    return []
  }

}



