import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submit = mutation({
  args: {
    name: v.string(),
    attending: v.boolean(),
    guestCount: v.number(),
    companion: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("rsvps", { ...args, createdAt: Date.now() });
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("rsvps").order("desc").collect();
  },
});
