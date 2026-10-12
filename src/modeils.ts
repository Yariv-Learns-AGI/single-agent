import "dotenv/config"
import { initChatModel } from "langchain"

export const model = await initChatModel("gpt-4o", {
  temperature: 0.3,
  timeout: 60_000,
})
