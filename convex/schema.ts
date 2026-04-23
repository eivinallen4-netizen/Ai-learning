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
  pipelineState: defineTable({
    sessionId: v.string(),
    userId: v.string(),
    status: v.string(),
    courseId: v.optional(v.string()),
    subject: v.optional(v.string()),
    error: v.optional(v.string()),
    updatedAt: v.float64(),
  })
    .index("by_sessionId", ["sessionId"])
    .index("by_userId", ["userId"]),
});
