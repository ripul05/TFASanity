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
      options: {source: (doc: any) => doc?.title?.first || ''},
      validation: (R) => R.required(),
    }),

    // Add hero type selector
    defineField({
      name: 'heroType',
      title: 'Hero Type',
      type: 'string',
      options: {
        list: [
          {title: 'Standard Hero', value: 'standard'},
          {title: 'Summer Camp Hero', value: 'summerCamp'}
        ],
        layout: 'radio'
      },
      initialValue: 'standard',
      validation: (R) => R.required(),
    }),

    /* ------  TEXT  ------ */
    defineField({
      name: 'title',
      title: 'Heading (3-part)',
      type: 'object',
      validation: (R) => R.required(),
      fields: [
        {name: 'first', title: 'Line 1', type: 'string', validation: (R) => R.required()},
        {
          name: 'second',
          title: 'Line 2 (highlighted)',
          type: 'string',
          validation: (R) => R.required(),
        },
        {name: 'third', title: 'Line 3', type: 'string', validation: (R) => R.required()},
      ],
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      validation: (R) => R.max(120),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (R) => R.max(500),
    }),

    // Summer Camp specific fields
    defineField({
      name: 'campDates',
      title: 'Camp Dates',
      type: 'object',
      hidden: ({document}) => document?.heroType !== 'summerCamp',
      validation: (R) => R.custom((value, context) => {
        if (context.document?.heroType === 'summerCamp' && !value) {
          return 'Camp dates are required for summer camp heroes'
        }
        return true
      }),
      fields: [
        {
          name: 'camp1',
          title: 'Summer Camp I',
          type: 'object',
          fields: [
            {name: 'title', title: 'Camp Title', type: 'string', initialValue: 'SUMMER CAMP I'},
            {name: 'dates', title: 'Dates', type: 'string', validation: (R) => R.required()},
          ]
        },
        {
          name: 'camp2',
          title: 'Summer Camp II',
          type: 'object',
          fields: [
            {name: 'title', title: 'Camp Title', type: 'string', initialValue: 'SUMMER CAMP II'},
            {name: 'dates', title: 'Dates', type: 'string', validation: (R) => R.required()},
          ]
        }
      ]
    }),

    /* ------  MEDIA  ------ */
    defineField({
      name: 'background',
      title: 'Background Image (desktop)',
      type: 'image',
      options: {hotspot: true},
      // ⚠️ CONDITIONAL VALIDATION - only required for standard heroes
      validation: (R) => R.custom((value, context) => {
        if (context.document?.heroType !== 'summerCamp' && !value) {
          return 'Background image is required for standard heroes'
        }
        return true
      }),
      hidden: ({document}) => document?.heroType === 'summerCamp',
      fields: [{
        name: 'alt', 
        type: 'string', 
        title: 'Alt text', 
        // ⚠️ CONDITIONAL VALIDATION for alt text
        validation: (R) => R.custom((value, context) => {
          // Get the parent document through the context path
          const document = context.document
          if (document?.heroType !== 'summerCamp' && !value) {
            return 'Alt text is required for standard heroes'
          }
          return true
        })
      }]
    }),
    defineField({
      name: 'backgroundMobile',
      title: 'Background Image (mobile, optional)',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alt text'}],
      hidden: ({document}) => document?.heroType === 'summerCamp',
    }),
    
    // Summer Camp video background
    defineField({
      name: 'backgroundVideo',
      title: 'Background Video',
      type: 'file',
      options: {accept: 'video/*'},
      hidden: ({document}) => document?.heroType !== 'summerCamp',
      validation: (R) => R.custom((value, context) => {
        if (context.document?.heroType === 'summerCamp' && !value) {
          return 'Background video is required for summer camp heroes'
        }
        return true
      }),
    }),

    /* ------  CALL-TO-ACTION  ------ */
    defineField({
      name: 'primaryCta',
      title: 'Primary Button',
      type: 'object',
      validation: (R) => R.required(),
      fields: [
        {
          name: 'text',
          type: 'string',
          title: 'Label',
          validation: (R) => R.required(),
        },
        {
          name: 'url',
          type: 'string',
          title: 'URL',
          validation: (R) =>
            R.required()
              .regex(/^(\/[^\s]*)$|^(https?:\/\/[^\s]+)$|^(#[a-zA-Z0-9\-_]+)$/i, {
                name: 'url',
                invert: false,
              })
              .error(
                'Enter a valid URL, relative path starting with /, or anchor link starting with #',
              ),
        },
        {
          name: 'newTab',
          type: 'boolean',
          title: 'Open in new tab',
          initialValue: true,
        },
        // Summer camp specific - action type
        {
          name: 'actionType',
          type: 'string',
          title: 'Action Type',
          options: {
            list: [
              {title: 'Navigate to URL', value: 'navigate'},
              {title: 'Scroll to section', value: 'scroll'}
            ]
          },
          initialValue: 'navigate',
          hidden: ({document}) => document?.heroType !== 'summerCamp',
        }
      ],
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary Button',
      type: 'object',
      // ⚠️ CONDITIONAL VALIDATION - only required for standard heroes
      validation: (R) => R.custom((value, context) => {
        if (context.document?.heroType !== 'summerCamp' && !value) {
          return 'Secondary button is required for standard heroes'
        }
        return true
      }),
      fields: [
        {
          name: 'text', 
          type: 'string', 
          title: 'Label', 
          // ⚠️ CONDITIONAL VALIDATION for label
          validation: (R) => R.custom((value, context) => {
            const document = context.document
            if (document?.heroType !== 'summerCamp' && !value) {
              return 'Label is required for standard heroes'
            }
            return true
          })
        },
        {
          name: 'action',
          type: 'string',
          title: 'Action',
          description: '"scroll:#id" or URL',
          // ⚠️ CONDITIONAL VALIDATION for action
          validation: (R) => R.custom((value, context) => {
            const document = context.document
            if (document?.heroType !== 'summerCamp' && !value) {
              return 'Action is required for standard heroes'
            }
            return true
          })
        },
      ],
      hidden: ({document}) => document?.heroType === 'summerCamp',
    }),
  ],

  preview: {
    select: {
      title: 'title.first', 
      media: 'background',
      heroType: 'heroType'
    },
    prepare({title, media, heroType}) {
      const typeLabel = heroType === 'summerCamp' ? 'Summer Camp Hero' : 'Hero'
      return {title: `${typeLabel} – ${title}`, media}
    },
  },
})
