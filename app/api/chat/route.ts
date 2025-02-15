import { type CoreMessage, streamText } from "ai"
import { openai } from "@ai-sdk/openai"

// Check if the OpenAI API key is set
if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY environment variable")
}

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json()

  const result = streamText({
    model: openai("gpt-4-turbo"),
    system: "You are a helpful assistant.",
    messages,
  })

  return result.toDataStreamResponse()
}

