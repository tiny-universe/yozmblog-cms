import type { CollectionConfig } from 'payload'

export const SportEvents: CollectionConfig = {
  slug: 'sport-events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'startDate', 'sportCategory'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) {
        return {
          status: {
            equals: 'published',
          },
        }
      }
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
    // 기본 정보
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: {
        en: 'Event Title',
        ko: '대회명',
        ja: '大会名',
        es: 'Título del evento',
        fr: 'Titre de l\'événement',
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
      name: 'description',
      type: 'richText',
      required: true,
      localized: true,
      label: {
        en: 'Description',
        ko: '대회 설명',
        ja: '大会説明',
        es: 'Descripción',
        fr: 'Description',
      },
    },
    {
      name: 'sportCategory',
      type: 'relationship',
      relationTo: 'sport-categories',
      required: true,
      admin: {
        position: 'sidebar',
      },
      label: {
        en: 'Sport Category',
        ko: '스포츠 종목',
        ja: 'スポーツ種目',
        es: 'Categoría deportiva',
        fr: 'Catégorie sportive',
      },
    },
    {
      name: 'level',
      type: 'select',
      required: true,
      options: [
        {
          label: {
            en: 'Professional',
            ko: '프로',
            ja: 'プロ',
            es: 'Profesional',
            fr: 'Professionnel',
          },
          value: 'professional',
        },
        {
          label: {
            en: 'Amateur',
            ko: '아마추어',
            ja: 'アマチュア',
            es: 'Amateur',
            fr: 'Amateur',
          },
          value: 'amateur',
        },
        {
          label: {
            en: 'Student',
            ko: '학생부',
            ja: '学生',
            es: 'Estudiante',
            fr: 'Étudiant',
          },
          value: 'student',
        },
        {
          label: {
            en: 'Youth',
            ko: '유소년',
            ja: 'ユース',
            es: 'Juvenil',
            fr: 'Jeunesse',
          },
          value: 'youth',
        },
        {
          label: {
            en: 'Open',
            ko: '오픈',
            ja: 'オープン',
            es: 'Abierto',
            fr: 'Ouvert',
          },
          value: 'open',
        },
      ],
      admin: {
        position: 'sidebar',
      },
      label: {
        en: 'Event Level',
        ko: '대회 등급',
        ja: '大会レベル',
        es: 'Nivel del evento',
        fr: 'Niveau de l\'événement',
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
        en: 'Publication Status',
        ko: '게시 상태',
        ja: '公開ステータス',
        es: 'Estado de publicación',
        fr: 'Statut de publication',
      },
    },
    {
      name: 'eventStatus',
      type: 'select',
      required: true,
      defaultValue: 'upcoming',
      options: [
        {
          label: {
            en: 'Upcoming',
            ko: '예정',
            ja: '予定',
            es: 'Próximo',
            fr: 'À venir',
          },
          value: 'upcoming',
        },
        {
          label: {
            en: 'Registration Open',
            ko: '접수중',
            ja: '受付中',
            es: 'Inscripción abierta',
            fr: 'Inscription ouverte',
          },
          value: 'registration_open',
        },
        {
          label: {
            en: 'In Progress',
            ko: '진행중',
            ja: '進行中',
            es: 'En progreso',
            fr: 'En cours',
          },
          value: 'in_progress',
        },
        {
          label: {
            en: 'Completed',
            ko: '종료',
            ja: '終了',
            es: 'Completado',
            fr: 'Terminé',
          },
          value: 'completed',
        },
        {
          label: {
            en: 'Cancelled',
            ko: '취소',
            ja: 'キャンセル',
            es: 'Cancelado',
            fr: 'Annulé',
          },
          value: 'cancelled',
        },
      ],
      admin: {
        position: 'sidebar',
      },
      label: {
        en: 'Event Status',
        ko: '대회 상태',
        ja: '大会ステータス',
        es: 'Estado del evento',
        fr: 'Statut de l\'événement',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
      label: {
        en: 'Featured Event',
        ko: '추천 대회',
        ja: '注目イベント',
        es: 'Evento destacado',
        fr: 'Événement en vedette',
      },
    },

    // 일정 정보
    {
      name: 'schedule',
      type: 'group',
      label: {
        en: 'Schedule',
        ko: '일정',
        ja: 'スケジュール',
        es: 'Horario',
        fr: 'Calendrier',
      },
      fields: [
        {
          name: 'startDate',
          type: 'date',
          required: true,
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
          label: {
            en: 'Event Start Date',
            ko: '대회 시작일시',
            ja: '大会開始日時',
            es: 'Fecha de inicio del evento',
            fr: 'Date de début de l\'événement',
          },
        },
        {
          name: 'endDate',
          type: 'date',
          required: true,
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
          label: {
            en: 'Event End Date',
            ko: '대회 종료일시',
            ja: '大会終了日時',
            es: 'Fecha de finalización del evento',
            fr: 'Date de fin de l\'événement',
          },
        },
        {
          name: 'registrationStart',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
          label: {
            en: 'Registration Start Date',
            ko: '참가 신청 시작일',
            ja: '参加申込開始日',
            es: 'Fecha de inicio de inscripción',
            fr: 'Date de début d\'inscription',
          },
        },
        {
          name: 'registrationDeadline',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
          label: {
            en: 'Registration Deadline',
            ko: '참가 신청 마감일',
            ja: '参加申込締切日',
            es: 'Fecha límite de inscripción',
            fr: 'Date limite d\'inscription',
          },
        },
      ],
    },

    // 장소 정보
    {
      name: 'venue',
      type: 'group',
      label: {
        en: 'Venue',
        ko: '장소',
        ja: '会場',
        es: 'Lugar',
        fr: 'Lieu',
      },
      fields: [
        {
          name: 'venueName',
          type: 'text',
          required: true,
          localized: true,
          label: {
            en: 'Venue Name',
            ko: '경기장/장소명',
            ja: '会場名',
            es: 'Nombre del lugar',
            fr: 'Nom du lieu',
          },
        },
        {
          name: 'address',
          type: 'textarea',
          required: true,
          localized: true,
          label: {
            en: 'Address',
            ko: '주소',
            ja: '住所',
            es: 'Dirección',
            fr: 'Adresse',
          },
        },
        {
          name: 'latitude',
          type: 'number',
          label: {
            en: 'Latitude',
            ko: '위도',
            ja: '緯度',
            es: 'Latitud',
            fr: 'Latitude',
          },
        },
        {
          name: 'longitude',
          type: 'number',
          label: {
            en: 'Longitude',
            ko: '경도',
            ja: '経度',
            es: 'Longitud',
            fr: 'Longitude',
          },
        },
        {
          name: 'venueDetails',
          type: 'richText',
          localized: true,
          label: {
            en: 'Venue Details',
            ko: '장소 상세정보',
            ja: '会場詳細',
            es: 'Detalles del lugar',
            fr: 'Détails du lieu',
          },
          admin: {
            description: {
              en: 'Parking, transportation, facilities, etc.',
              ko: '주차, 교통편, 시설 안내 등',
              ja: '駐車場、交通、施設案内など',
              es: 'Estacionamiento, transporte, instalaciones, etc.',
              fr: 'Stationnement, transport, installations, etc.',
            },
          },
        },
      ],
    },

    // 참가 정보
    {
      name: 'participation',
      type: 'group',
      label: {
        en: 'Participation',
        ko: '참가 정보',
        ja: '参加情報',
        es: 'Participación',
        fr: 'Participation',
      },
      fields: [
        {
          name: 'eligibility',
          type: 'richText',
          localized: true,
          label: {
            en: 'Eligibility Requirements',
            ko: '참가 자격/조건',
            ja: '参加資格・条件',
            es: 'Requisitos de elegibilidad',
            fr: 'Conditions d\'éligibilité',
          },
        },
        {
          name: 'entryFee',
          type: 'number',
          label: {
            en: 'Entry Fee',
            ko: '참가비',
            ja: '参加費',
            es: 'Cuota de inscripción',
            fr: 'Frais d\'inscription',
          },
        },
        {
          name: 'currency',
          type: 'select',
          defaultValue: 'KRW',
          options: [
            { label: 'KRW (₩)', value: 'KRW' },
            { label: 'USD ($)', value: 'USD' },
            { label: 'EUR (€)', value: 'EUR' },
            { label: 'JPY (¥)', value: 'JPY' },
          ],
          label: {
            en: 'Currency',
            ko: '통화',
            ja: '通貨',
            es: 'Moneda',
            fr: 'Devise',
          },
        },
        {
          name: 'maxParticipants',
          type: 'number',
          label: {
            en: 'Maximum Participants',
            ko: '최대 참가 팀/인원수',
            ja: '最大参加者数',
            es: 'Participantes máximos',
            fr: 'Participants maximum',
          },
        },
        {
          name: 'currentParticipants',
          type: 'number',
          defaultValue: 0,
          label: {
            en: 'Current Participants',
            ko: '현재 참가 신청 수',
            ja: '現在の参加者数',
            es: 'Participantes actuales',
            fr: 'Participants actuels',
          },
        },
        {
          name: 'registrationLink',
          type: 'text',
          label: {
            en: 'Registration Link',
            ko: '참가 신청 링크',
            ja: '参加申込リンク',
            es: 'Enlace de inscripción',
            fr: 'Lien d\'inscription',
          },
        },
      ],
    },

    // 대회 상세
    {
      name: 'details',
      type: 'group',
      label: {
        en: 'Event Details',
        ko: '대회 상세',
        ja: '大会詳細',
        es: 'Detalles del evento',
        fr: 'Détails de l\'événement',
      },
      fields: [
        {
          name: 'rules',
          type: 'richText',
          localized: true,
          label: {
            en: 'Rules & Regulations',
            ko: '대회 규칙/규정',
            ja: '大会規則・規定',
            es: 'Reglas y regulaciones',
            fr: 'Règles et règlements',
          },
        },
        {
          name: 'prizes',
          type: 'richText',
          localized: true,
          label: {
            en: 'Prizes & Awards',
            ko: '상금/시상 정보',
            ja: '賞金・賞品情報',
            es: 'Premios y reconocimientos',
            fr: 'Prix et récompenses',
          },
        },
        {
          name: 'organizer',
          type: 'text',
          required: true,
          localized: true,
          label: {
            en: 'Organizer',
            ko: '주최기관',
            ja: '主催機関',
            es: 'Organizador',
            fr: 'Organisateur',
          },
        },
        {
          name: 'sponsors',
          type: 'array',
          label: {
            en: 'Sponsors',
            ko: '주관/후원기관',
            ja: '主管・後援機関',
            es: 'Patrocinadores',
            fr: 'Parrains',
          },
          fields: [
            {
              name: 'sponsorName',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'sponsorLogo',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          name: 'contactEmail',
          type: 'email',
          label: {
            en: 'Contact Email',
            ko: '연락처 이메일',
            ja: '連絡先メール',
            es: 'Correo electrónico de contacto',
            fr: 'E-mail de contact',
          },
        },
        {
          name: 'contactPhone',
          type: 'text',
          label: {
            en: 'Contact Phone',
            ko: '연락처 전화',
            ja: '連絡先電話',
            es: 'Teléfono de contacto',
            fr: 'Téléphone de contact',
          },
        },
        {
          name: 'officialWebsite',
          type: 'text',
          label: {
            en: 'Official Website',
            ko: '공식 웹사이트',
            ja: '公式ウェブサイト',
            es: 'Sitio web oficial',
            fr: 'Site web officiel',
          },
        },
      ],
    },

    // 미디어
    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
      },
      label: {
        en: 'Event Poster',
        ko: '대회 포스터',
        ja: '大会ポスター',
        es: 'Póster del evento',
        fr: 'Affiche de l\'événement',
      },
    },
    {
      name: 'gallery',
      type: 'array',
      label: {
        en: 'Gallery',
        ko: '갤러리',
        ja: 'ギャラリー',
        es: 'Galería',
        fr: 'Galerie',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          localized: true,
        },
      ],
    },

    // 추가 정보
    {
      name: 'relatedPosts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      label: {
        en: 'Related Posts',
        ko: '관련 포스트',
        ja: '関連投稿',
        es: 'Publicaciones relacionadas',
        fr: 'Articles connexes',
      },
    },
    {
      name: 'results',
      type: 'richText',
      localized: true,
      label: {
        en: 'Event Results',
        ko: '대회 결과',
        ja: '大会結果',
        es: 'Resultados del evento',
        fr: 'Résultats de l\'événement',
      },
      admin: {
        description: {
          en: 'Fill this after the event is completed',
          ko: '대회 종료 후 작성',
          ja: '大会終了後に記入',
          es: 'Completar después del evento',
          fr: 'Remplir après l\'événement',
        },
      },
    },

    // SEO Fields
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
              en: 'Override the default title for SEO. Leave blank to use the event title.',
              ko: 'SEO용 제목을 재정의합니다. 비워두면 대회명을 사용합니다.',
              ja: 'SEOのタイトルを上書きします。空白の場合は大会名を使用します。',
              es: 'Anular el título predeterminado para SEO. Dejar en blanco para usar el título del evento.',
              fr: 'Remplacer le titre par défaut pour le référencement. Laissez vide pour utiliser le titre de l\'événement.',
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
              en: 'Image for social media sharing. Leave blank to use the poster.',
              ko: '소셜 미디어 공유용 이미지. 비워두면 포스터를 사용합니다.',
              ja: 'ソーシャルメディア共有用の画像。空白の場合はポスターを使用します。',
              es: 'Imagen para compartir en redes sociales. Dejar en blanco para usar el póster.',
              fr: 'Image pour le partage sur les réseaux sociaux. Laissez vide pour utiliser l\'affiche.',
            },
          },
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
              en: 'The canonical URL for this event. Leave blank to auto-generate.',
              ko: '이 대회의 표준 URL. 비워두면 자동 생성됩니다.',
              ja: 'この大会の正規URL。空白の場合は自動生成されます。',
              es: 'La URL canónica para este evento. Dejar en blanco para generar automáticamente.',
              fr: 'L\'URL canonique pour cet événement. Laissez vide pour générer automatiquement.',
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
              en: 'Prevent search engines from indexing this event.',
              ko: '검색 엔진이 이 대회를 색인하지 않도록 합니다.',
              ja: '検索エンジンがこの大会をインデックスしないようにします。',
              es: 'Evitar que los motores de búsqueda indexen este evento.',
              fr: 'Empêcher les moteurs de recherche d\'indexer cet événement.',
            },
          },
        },
      ],
    },
  ],
}
