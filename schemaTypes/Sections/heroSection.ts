import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Hero Title',
      type: 'object',
      fields: [
        defineField({
          name: 'firstLine',
          title: 'First Line',
          type: 'string',
          initialValue: 'TEXAS',
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: 'secondLine',
          title: 'Second Line (Highlighted)',
          type: 'string',
          initialValue: 'FENCING',
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: 'thirdLine',
          title: 'Third Line',
          type: 'string',
          initialValue: 'ACADEMY',
          validation: (Rule) => Rule.required()
        })
      ],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'WHERE PRECISION MEETS PASSION',
      validation: (Rule) => Rule.required().max(100)
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      initialValue: 'Master the art of fencing through disciplined training, expert instruction, and unwavering dedication to excellence in our state-of-the-art facility.',
      validation: (Rule) => Rule.required().max(500)
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'object',
      fields: [
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Important for accessibility and SEO.',
              validation: (Rule) => Rule.required()
            })
          ],
          validation: (Rule) => Rule.required()
        })
      ],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'callToActions',
      title: 'Call to Action Buttons',
      type: 'object',
      fields: [
        defineField({
          name: 'primaryButton',
          title: 'Primary Button',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              initialValue: 'EXPLORE PROGRAMS',
              validation: (Rule) => Rule.required().max(50)
            }),
            defineField({
              name: 'url',
              title: 'Button URL',
              type: 'url',
              initialValue: 'https://texasfencingacademy.org/?page_id=881',
              validation: (Rule) => Rule.required().uri({
                scheme: ['http', 'https', 'mailto', 'tel']
              })
            }),
            defineField({
              name: 'openInNewTab',
              title: 'Open in New Tab',
              type: 'boolean',
              initialValue: true
            })
          ],
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: 'secondaryButton',
          title: 'Secondary Button',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              initialValue: 'BEGIN YOUR JOURNEY',
              validation: (Rule) => Rule.required().max(50)
            }),
            defineField({
              name: 'scrollTarget',
              title: 'Scroll Target ID',
              type: 'string',
              description: 'Element ID to scroll to (without #)',
              initialValue: 'registration-section',
              validation: (Rule) => Rule.required().regex(/^[a-zA-Z][a-zA-Z0-9-_]*$/, {
                name: 'valid HTML ID',
                invert: false
              })
            })
          ],
          validation: (Rule) => Rule.required()
        })
      ],
      validation: (Rule) => Rule.required()
    })
  ],
  preview: {
    select: {
      title: 'title.firstLine',
      subtitle: 'tagline',
      media: 'images.backgroundImage'
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: `Hero: ${title}`,
        subtitle: subtitle || 'No tagline'
      };
    }
  }
});
