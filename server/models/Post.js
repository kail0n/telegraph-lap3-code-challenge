const db = require ('../db/config')
const SQL = require("sql-template-strings");

class Post {
    constructor(data){
        this.id = data.id
        this.title = data.title
        this.author_name = data.author_name
        this.story = data.story
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
                let postsData = await db.run(SQL`SELECT * FROM posts WHERE id = ${id};`);
                const posts = postsData.rows.map(d => new Post(d))
                resolve (posts);
            } catch (err) {
                reject('Error retrieving owner\'s posts');
            }
        });
    }

    static create(title, author_name, story){
        return new Promise (async (resolve, reject) => {
            try {
                let postData = await db.run(SQL`INSERT INTO posts (title, author_name, story) VALUES (${title}, ${author_name}, ${story}) RETURNING *;`);
                let newPost = new Post(postData.rows[0]);
                resolve (newPost);
            } catch (err) {
                reject('Error creating Post');
            }
        });
    }
}

module.exports = Post;