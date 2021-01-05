const db = require ('../db/config')
const SQL = require("sql-template-strings");

class Dog {
    constructor(data){
        this.id = data.id
        this.name = data.name
        this.age = data.age
    }

    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const dogsData = await db.run(SQL`SELECT * FROM dogs;`)
                const dogs = dogsData.rows.map(d => new Dog(d))
                resolve(dogs);
            } catch (err) {
                reject("Error retrieving dogs")
            }
        })
    }

    static findById (id) {
        return new Promise (async (resolve, reject) => {
            try {
                let dogData = await db.run(SQL`SELECT * FROM dogs WHERE id = ${id};`);
                let dog = new Dog(dogData.rows[0]);
                resolve (dog);
            } catch (err) {
                reject('Dog not found');
            }
        });
    }

    static findByOwner (id) {
        return new Promise (async (resolve, reject) => {
            try {
                let dogsData = await db.run(SQL`SELECT * FROM dogs WHERE ownerId = ${id};`);
                const dogs = dogsData.rows.map(d => new Dog(d))
                resolve (dogs);
            } catch (err) {
                reject('Error retrieving owner\'s dogs');
            }
        });
    }

    static create(name, age){
        return new Promise (async (resolve, reject) => {
            try {
                let dogData = await db.run(SQL`INSERT INTO dogs (name, age) VALUES (${name}, ${age}) RETURNING *;`);
                let newDog = new Dog(dogData.rows[0]);
                resolve (newDog);
            } catch (err) {
                reject('Error creating dog');
            }
        });
    }

    update() {
        return new Promise (async (resolve, reject) => {
            try {
                let updatedDogData = await db.run(SQL`UPDATE dogs SET age = age + 1 WHERE id = ${this.id} RETURNING *;`);
                let updatedDog = new Dog(updatedDogData.rows[0]);
                resolve (updatedDog);
            } catch (err) {
                reject('Error updating dog');
            }
        });
    }

    destroy(){
        return new Promise(async(resolve, reject) => {
            try {
                await db.run(SQL`DELETE FROM dogs WHERE id = ${this.id};`);
                resolve('Dog was deleted')
            } catch (err) {
                reject('Dog could not be deleted')
            }
        })
    }

}

module.exports = Dog;