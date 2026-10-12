import { tool } from "langchain"
import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import z from "zod"

const OUTPUT_DIR = "output"

export const saveMarkdown = tool(
  async ({ filename, content }) => {
    await mkdir(OUTPUT_DIR, { recursive: true })

    const filePath = path.join(OUTPUT_DIR, filename)
    await writeFile(filePath, content, "utf-8")

    return `Saved ${content.length} characters to ${filePath}`
  },
  {
    name: "save_markdown",
    description: `Save markdown content to fa file in the output folder.
    Use this to persist your final work product.`,
    schema: z.object({
      filename: z
        .string()
        .describe("File name including the .md extension, e.g. 'research.md'"),
      content: z.string().describe("The full markdown content to save"),
    }),
  },
)
