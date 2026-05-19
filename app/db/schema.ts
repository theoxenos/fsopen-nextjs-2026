import {boolean, integer, pgTable, serial, text} from "drizzle-orm/pg-core"
import {relations} from "drizzle-orm";

export const blogs = pgTable("blogs", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    author: text("author").notNull(),
    url: text("url"),
    likes: integer("likes").notNull().default(0),
    userId: integer("user_id").references(() => users.id).notNull(),
});

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    username: text("username").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    token: text("token"),
});

export const readingList = pgTable("reading_list", {
    id: serial("id").primaryKey(),
    blogId: integer("blog_id").references(() => blogs.id).notNull(),
    userId: integer("user_id").references(() => users.id).notNull(),
    read: boolean("read").notNull().default(false),
});

export const blogsRelations = relations(blogs, ({one}) => ({
    user: one(users, {
        fields: [blogs.userId],
        references: [users.id],
    }),
}));

export const usersRelations = relations(users, ({many}) => ({
    blogs: many(blogs),
}));

export const readingListRelations = relations(readingList, ({one}) => ({
    blog: one(blogs, {
        fields: [readingList.blogId],
        references: [blogs.id],
    }),
    user: one(users, {
        fields: [readingList.userId],
        references: [users.id],
    }),
}));