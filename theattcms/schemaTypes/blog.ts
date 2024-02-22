export default {
    name: 'blog',
    type: 'document',
    title: 'Blog',
    fields: [
        {
            name: 'media_name',
            type: 'string',
            title: 'Name of the Show',
        },
        {
            name: 'title',
            type: 'string',
            title: 'Title of blog article',
        },
        {
            name: 'slug',
            type: 'slug',
            title: 'Slug of your blog article',
            options: {
                source: 'media_name',
                maxLength: 96,
            },
        },
        {
            name: 'titleImage',
            type: 'image',
            title: 'Title Image of blog article',
        },
        {
            name: 'smallDescription',
            type: 'text',
            title: 'Small Description of blog article',
        },
        {
            name: 'content',
            type: 'array',
            title: 'Content of blog article',
            of: [
                {
                    type: 'block',
                },
            ],
        }
    ],
}