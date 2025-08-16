
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    /* fetch by slug – one hero per page */
defineField({
  name: 'slug',
  title: 'Section ID (slug)',
  type: 'slug',
  options: { source: (doc: any) => doc?.title?.first || '' },
  validation: R => R.required()
}),


    /* ------  TEXT  ------ */
    defineField({
      name: 'title',
      title: 'Heading (3-part)',
      type: 'object',
      validation: R => R.required(),
      fields: [
        {name: 'first',  title: 'Line 1',                     type: 'string', validation: R => R.required()},
        {name: 'second', title: 'Line 2 (highlighted)',        type: 'string', validation: R => R.required()},
        {name: 'third',  title: 'Line 3',                     type: 'string', validation: R => R.required()}
      ]
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      validation: R => R.max(120)
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: R => R.max(500)
    }),

    /* ------  MEDIA  ------ */
    defineField({
      name: 'background',
      title: 'Background Image (desktop)',
      type: 'image',
      options: {hotspot: true},
      validation: R => R.required(),
      fields: [{name: 'alt', type: 'string', title: 'Alt text', validation: R => R.required()}]
    }),
    defineField({
      name: 'backgroundMobile',
      title: 'Background Image (mobile, optional)',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alt text'}]
    }),

    /* ------  CALL-TO-ACTION  ------ */
defineField({
  name: 'primaryCta',
  title: 'Primary Button',
  type: 'object',
  validation: R => R.required(),
  fields: [
    { 
      name: 'text',  
      type: 'string', 
      title: 'Label', 
      validation: R => R.required() 
    },
    {
  name: 'url',
  type: 'string',
  title: 'URL',
  validation: R =>
    R.required()
      .regex(
        /^(\/[^\s]*)$|^(https?:\/\/[^\s]+)$|^(#[a-zA-Z0-9\-_]+)$/i,
        { name: 'url', invert: false }
      )
      .error('Enter a valid URL, relative path starting with /, or anchor link starting with #')
}
,
    { 
      name: 'newTab',
      type: 'boolean',
      title: 'Open in new tab', 
      initialValue: true
    }
  ]
}),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary Button',
      type: 'object',
      validation: R => R.required(),
      fields: [
        {name: 'text',   type: 'string', title: 'Label', validation: R => R.required()},
        {name: 'action', type: 'string', title: 'Action', description: '“scroll:#id” or URL', validation: R => R.required()}
      ]
    }),
    
  ],

  preview: {
    select: {title: 'title.first', media: 'background'},
    prepare({title, media}) {return {title: `Hero – ${title}`, media}}
  }
})
