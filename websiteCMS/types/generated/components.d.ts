import type { Schema, Struct } from '@strapi/strapi';

export interface SharedExperienceSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_experience_sections';
  info: {
    displayName: 'ExperienceSection';
    icon: 'folder';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.experience-section': SharedExperienceSection;
    }
  }
}
