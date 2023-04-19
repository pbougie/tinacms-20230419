import { defineConfig, defineSchema } from "tinacms";

const schema = defineSchema({
  collections: [
    {
      label: "Page Content",
      name: "page",
      path: "content/page",
      format: "mdx",
      fields: [
        {
          name: "body",
          label: "Main Content",
          type: "rich-text",
          isBody: true,
        },
      ],
      ui: {
        router: ({ document }) => {
          if (document._sys.filename === "home") {
            return `/`;
          }
          return undefined;
        },
      },
    },
    {
      label: "Blog Posts",
      name: "post",
      path: "content/post",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "Blog Post Body",
          name: "body",
          isBody: true,
          ui: {
            component: "textarea",
          },
        },
      ],
      ui: {
        router: ({ document }) => {
          return `/posts/${document._sys.filename}`;
        },
      },
    },
    {
      format: "json",
      name: "news",
      label: "News",
      path: "content",
      match: {
        include: "news",
      },
      ui: {
        allowedActions: {
          create: false,
          delete: false,
        },
      },
      fields: [
        {
          type: "object",
          name: "en",
          label: "English",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: `${item?.date} — ${item?.title}` }
            },
          },
          fields: [
            {
              type: "datetime",
              name: "date",
              label: "Date",
              required: true,
              ui: {
                dateFormat: "YYYY-MM-DD",
                parse: (value) => value && value.format("YYYY-MM-DD"),
              },
            },
            {
              type: "string",
              name: "title",
              label: "Title",
              isTitle: true,
              required: true,
            },
            {
              type: "string",
              name: "summary",
              label: "Summary",
              required: true,
              ui: {
                "component": "textarea",
              },
            },
            {
              type: "rich-text",
              name: "body",
              label: "Body",
              isBody: true,
              required: true,
            },
          ],
        },
        {
          type: "object",
          name: "fr",
          label: "French",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: `${item?.date} — ${item?.title}` }
            },
          },
          fields: [
            {
              type: "datetime",
              name: "date",
              label: "Date",
              required: true,
              ui: {
                dateFormat: "YYYY-MM-DD",
                parse: (value) => value && value.format("YYYY-MM-DD"),
              },
            },
            {
              type: "string",
              name: "title",
              label: "Title",
              isTitle: true,
              required: true,
            },
            {
              type: "string",
              name: "summary",
              label: "Summary",
              required: true,
              ui: {
                "component": "textarea",
              },
            },
            {
              type: "rich-text",
              name: "body",
              label: "Body",
              isBody: true,
              required: true,
            },
          ],
        },
      ],
    },
  ],
});

export const config = defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH || // custom branch env override
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || // Vercel branch env
    process.env.HEAD, // Netlify branch env
  token: process.env.TINA_TOKEN,
  media: {
    // If you wanted cloudinary do this
    // loadCustomStore: async () => {
    //   const pack = await import("next-tinacms-cloudinary");
    //   return pack.TinaCloudCloudinaryMediaStore;
    // },
    // this is the config for the tina cloud media store
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },
  build: {
    publicFolder: "public", // The public asset folder for your framework
    outputFolder: "admin", // within the public folder
  },
  schema,
});

export default config;
