import { defineField, defineType } from 'sanity'

export const landingPageAbout = defineType({
  name: 'landingPageAbout',
  title: 'Landing Page About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionHeader',
      title: 'Section Header',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Section Label',
          type: 'string',
          description: 'Small text above the main heading (e.g., "OUR PHILOSOPHY")',
          validation: Rule => Rule.required().max(50)
        }),
        defineField({
          name: 'mainHeading',
          title: 'Main Heading',
          type: 'object',
          fields: [
            defineField({
              name: 'regularText',
              title: 'Regular Text',
              type: 'string',
              description: 'The non-highlighted part of the heading',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'highlightedText',
              title: 'Highlighted Text',
              type: 'string',
              description: 'The emphasized part of the heading (will be styled with accent color)',
              validation: Rule => Rule.required()
            })
          ]
        })
      ]
    }),

    defineField({
      name: 'contentParagraphs',
      title: 'Content Paragraphs',
      type: 'array',
      of: [
        defineField({
          name: 'paragraph',
          title: 'Paragraph',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Paragraph Text',
              type: 'text',
              rows: 4,
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'emphasis',
              title: 'Emphasis Words/Phrases',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Words or phrases to be emphasized with accent styling (e.g., "sword fighting")',
              options: {
                layout: 'tags'
              }
            }),
            defineField({
              name: 'isLarge',
              title: 'Large Text',
              type: 'boolean',
              description: 'Make this paragraph larger than others',
              initialValue: false
            }),
            defineField({
              name: 'animationDelay',
              title: 'Animation Delay (ms)',
              type: 'number',
              description: 'Delay for fade-in animation',
              initialValue: 0
            })
          ]
        })
      ],
      validation: Rule => Rule.min(1).max(5)
    }),

    defineField({
      name: 'blockquote',
      title: 'Featured Quote',
      type: 'object',
      fields: [
        defineField({
          name: 'quote',
          title: 'Quote Text',
          type: 'text',
          rows: 3,
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'attribution',
          title: 'Attribution',
          type: 'string',
          description: 'Source or context of the quote (e.g., "COACHING PHILOSOPHY")',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'icon',
          title: 'Icon',
          type: 'string',
          options: {
            list: [
              { title: 'Arrow Up', value: 'arrow-up' },
              { title: 'Star', value: 'star' },
              { title: 'Trophy', value: 'trophy' },
              { title: 'Target', value: 'target' },
              { title: 'Sword', value: 'sword' }
            ]
          },
          initialValue: 'arrow-up'
        })
      ]
    }),

    defineField({
      name: 'callToAction',
      title: 'Call to Action',
      type: 'object',
      fields: [
        defineField({
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          validation: Rule => Rule.required().max(50)
        }),
        defineField({
          name: 'buttonUrl',
          title: 'Button URL',
          type: 'url',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'description',
          title: 'Description Text',
          type: 'string',
          description: 'Small text below the button',
          validation: Rule => Rule.max(100)
        })
      ]
    }),

    defineField({
      name: 'video',
      title: 'Featured Video',
      type: 'object',
      fields: [
        defineField({
          name: 'videoFile',
          title: 'Video File',
          type: 'file',
          options: {
            accept: 'video/*'
          }
        }),
        defineField({
          name: 'videoUrl',
          title: 'Video URL',
          type: 'url',
          description: 'Alternative to uploading - use external video URL'
        }),
        defineField({
          name: 'posterImage',
          title: 'Poster Image',
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: Rule => Rule.required()
            })
          ]
        }),
        defineField({
          name: 'videoDescription',
          title: 'Video Description',
          type: 'string',
          description: 'Text overlay on the video',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'videoLabel',
          title: 'Video Label',
          type: 'string',
          description: 'Small label for the video (e.g., "INTRO VIDEO")',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'autoplay',
          title: 'Autoplay',
          type: 'boolean',
          initialValue: true
        }),
        defineField({
          name: 'muted',
          title: 'Muted',
          type: 'boolean',
          initialValue: true
        }),
        defineField({
          name: 'loop',
          title: 'Loop',
          type: 'boolean',
          initialValue: true
        }),
        defineField({
          name: 'showControls',
          title: 'Show Controls',
          type: 'boolean',
          initialValue: true
        })
      ],
      validation: Rule => Rule.custom((value) => {
        if (!value?.videoFile && !value?.videoUrl) {
          return 'Either upload a video file or provide a video URL'
        }
        return true
      })
    }),

    defineField({
      name: 'statsWidget',
      title: 'Stats Widget',
      type: 'object',
      description: 'Floating stats badge that appears on video hover',
      fields: [
        defineField({
          name: 'number',
          title: 'Number',
          type: 'string',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'isVisible',
          title: 'Show Stats Widget',
          type: 'boolean',
          initialValue: true
        })
      ]
    }),

    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'SEO Title',
          type: 'string',
          validation: Rule => Rule.max(60)
        }),
        defineField({
          name: 'description',
          title: 'SEO Description',
          type: 'text',
          rows: 3,
          validation: Rule => Rule.max(160)
        })
      ]
    })
  ],

  preview: {
    select: {
      title: 'sectionHeader.mainHeading.regularText',
      subtitle: 'sectionHeader.label',
      media: 'video.posterImage'
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Landing Page About',
        subtitle: subtitle || 'About section',
        media
      }
    }
  }
})
