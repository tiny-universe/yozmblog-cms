import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`posts_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_tags_order_idx\` ON \`posts_tags\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_tags_parent_id_idx\` ON \`posts_tags\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`status\` text DEFAULT 'draft',
  	\`published_date\` text,
  	\`author_id\` integer,
  	\`featured_image_id\` integer,
  	\`seo_meta_image_id\` integer,
  	\`seo_canonical\` text,
  	\`seo_no_index\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`author_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_author_idx\` ON \`posts\` (\`author_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_featured_image_idx\` ON \`posts\` (\`featured_image_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_seo_seo_meta_image_idx\` ON \`posts\` (\`seo_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`posts__status_idx\` ON \`posts\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`posts_locales\` (
  	\`title\` text,
  	\`content\` text,
  	\`excerpt\` text,
  	\`seo_meta_title\` text,
  	\`seo_meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_locales_locale_parent_id_unique\` ON \`posts_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`categories_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_rels_order_idx\` ON \`posts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_parent_idx\` ON \`posts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_path_idx\` ON \`posts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_categories_id_idx\` ON \`posts_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_version_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tag\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_version_tags_order_idx\` ON \`_posts_v_version_tags\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_tags_parent_id_idx\` ON \`_posts_v_version_tags\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_slug\` text,
  	\`version_status\` text DEFAULT 'draft',
  	\`version_published_date\` text,
  	\`version_author_id\` integer,
  	\`version_featured_image_id\` integer,
  	\`version_seo_meta_image_id\` integer,
  	\`version_seo_canonical\` text,
  	\`version_seo_no_index\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_author_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_seo_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_parent_idx\` ON \`_posts_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_slug_idx\` ON \`_posts_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_author_idx\` ON \`_posts_v\` (\`version_author_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_featured_image_idx\` ON \`_posts_v\` (\`version_featured_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_seo_version_seo_meta_image_idx\` ON \`_posts_v\` (\`version_seo_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_updated_at_idx\` ON \`_posts_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_created_at_idx\` ON \`_posts_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version__status_idx\` ON \`_posts_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_created_at_idx\` ON \`_posts_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_updated_at_idx\` ON \`_posts_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_snapshot_idx\` ON \`_posts_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_published_locale_idx\` ON \`_posts_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_latest_idx\` ON \`_posts_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_locales\` (
  	\`version_title\` text,
  	\`version_content\` text,
  	\`version_excerpt\` text,
  	\`version_seo_meta_title\` text,
  	\`version_seo_meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_locales_locale_parent_id_unique\` ON \`_posts_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`categories_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_order_idx\` ON \`_posts_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_parent_idx\` ON \`_posts_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_path_idx\` ON \`_posts_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_categories_id_idx\` ON \`_posts_v_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE TABLE \`categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`categories_slug_idx\` ON \`categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`categories_updated_at_idx\` ON \`categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`categories_created_at_idx\` ON \`categories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`categories_locales\` (
  	\`name\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`categories_locales_locale_parent_id_unique\` ON \`categories_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sport_events_details_sponsors\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`sponsor_logo_id\` integer,
  	FOREIGN KEY (\`sponsor_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sport_events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sport_events_details_sponsors_order_idx\` ON \`sport_events_details_sponsors\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sport_events_details_sponsors_parent_id_idx\` ON \`sport_events_details_sponsors\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sport_events_details_sponsors_sponsor_logo_idx\` ON \`sport_events_details_sponsors\` (\`sponsor_logo_id\`);`)
  await db.run(sql`CREATE TABLE \`sport_events_details_sponsors_locales\` (
  	\`sponsor_name\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sport_events_details_sponsors\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sport_events_details_sponsors_locales_locale_parent_id_unique\` ON \`sport_events_details_sponsors_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sport_events_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sport_events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sport_events_gallery_order_idx\` ON \`sport_events_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sport_events_gallery_parent_id_idx\` ON \`sport_events_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sport_events_gallery_image_idx\` ON \`sport_events_gallery\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`sport_events_gallery_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sport_events_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sport_events_gallery_locales_locale_parent_id_unique\` ON \`sport_events_gallery_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sport_events\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`sport_category_id\` integer,
  	\`level\` text,
  	\`status\` text DEFAULT 'draft',
  	\`event_status\` text DEFAULT 'upcoming',
  	\`featured\` integer DEFAULT false,
  	\`schedule_start_date\` text,
  	\`schedule_end_date\` text,
  	\`schedule_registration_start\` text,
  	\`schedule_registration_deadline\` text,
  	\`venue_latitude\` numeric,
  	\`venue_longitude\` numeric,
  	\`participation_entry_fee\` numeric,
  	\`participation_currency\` text DEFAULT 'KRW',
  	\`participation_max_participants\` numeric,
  	\`participation_current_participants\` numeric DEFAULT 0,
  	\`participation_registration_link\` text,
  	\`details_contact_email\` text,
  	\`details_contact_phone\` text,
  	\`details_official_website\` text,
  	\`poster_id\` integer,
  	\`seo_meta_image_id\` integer,
  	\`seo_canonical\` text,
  	\`seo_no_index\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`sport_category_id\`) REFERENCES \`sport_categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sport_events_slug_idx\` ON \`sport_events\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`sport_events_sport_category_idx\` ON \`sport_events\` (\`sport_category_id\`);`)
  await db.run(sql`CREATE INDEX \`sport_events_poster_idx\` ON \`sport_events\` (\`poster_id\`);`)
  await db.run(sql`CREATE INDEX \`sport_events_seo_seo_meta_image_idx\` ON \`sport_events\` (\`seo_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`sport_events_updated_at_idx\` ON \`sport_events\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`sport_events_created_at_idx\` ON \`sport_events\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`sport_events__status_idx\` ON \`sport_events\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`sport_events_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`venue_venue_name\` text,
  	\`venue_address\` text,
  	\`venue_venue_details\` text,
  	\`participation_eligibility\` text,
  	\`details_rules\` text,
  	\`details_prizes\` text,
  	\`details_organizer\` text,
  	\`results\` text,
  	\`seo_meta_title\` text,
  	\`seo_meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sport_events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sport_events_locales_locale_parent_id_unique\` ON \`sport_events_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sport_events_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`sport_events\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sport_events_rels_order_idx\` ON \`sport_events_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`sport_events_rels_parent_idx\` ON \`sport_events_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sport_events_rels_path_idx\` ON \`sport_events_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`sport_events_rels_posts_id_idx\` ON \`sport_events_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE TABLE \`_sport_events_v_version_details_sponsors\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`sponsor_logo_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`sponsor_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sport_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sport_events_v_version_details_sponsors_order_idx\` ON \`_sport_events_v_version_details_sponsors\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sport_events_v_version_details_sponsors_parent_id_idx\` ON \`_sport_events_v_version_details_sponsors\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sport_events_v_version_details_sponsors_sponsor_logo_idx\` ON \`_sport_events_v_version_details_sponsors\` (\`sponsor_logo_id\`);`)
  await db.run(sql`CREATE TABLE \`_sport_events_v_version_details_sponsors_locales\` (
  	\`sponsor_name\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sport_events_v_version_details_sponsors\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sport_events_v_version_details_sponsors_locales_locale_parent_id_unique\` ON \`_sport_events_v_version_details_sponsors_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sport_events_v_version_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sport_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sport_events_v_version_gallery_order_idx\` ON \`_sport_events_v_version_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sport_events_v_version_gallery_parent_id_idx\` ON \`_sport_events_v_version_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sport_events_v_version_gallery_image_idx\` ON \`_sport_events_v_version_gallery\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_sport_events_v_version_gallery_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sport_events_v_version_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sport_events_v_version_gallery_locales_locale_parent_id_unique\` ON \`_sport_events_v_version_gallery_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sport_events_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_slug\` text,
  	\`version_sport_category_id\` integer,
  	\`version_level\` text,
  	\`version_status\` text DEFAULT 'draft',
  	\`version_event_status\` text DEFAULT 'upcoming',
  	\`version_featured\` integer DEFAULT false,
  	\`version_schedule_start_date\` text,
  	\`version_schedule_end_date\` text,
  	\`version_schedule_registration_start\` text,
  	\`version_schedule_registration_deadline\` text,
  	\`version_venue_latitude\` numeric,
  	\`version_venue_longitude\` numeric,
  	\`version_participation_entry_fee\` numeric,
  	\`version_participation_currency\` text DEFAULT 'KRW',
  	\`version_participation_max_participants\` numeric,
  	\`version_participation_current_participants\` numeric DEFAULT 0,
  	\`version_participation_registration_link\` text,
  	\`version_details_contact_email\` text,
  	\`version_details_contact_phone\` text,
  	\`version_details_official_website\` text,
  	\`version_poster_id\` integer,
  	\`version_seo_meta_image_id\` integer,
  	\`version_seo_canonical\` text,
  	\`version_seo_no_index\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`sport_events\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_sport_category_id\`) REFERENCES \`sport_categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_seo_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_sport_events_v_parent_idx\` ON \`_sport_events_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sport_events_v_version_version_slug_idx\` ON \`_sport_events_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_sport_events_v_version_version_sport_category_idx\` ON \`_sport_events_v\` (\`version_sport_category_id\`);`)
  await db.run(sql`CREATE INDEX \`_sport_events_v_version_version_poster_idx\` ON \`_sport_events_v\` (\`version_poster_id\`);`)
  await db.run(sql`CREATE INDEX \`_sport_events_v_version_seo_version_seo_meta_image_idx\` ON \`_sport_events_v\` (\`version_seo_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_sport_events_v_version_version_updated_at_idx\` ON \`_sport_events_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_sport_events_v_version_version_created_at_idx\` ON \`_sport_events_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_sport_events_v_version_version__status_idx\` ON \`_sport_events_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_sport_events_v_created_at_idx\` ON \`_sport_events_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_sport_events_v_updated_at_idx\` ON \`_sport_events_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_sport_events_v_snapshot_idx\` ON \`_sport_events_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_sport_events_v_published_locale_idx\` ON \`_sport_events_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_sport_events_v_latest_idx\` ON \`_sport_events_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_sport_events_v_locales\` (
  	\`version_title\` text,
  	\`version_description\` text,
  	\`version_venue_venue_name\` text,
  	\`version_venue_address\` text,
  	\`version_venue_venue_details\` text,
  	\`version_participation_eligibility\` text,
  	\`version_details_rules\` text,
  	\`version_details_prizes\` text,
  	\`version_details_organizer\` text,
  	\`version_results\` text,
  	\`version_seo_meta_title\` text,
  	\`version_seo_meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sport_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sport_events_v_locales_locale_parent_id_unique\` ON \`_sport_events_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sport_events_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_sport_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sport_events_v_rels_order_idx\` ON \`_sport_events_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_sport_events_v_rels_parent_idx\` ON \`_sport_events_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sport_events_v_rels_path_idx\` ON \`_sport_events_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_sport_events_v_rels_posts_id_idx\` ON \`_sport_events_v_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE TABLE \`sport_categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text NOT NULL,
  	\`icon_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sport_categories_slug_idx\` ON \`sport_categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`sport_categories_icon_idx\` ON \`sport_categories\` (\`icon_id\`);`)
  await db.run(sql`CREATE INDEX \`sport_categories_updated_at_idx\` ON \`sport_categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`sport_categories_created_at_idx\` ON \`sport_categories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`sport_categories_locales\` (
  	\`name\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sport_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sport_categories_locales_locale_parent_id_unique\` ON \`sport_categories_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`posts_id\` integer REFERENCES posts(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`categories_id\` integer REFERENCES categories(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`sport_events_id\` integer REFERENCES sport_events(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`sport_categories_id\` integer REFERENCES sport_categories(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_sport_events_id_idx\` ON \`payload_locked_documents_rels\` (\`sport_events_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_sport_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`sport_categories_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`posts_tags\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`DROP TABLE \`posts_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_rels\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_version_tags\`;`)
  await db.run(sql`DROP TABLE \`_posts_v\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_rels\`;`)
  await db.run(sql`DROP TABLE \`categories\`;`)
  await db.run(sql`DROP TABLE \`categories_locales\`;`)
  await db.run(sql`DROP TABLE \`sport_events_details_sponsors\`;`)
  await db.run(sql`DROP TABLE \`sport_events_details_sponsors_locales\`;`)
  await db.run(sql`DROP TABLE \`sport_events_gallery\`;`)
  await db.run(sql`DROP TABLE \`sport_events_gallery_locales\`;`)
  await db.run(sql`DROP TABLE \`sport_events\`;`)
  await db.run(sql`DROP TABLE \`sport_events_locales\`;`)
  await db.run(sql`DROP TABLE \`sport_events_rels\`;`)
  await db.run(sql`DROP TABLE \`_sport_events_v_version_details_sponsors\`;`)
  await db.run(sql`DROP TABLE \`_sport_events_v_version_details_sponsors_locales\`;`)
  await db.run(sql`DROP TABLE \`_sport_events_v_version_gallery\`;`)
  await db.run(sql`DROP TABLE \`_sport_events_v_version_gallery_locales\`;`)
  await db.run(sql`DROP TABLE \`_sport_events_v\`;`)
  await db.run(sql`DROP TABLE \`_sport_events_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_sport_events_v_rels\`;`)
  await db.run(sql`DROP TABLE \`sport_categories\`;`)
  await db.run(sql`DROP TABLE \`sport_categories_locales\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
}
