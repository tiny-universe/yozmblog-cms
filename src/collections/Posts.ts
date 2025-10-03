import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedDate', 'updatedAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      // Published posts are publicly accessible
      if (!user) {
        return {
          status: {
            equals: 'published',
          },
        }
      }
      // Logged in users can see all posts
      return true
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: {
        en: 'Title',
        ko: '제목',
        ja: 'タイトル',
        es: 'Título',
        fr: 'Titre',
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
        en: 'URL Slug',
        ko: 'URL 슬러그',
        ja: 'URLスラッグ',
        es: 'URL Slug',
        fr: 'Slug URL',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        {
          label: {
            en: 'Draft',
            ko: '임시 저장',
            ja: '下書き',
            es: 'Borrador',
            fr: 'Brouillon',
          },
          value: 'draft',
        },
        {
          label: {
            en: 'Published',
            ko: '게시됨',
            ja: '公開',
            es: 'Publicado',
            fr: 'Publié',
          },
          value: 'published',
        },
      ],
      admin: {
        position: 'sidebar',
      },
      label: {
        en: 'Status',
        ko: '상태',
        ja: 'ステータス',
        es: 'Estado',
        fr: 'Statut',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      label: {
        en: 'Published Date',
        ko: '게시일',
        ja: '公開日',
        es: 'Fecha de publicación',
        fr: 'Date de publication',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        position: 'sidebar',
      },
      label: {
        en: 'Author',
        ko: '작성자',
        ja: '著者',
        es: 'Autor',
        fr: 'Auteur',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
      },
      label: {
        en: 'Featured Image',
        ko: '대표 이미지',
        ja: 'アイキャッチ画像',
        es: 'Imagen destacada',
        fr: 'Image en vedette',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      label: {
        en: 'Excerpt',
        ko: '요약',
        ja: '抜粋',
        es: 'Extracto',
        fr: 'Extrait',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
      label: {
        en: 'Content',
        ko: '내용',
        ja: 'コンテンツ',
        es: 'Contenido',
        fr: 'Contenu',
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
      label: {
        en: 'Categories',
        ko: '카테고리',
        ja: 'カテゴリー',
        es: 'Categorías',
        fr: 'Catégories',
      },
    },
    {
      name: 'tags',
      type: 'array',
      admin: {
        position: 'sidebar',
      },
      label: {
        en: 'Tags',
        ko: '태그',
        ja: 'タグ',
        es: 'Etiquetas',
        fr: 'Tags',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    // SEO Fields Group
    {
      name: 'seo',
      type: 'group',
      label: {
        en: 'SEO',
        ko: 'SEO',
        ja: 'SEO',
        es: 'SEO',
        fr: 'SEO',
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          localized: true,
          label: {
            en: 'Meta Title',
            ko: '메타 제목',
            ja: 'メタタイトル',
            es: 'Meta título',
            fr: 'Méta titre',
          },
          admin: {
            description: {
              en: 'Override the default title for SEO. Leave blank to use the post title.',
              ko: 'SEO용 제목을 재정의합니다. 비워두면 포스트 제목을 사용합니다.',
              ja: 'SEOのタイトルを上書きします。空白の場合は投稿タイトルを使用します。',
              es: 'Anular el título predeterminado para SEO. Dejar en blanco para usar el título de la publicación.',
              fr: 'Remplacer le titre par défaut pour le référencement. Laissez vide pour utiliser le titre de l\'article.',
            },
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          localized: true,
          label: {
            en: 'Meta Description',
            ko: '메타 설명',
            ja: 'メタディスクリプション',
            es: 'Meta descripción',
            fr: 'Méta description',
          },
          admin: {
            description: {
              en: 'A brief description for search engines (150-160 characters recommended).',
              ko: '검색 엔진용 간단한 설명 (150-160자 권장).',
              ja: '検索エンジン用の簡単な説明（150-160文字推奨）。',
              es: 'Una breve descripción para motores de búsqueda (150-160 caracteres recomendados).',
              fr: 'Une brève description pour les moteurs de recherche (150-160 caractères recommandés).',
            },
          },
        },
        {
          name: 'metaImage',
          type: 'upload',
          relationTo: 'media',
          label: {
            en: 'Meta Image',
            ko: '메타 이미지',
            ja: 'メタ画像',
            es: 'Meta imagen',
            fr: 'Méta image',
          },
          admin: {
            description: {
              en: 'Image for social media sharing. Leave blank to use the featured image.',
              ko: '소셜 미디어 공유용 이미지. 비워두면 대표 이미지를 사용합니다.',
              ja: 'ソーシャルメディア共有用の画像。空白の場合はアイキャッチ画像を使用します。',
              es: 'Imagen para compartir en redes sociales. Dejar en blanco para usar la imagen destacada.',
              fr: 'Image pour le partage sur les réseaux sociaux. Laissez vide pour utiliser l\'image en vedette.',
            },
          },
        },
        {
          name: 'keywords',
          type: 'array',
          localized: true,
          label: {
            en: 'Keywords',
            ko: '키워드',
            ja: 'キーワード',
            es: 'Palabras clave',
            fr: 'Mots-clés',
          },
          fields: [
            {
              name: 'keyword',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'canonical',
          type: 'text',
          label: {
            en: 'Canonical URL',
            ko: '표준 URL',
            ja: '正規URL',
            es: 'URL canónica',
            fr: 'URL canonique',
          },
          admin: {
            description: {
              en: 'The canonical URL for this post. Leave blank to auto-generate.',
              ko: '이 포스트의 표준 URL. 비워두면 자동 생성됩니다.',
              ja: 'この投稿の正規URL。空白の場合は自動生成されます。',
              es: 'La URL canónica para esta publicación. Dejar en blanco para generar automáticamente.',
              fr: 'L\'URL canonique pour cet article. Laissez vide pour générer automatiquement.',
            },
          },
        },
        {
          name: 'noIndex',
          type: 'checkbox',
          label: {
            en: 'No Index',
            ko: '색인 제외',
            ja: 'インデックスしない',
            es: 'No indexar',
            fr: 'Ne pas indexer',
          },
          admin: {
            description: {
              en: 'Prevent search engines from indexing this post.',
              ko: '검색 엔진이 이 포스트를 색인하지 않도록 합니다.',
              ja: '検索エンジンがこの投稿をインデックスしないようにします。',
              es: 'Evitar que los motores de búsqueda indexen esta publicación.',
              fr: 'Empêcher les moteurs de recherche d\'indexer cet article.',
            },
          },
        },
      ],
    },
  ],
}
