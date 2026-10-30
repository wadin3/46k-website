import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { locales, type Locale } from './i18n';
const photo = z.object({
  image: z.string().min(1), alt: z.string().min(1),
  caption: z.string().default(''), credit: z.string().default(''),
});
const section = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('text'), heading: z.string().default(''), body: z.string().min(1) }),
  photo.extend({ kind: z.literal('photo'), layout: z.enum(['wide', 'offset', 'pair', 'diagram']).default('wide'),
    secondImage: z.string().default(''), secondAlt: z.string().default(''),
    secondCaption: z.string().default(''), secondCredit: z.string().default('') }),
  z.object({ kind: z.literal('quote'), text: z.string().min(1), attribution: z.string().default('46K') }),
  z.object({ kind: z.literal('note'), heading: z.string().min(1), body: z.string().min(1), label: z.string().default('46K') }),
  z.object({ kind: z.literal('model'), heading: z.string().min(1), caption: z.string().min(1),
    steps: z.array(z.object({ title: z.string().min(1), text: z.string().min(1) })).min(2).max(5) }),
]).superRefine((value, context) => {
  if (value.kind === 'photo' && value.layout === 'pair' && (!value.secondImage || !value.secondAlt))
    context.addIssue({ code: z.ZodIssueCode.custom, message: 'A picture pair needs a second image.' });
});
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    language: z.enum(Object.keys(locales) as [Locale, ...Locale[]]).default('en'),
    translationKey: z.string().optional(),
    replaces: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
    category: z.enum(['UNDERSTAND','ASSESS','DEVELOP','2046']),
    type: z.enum(['editorial','research','insight','practice']),
    date: z.coerce.date(),
    readingTime: z.number().int().positive(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(true),
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
    heroCaption: z.string().default(''),
    heroCredit: z.string().default(''),
    imageCaptions: z.boolean().default(true),
    tocAfterHero: z.boolean().default(false),
    cover: z.enum(['light', 'dark']).default('light'),
    demonstration: z.boolean().default(false),
    sections: z.array(section).default([]),
    sources: z.array(z.object({ title: z.string(), url: z.string().url() })).default([])
  })
});
export const collections = { articles };
