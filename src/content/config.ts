import {z, defineCollection} from 'astro:content';

const experienceCollection = defineCollection({
  type: "data",
  schema: z.object({
    position: z.number().nonnegative(),   // This will be used to order the experiences
    company: z.string(),
    startYear: z.number().min(1994).max(2094),
    endYear: z.number().min(1994).max(2094).optional(),
    taskList: z.array(z.string()).max(5),
    hardSkills: z.array(z.string()).max(15), 
    softSkills: z.array(z.string()).max(15), 
    tools: z.array(z.string()).optional(),
    projects: z.array(z.object({
      name: z.string(),
      url: z.string().optional()
    })).optional()
  })
});

export const collections = {
  'experiences': experienceCollection
};