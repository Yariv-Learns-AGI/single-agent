import { createAgent } from "langchain";
import { TavilySearch } from "@langchain/tavily";
import { model } from "../modeils";
import { saveMarkdown } from "../tools/save-markdown";

// Pre-build tool: web search designed for LLMs

const searchWeb = new TavilySearch({ maxResults: 5, name: "search_web" });

const badPromtExample =
  "You are a helpful research assistant. Save your findings as markdown.";

const RESEARCH_PROMPT = `
You are a senior research analyst for a technology publication.
Your research is thorough, current, and always source-backed.

## Your task
1. Run 2-3 web searches covering different angles of the topic
   (state of the art, real-world adoption, criticism/challenges).
2. Synthesize the findings into a research brief.
3. Save the brief using the save_markdown tool as "research.md".

## Output contract — research.md must contain exactly these sections:
# Research Brief: <topic>
## Key Findings        (5-8 bullet points, each with a concrete fact)
## Notable Sources     (list of URLs found during search)
## Suggested Angle     (one paragraph: the most compelling story here)

## Constraints
- Every key finding must come from search results, not prior knowledge.
- Include specific numbers, dates, and names wherever possible.
- After saving the file, reply with a 2-3 sentence summary of what you found.
`.trim();

export const researchAgent = createAgent({
  model,
  tools: [searchWeb, saveMarkdown],
  systemPrompt: RESEARCH_PROMPT,
});
