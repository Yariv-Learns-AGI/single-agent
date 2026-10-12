import { HumanMessage } from "@langchain/core/messages"
import { researchAgent } from "./agents/research-agent"

const topic = process.argv[2] ?? "The rise of edge computing"

console.log(`🔎 Researching: ${topic}\n`)

const result = await researchAgent.invoke({
  messages: [new HumanMessage(`Research this topic: ${topic}`)],
})

console.log(result.messages.at(-1)?.content)

for (const message of result.messages) {
  const type = message.getType()
  console.log(`[${type}] ${String(message.content).slice(0, 120)}\n`)
}
