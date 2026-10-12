import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['UNDERSTAND','ASSESS','DEVELOP','2046']),
    type: z.enum(['editorial','research','insight']),
    date: z.coerce.date(),
    readingTime: z.number().int().positive(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(true),
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
    sources: z.array(z.object({ title: z.string(), url: z.string().url() })).default([])
  })
});
export const collections = { articles };
