import type { CollectionConfig } from 'payload'

export const SportCategories: CollectionConfig = {
  slug: 'sport-categories',
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
        en: 'Sport Name',
        ko: '종목명',
        ja: '種目名',
        es: 'Nombre del deporte',
        fr: 'Nom du sport',
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
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      label: {
        en: 'Icon/Image',
        ko: '아이콘/이미지',
        ja: 'アイコン/画像',
        es: 'Icono/Imagen',
        fr: 'Icône/Image',
      },
    },
  ],
}
