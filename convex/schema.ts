import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    name: v.optional(v.string()),
  }),
  generatedExercises: defineTable({
    userId: v.id("users"),
    type: v.string(),
    data: v.any(),
  }),
  dashboardDailyActivity: defineTable({
    userId: v.optional(v.id("users")),
    clerkId: v.optional(v.string()),
    createdAt: v.optional(v.float64()),
    day: v.string(),
    questionsAnswered: v.float64(),
    questionsPassed: v.optional(v.float64()),
    readingMinutes: v.optional(v.float64()),
    updatedAt: v.optional(v.float64()),
  }),
  quizQuestions: defineTable({
    exerciseId: v.id("generatedExercises"),
    choices: v.array(v.string()),
    correctAnswer: v.string(),
    question: v.string(),
  }),
});
