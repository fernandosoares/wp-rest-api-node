const express = require('express')
const router = express.Router()
const axios = require('axios')

const seo = {
    title: 'WP WITH NODE',
    description: 'Simple website with Node/Express + WP Rest API'
}

// All posts
router.get('/:page?', async (req, res) => {
    const page = req.params.page
    const pageQuery = !page ? '' : `&page=${page}`

    try {
        const posts = await axios.get(`${process.env.API_URL}${process.env.POSTS}?per_page=9${pageQuery}`)
        const pageData = { ...seo }
        pageData.posts = posts.data
        pageData.totalPages = parseInt(posts.headers['x-wp-totalpages'])
        console.log(pageData)
        res.render('posts', pageData)
    } catch (err) {
        console.log(err)
    }
})

// Single post
router.get('/post/:slug', async (req, res) => {

    try {

        const url = `${process.env.API_URL}${process.env.POSTS}?slug=${req.params.slug}&per_page=1`
        const post = await axios.get(url)

        const pageData = { ...seo }
        pageData.post = post.data

        res.render('single', pageData)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router
