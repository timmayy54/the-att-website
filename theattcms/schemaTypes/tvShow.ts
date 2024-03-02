import { Rule } from '@sanity/types';

export default {
    name: 'tvShow',
    title: 'TV Show',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (Rule: Rule) => Rule.required()
      },
      {
        name: 'rating',
        title: 'Rating',
        type: 'number',
        validation: (Rule: Rule) => Rule.min(0).max(10).precision(2)
      },
      {
        name: 'wokeRating',
        title: 'Woke Rating',
        type: 'number',
        options: {
          list: [
            { title: '1 Star', value: 1 },
            { title: '2 Stars', value: 2 },
            { title: '3 Stars', value: 3 },
            { title: '4 Stars', value: 4 },
            { title: '5 Stars', value: 5 },
          ],
          layout: 'radio' // Display as radio buttons in the studio
        }
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
        name: 'wokeComment',
        title: 'Woke Comment',
        type: 'text',
      },
      {
        name: 'canIBinge',
        title: '"Can I Binge?"',
        type: 'string',
        description: 'Text description of the show\'s status for binge-watching'
      },
      {
        name: 'blogReview',
        title: 'BlogReview',
        type: 'reference',
        to: [{type: 'blog'}],
        description: 'Reference to an associated blog review, if it exists'
      },
      {
        name: 'videoReview',
        title: 'Video Review',
        type: 'url',
        description: 'URL to an associated YouTube video review, if it exists'
      },      
      {
        name: 'talent',
        title: 'Talent',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'talent' }] }],
        description: 'References to a collection of actors, cast, crew, and associated people'
      }
    ]
  }
  