import { Rule } from 'sanity';

export default {
  name: 'infoBanner',
  title: 'Info Banner',
  type: 'document',
  fields: [
    {
      name: 'showBanner',
      title: 'Show Banner',
      type: 'boolean',
      description: 'Toggle the display of the InfoBanner on the website.',
      initialValue: true,
    },
    {
      name: 'orientationTitle',
      title: 'Orientation Title',
      type: 'string',
      description: 'Heading text for the orientation banner',
      initialValue: 'NEXT NEW FENCER ORIENTATION',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'orientationDate',
      title: 'Orientation Date',
      type: 'string',
      description: 'The orientation date to be shown in the banner',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
      description: 'Text for the call-to-action button',
      initialValue: 'SECURE YOUR SPOT',
    },
    {
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'url',
      description: 'Link for the call-to-action button',
      validation: (Rule: Rule) =>
        Rule.uri({ scheme: ['http', 'https'] }).required(),
    },
  ],
};
