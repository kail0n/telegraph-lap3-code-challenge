const db = require ('../db/config')
const SQL = require("sql-template-strings");

class Post {
    constructor(data){
        this.id = data.id
        this.name = data.name
        this.age = data.age
    }

    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const postsData = await db.run(SQL`SELECT * FROM posts;`)
                const posts = postsData.rows.map(d => new Post(d))
                resolve(posts);
            } catch (err) {
                reject("Error retrieving posts")
            }
        })
    }

    static findById (id) {
        return new Promise (async (resolve, reject) => {
            try {
                let postData = await db.run(SQL`SELECT * FROM posts WHERE id = ${id};`);
                let post = new Post(postData.rows[0]);
                resolve (post);
            } catch (err) {
                reject('Post not found');
            }
        });
    }

    static findByOwner (id) {
        return new Promise (async (resolve, reject) => {
            try {
                let postsData = await db.run(SQL`SELECT * FROM posts WHERE ownerId = ${id};`);
                const posts = postsData.rows.map(d => new Post(d))
                resolve (posts);
            } catch (err) {
                reject('Error retrieving owner\'s posts');
            }
        });
    }

    static create(name, age){
        return new Promise (async (resolve, reject) => {
            try {
                let postData = await db.run(SQL`INSERT INTO posts (name, age) VALUES (${name}, ${age}) RETURNING *;`);
                let newPost = new Post(postData.rows[0]);
                resolve (newPost);
            } catch (err) {
                reject('Error creating Post');
            }
        });
    }

    update() {
        return new Promise (async (resolve, reject) => {
            try {
                let updatedPostData = await db.run(SQL`UPDATE posts SET age = age + 1 WHERE id = ${this.id} RETURNING *;`);
                let updatedPost = new Post(updatedPostData.rows[0]);
                resolve (updatedPost);
            } catch (err) {
                reject('Error updating Post');
            }
        });
    }

    destroy(){
        return new Promise(async(resolve, reject) => {
            try {
                await db.run(SQL`DELETE FROM posts WHERE id = ${this.id};`);
                resolve('Post was deleted')
            } catch (err) {
                reject('Post could not be deleted')
            }
        })
    }

}

module.exports = Post;