import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submit = mutation({
  args: { name: v.string(), message: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("guestMessages", { ...args, createdAt: Date.now() });
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    const messages = await ctx.db.query("guestMessages").order("desc").collect();
    return messages.slice(0, 50);
  },
});
