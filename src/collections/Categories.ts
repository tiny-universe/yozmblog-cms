import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: {
        en: 'Name',
        ko: '이름',
        ja: '名前',
        es: 'Nombre',
        fr: 'Nom',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      label: {
        en: 'Slug',
        ko: '슬러그',
        ja: 'スラッグ',
        es: 'Slug',
        fr: 'Slug',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: {
        en: 'Description',
        ko: '설명',
        ja: '説明',
        es: 'Descripción',
        fr: 'Description',
      },
    },
  ],
}
