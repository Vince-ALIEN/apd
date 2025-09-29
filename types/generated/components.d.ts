import type { Schema, Struct } from '@strapi/strapi';

export interface EgliseAdresse extends Struct.ComponentSchema {
  collectionName: 'components_eglise_adresses';
  info: {
    displayName: 'Localisation';
    icon: 'pinMap';
  };
  attributes: {
    code_postal: Schema.Attribute.String;
    latitude: Schema.Attribute.Decimal;
    longitude: Schema.Attribute.Decimal;
    pays: Schema.Attribute.String;
    region: Schema.Attribute.String;
    ville: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'eglise.adresse': EgliseAdresse;
    }
  }
}
