import { Rule } from '@sanity/types';
export default {
    name: 'talent',
    title: 'Talent',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule: Rule) => Rule.required()
        },
        {
            name: 'biography',
            title: 'Biography',
            type: 'text'
        },
        {
            name: 'shows',
            title: 'Shows',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'tvShow' }] }],
            description: 'Reference to TV shows associated with the talent'
        }
    ]
}
