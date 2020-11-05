/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import * as interfaces from "../interfaces"





declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenRootTypes {
  Image: interfaces.ImageInterface;
  Mutation: {};
  Product: interfaces.ProductInterface;
  Query: {};
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  String: NexusGenScalars['String'];
  Int: NexusGenScalars['Int'];
  Float: NexusGenScalars['Float'];
  Boolean: NexusGenScalars['Boolean'];
  ID: NexusGenScalars['ID'];
}

export interface NexusGenFieldTypes {
  Image: { // field return type
    alt: string | null; // String
    src: string | null; // String
  }
  Mutation: { // field return type
    addImage: string | null; // String
    addProduct: string | null; // String
  }
  Product: { // field return type
    description: string | null; // String
    images: Array<NexusGenRootTypes['Image'] | null> | null; // [Image]
    label: string | null; // String
    manufacturer: string | null; // String
    price: number | null; // Int
  }
  Query: { // field return type
    product: NexusGenRootTypes['Product'] | null; // Product
  }
}

export interface NexusGenFieldTypeNames {
  Image: { // field return type name
    alt: 'String'
    src: 'String'
  }
  Mutation: { // field return type name
    addImage: 'String'
    addProduct: 'String'
  }
  Product: { // field return type name
    description: 'String'
    images: 'Image'
    label: 'String'
    manufacturer: 'String'
    price: 'Int'
  }
  Query: { // field return type name
    product: 'Product'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    addImage: { // args
      alt: string; // String!
      src: string; // String!
    }
    addProduct: { // args
      description: string; // String!
      images: Array<string | null>; // [String]!
      label: string; // String!
      manufacturer: string; // String!
      price: number; // Int!
      type: string; // String!
    }
  }
  Product: {
    images: { // args
      limit: number | null; // Int
    }
  }
  Query: {
    product: { // args
      id: string; // String!
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Image" | "Mutation" | "Product" | "Query";

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: {};
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
}