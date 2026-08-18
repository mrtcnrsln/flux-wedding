import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

const schema = defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    role: v.optional(roleValidator),
  }).index("email", ["email"]),
  rsvps: defineTable({
    name: v.string(),
    attending: v.boolean(),
    guestCount: v.number(),
    companion: v.optional(v.string()),
    notes: v.optional(v.string()),
    createdAt: v.number(),
  }),
  guestMessages: defineTable({
    name: v.string(),
    message: v.string(),
    createdAt: v.number(),
  }),
}, { schemaValidation: false });

export default schema;
