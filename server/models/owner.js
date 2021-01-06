const db = require ('../db/config')
const SQL = require("sql-template-strings");

const Dog = require("./Post")


class Owner {
    constructor(data){
        this.id = data.id
        this.name = data.name
        this.address = data.address
    }

    static findById (id) {
        return new Promise (async (resolve, reject) => {
            try {
                let ownerData = await db.run(SQL`SELECT * FROM posts WHERE id = ${id};`);
                let owner = new Owner(ownerData.rows[0]);
                resolve (owner);
            } catch (err) {
                reject('Owner not found');
            }
        });
    }

    get dogs(){
        return new Promise (async (resolve, reject) => {
            try {
                const dogsData = await db.run(SQL`SELECT * FROM posts WHERE id = ${this.id}`);
                const dogs = dogsData.rows.map(d => new Dog(d));
                resolve(dogs);
            } catch (err) {
                reject("Owner's dogs could not be found");
            };
        });
    };

}

module.exports = Owner;