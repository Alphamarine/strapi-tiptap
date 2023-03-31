'use strict';

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: 'tiptap',
    type: 'richtext',
  });
};
