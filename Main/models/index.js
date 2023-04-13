const BlogPost = require('../models/BlogPost');
const User = require('../models/User');
const Comment = require('../models/Comment');

// GET all blogPosts
router.get('/', (req, res) => {
    BlogPost.findAll({
        attributes: [
            'id',
            'title',
            'content',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'blogPost_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(dbBlogPostData => res.json(dbBlogPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}
);
// GET a single blogPost
router.get('/:id', (req, res) => {
    BlogPost.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'content',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'blogPost_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(dbBlogPostData => {
            if (!dbBlogPostData) {
                res.status(404).json({ message: 'No blog post found with this id' });
                return;
            }
            res.json(dbBlogPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}
);
// POST a blogPost
router.post('/', (req, res) => {
    BlogPost.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    })
        .then(dbBlogPostData => res.json(dbBlogPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}
);
// PUT a blogPost
router.put('/:id', (req, res) => {
    BlogPost.update(
        {
            title: req.body.title,
            content: req.body.content
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbBlogPostData => {
            if (!dbBlogPostData) {
                res.status(404).json({ message: 'No blog post found with this id' });
                return;
            }
            res.json(dbBlogPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}
);
// DELETE a blogPost
router.delete('/:id', (req, res) => {
    BlogPost.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbBlogPostData => {
            if (!dbBlogPostData) {
                res.status(404).json({ message: 'No blog post found with this id' });
                return;
            }
            res.json(dbBlogPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}
);

module.exports = router;