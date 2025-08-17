import { Rule } from 'sanity';

export default {
  name: 'freeIntroClass',
  title: 'Free Introductory Class Modal',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Modal Title',
      type: 'string',
      description: 'Main title for the modal (e.g., "Join us for our Free Introductory Class")',
      initialValue: 'Join us for our Open House',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'classDate',
      title: 'Class Date',
      type: 'datetime',
      description: 'Date and time of the free introductory class',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description text for the modal',
      initialValue: 'Learn about fencing, see a demonstration, and try some of the moves yourself!',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'ctaText',
      title: 'Call to Action Text',
      type: 'string',
      description: 'Text for the action button (e.g., "Reserve Your Spot!")',
      initialValue: 'Register Now!',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'ctaLink',
      title: 'Call to Action Link',
      type: 'url',
      description: 'URL for the registration or more info page',
      initialValue: '/open-house',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'showModal',
      title: 'Show Modal',
      type: 'boolean',
      description: 'Toggle to show/hide the modal',
      initialValue: true
    },
    {
      name: 'delaySeconds',
      title: 'Delay (seconds)',
      type: 'number',
      description: 'Delay in seconds before showing the modal',
      initialValue: 5,
      validation: (Rule: Rule) => Rule.required().min(0).max(60)
    }
  ],
  preview: {
    select: {
      title: 'title',
      classDate: 'classDate',
      showModal: 'showModal'
    },
    prepare({ title, classDate, showModal }: { 
      title?: string; 
      classDate?: string; 
      showModal?: boolean 
    }) {
      const formattedDate = classDate ? new Date(classDate).toLocaleDateString() : 'No date set';
      return {
        title: title || 'Free Introductory Class Modal',
        subtitle: `${formattedDate} - ${showModal ? 'Active' : 'Inactive'}`
      };
    }
  }
};
