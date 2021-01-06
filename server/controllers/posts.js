const express = require('express');
const router = express.Router();

const Post = require('../models/Post')

// Posts index route
router.get('/', async (req, res) => {
    try {
        const posts = await Post.all
        res.json({posts})
    } catch(err) {
        res.status(500).json({err})
    }
})

// Posts show route
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(parseInt(req.params.id))
        res.json(post)
    } catch(err) {
        res.status(404).json({err})
    }
})

// Create Post route
router.post('/', async (req, res) => {
    try {
        const post = await Post.create(req.body.name, req.body.age)
        res.json(post)
    } catch(err) {
        res.status(404).json({err})
    }
})

// Posts update route
router.patch('/:id', async (req, res) => {
    try {
        const post = await Post.findById(parseInt(req.params.id))
        const updatedPost = await Post.update(req.body.name, req.body.age)
        res.json({Post: updatedPost})
    } catch(err) {
        res.status(500).json({err})
    }
})

// delete Post route
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(parseInt(req.params.id))
        await Post.destroy()
        res.status(204).json('Post deleted')
    } catch(err) {
        res.status(500).json({err})
    }
})


module.exports = router;