import { query, mutation } from "./_generated/server"
import { v } from "convex/values"

type PipelineStatus =
  | "idle"
  | "detecting_subject"
  | "awaiting_confirmation"
  | "creating_course"
  | "generating_mentor"
  | "generating_resources"
  | "generating_test"
  | "complete"
  | "error"

type PipelineState = {
  _id?: string
  sessionId: string
  userId: string
  status: PipelineStatus
  courseId?: string
  subject?: string
  error?: string
  updatedAt: number
}

export const getPipelineState = query({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    const state = await ctx.db
      .query("pipelineState")
      .withIndex("by_sessionId", (q) => q.eq("sessionId", args.sessionId))
      .first()

    return state as PipelineState | null
  },
})

export const initPipeline = mutation({
  args: {
    sessionId: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if pipeline state already exists
    const existing = await ctx.db
      .query("pipelineState")
      .withIndex("by_sessionId", (q) => q.eq("sessionId", args.sessionId))
      .first()

    const now = Date.now()

    if (existing) {
      // Reset existing state
      await ctx.db.patch(existing._id, {
        status: "idle" as PipelineStatus,
        courseId: undefined,
        subject: undefined,
        error: undefined,
        updatedAt: now,
      })
      return existing._id
    }

    // Create new pipeline state
    const id = await ctx.db.insert("pipelineState", {
      sessionId: args.sessionId,
      userId: args.userId,
      status: "idle",
      updatedAt: now,
    })

    return id
  },
})

export const setPipelineStatus = mutation({
  args: {
    sessionId: v.string(),
    status: v.string(),
    courseId: v.optional(v.string()),
    subject: v.optional(v.string()),
    error: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const state = await ctx.db
      .query("pipelineState")
      .withIndex("by_sessionId", (q) => q.eq("sessionId", args.sessionId))
      .first()

    if (!state) {
      throw new Error(`Pipeline state not found for session ${args.sessionId}`)
    }

    const updateObj: Record<string, any> = {
      status: args.status,
      updatedAt: Date.now(),
    }

    if (args.courseId !== undefined) {
      updateObj.courseId = args.courseId
    }

    if (args.subject !== undefined) {
      updateObj.subject = args.subject
    }

    if (args.error !== undefined) {
      updateObj.error = args.error
    }

    await ctx.db.patch(state._id, updateObj)
    return state._id
  },
})
