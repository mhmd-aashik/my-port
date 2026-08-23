import { relations } from "drizzle-orm";
import {
  blogCategories,
  blogPosts,
  blogPostTags,
  blogTags,
  education,
  experienceHighlights,
  experiences,
  mediaAssets,
  projectImages,
  projects,
  projectTechnologies,
  skillCategories,
  skills,
  storyChapters,
  storyMilestones,
} from "./schema";

export const experiencesRelations = relations(experiences, ({ many, one }) => ({
  highlights: many(experienceHighlights),
  logo: one(mediaAssets, {
    fields: [experiences.logoId],
    references: [mediaAssets.id],
  }),
}));

export const experienceHighlightsRelations = relations(
  experienceHighlights,
  ({ one }) => ({
    experience: one(experiences, {
      fields: [experienceHighlights.experienceId],
      references: [experiences.id],
    }),
  })
);

export const educationRelations = relations(education, ({ one }) => ({
  logo: one(mediaAssets, {
    fields: [education.logoId],
    references: [mediaAssets.id],
  }),
}));

export const projectsRelations = relations(projects, ({ many, one }) => ({
  technologies: many(projectTechnologies),
  images: many(projectImages),
  featuredImage: one(mediaAssets, {
    fields: [projects.featuredImageId],
    references: [mediaAssets.id],
  }),
}));

export const projectTechnologiesRelations = relations(
  projectTechnologies,
  ({ one }) => ({
    project: one(projects, {
      fields: [projectTechnologies.projectId],
      references: [projects.id],
    }),
  })
);

export const projectImagesRelations = relations(projectImages, ({ one }) => ({
  project: one(projects, {
    fields: [projectImages.projectId],
    references: [projects.id],
  }),
  media: one(mediaAssets, {
    fields: [projectImages.mediaId],
    references: [mediaAssets.id],
  }),
}));

export const skillCategoriesRelations = relations(skillCategories, ({ many }) => ({
  skills: many(skills),
}));

export const skillsRelations = relations(skills, ({ one }) => ({
  category: one(skillCategories, {
    fields: [skills.categoryId],
    references: [skillCategories.id],
  }),
}));

export const storyChaptersRelations = relations(storyChapters, ({ one }) => ({
  coverImage: one(mediaAssets, {
    fields: [storyChapters.coverImageId],
    references: [mediaAssets.id],
  }),
}));

export const storyMilestonesRelations = relations(storyMilestones, ({ one }) => ({
  experience: one(experiences, {
    fields: [storyMilestones.experienceId],
    references: [experiences.id],
  }),
  education: one(education, {
    fields: [storyMilestones.educationId],
    references: [education.id],
  }),
  project: one(projects, {
    fields: [storyMilestones.projectId],
    references: [projects.id],
  }),
}));

export const blogPostsRelations = relations(blogPosts, ({ one, many }) => ({
  category: one(blogCategories, {
    fields: [blogPosts.categoryId],
    references: [blogCategories.id],
  }),
  postTags: many(blogPostTags),
}));

export const blogCategoriesRelations = relations(blogCategories, ({ many }) => ({
  posts: many(blogPosts),
}));

export const blogTagsRelations = relations(blogTags, ({ many }) => ({
  postTags: many(blogPostTags),
}));

export const blogPostTagsRelations = relations(blogPostTags, ({ one }) => ({
  post: one(blogPosts, {
    fields: [blogPostTags.postId],
    references: [blogPosts.id],
  }),
  tag: one(blogTags, {
    fields: [blogPostTags.tagId],
    references: [blogTags.id],
  }),
}));
