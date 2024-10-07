// src/services/llmService.js
const OpenAI = require("openai");
const { z } = require("zod");
const { zodFunction } = require("openai/helpers/zod");

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define the list of accepted body types
const bodyTypes = [
  "Sedan",
  "Hatchback",
  "SUV",
  "Coupe",
  "Convertible",
  "Wagon",
  "Truck (Crew Cab)",
  "Truck (Extended Cab)",
  "Ext Van",
  "Van",
  "Truck (Double Cab)",
  "Truck (Regular Cab)",
  "Minivan",
  "Truck (SuperCrew)",
  "Truck (SuperCab)",
  "Truck (King Cab)",
  "Truck (Quad Cab)",
  "Truck (Mega Cab)",
  "Truck (Xtracab)",
  "Truck (Access Cab)",
  "Truck (CrewMax)",
];

// Define the Zod schema for car preferences
const CarPreferences = z.object({
  minPrice: z.number().optional().describe("Minimum price of the car"),
  maxPrice: z.number().optional().describe("Maximum price of the car"),
  bodyType: z
    .enum(bodyTypes)
    .optional()
    .describe("Type of the car body"),
  features: z
    .array(z.string())
    .optional()
    .describe("List of desired features"),
});

// Define the tool (function) using Zod
const tools = [
  zodFunction({
    name: "extractPreferences",
    description: "Extracts car preferences from user input.",
    parameters: CarPreferences,
  }),
];

// Map tool names to their corresponding Zod schemas
const toolSchemas = {
  extractPreferences: CarPreferences,
};

const extractPreferences = async (userInput) => {
  try {
    const messages = [
      {
        role: "system",
        content: `You are an assistant that extracts car preferences from user input. return the data in the schema required.
        For price keep min price at 0 unless the user gives a price range.
        For body types use the tool that available and map the user input to one of the options.
        Provide the extracted preferences in JSON format that matches the function schema.`,
      },
      { role: "user", content: userInput },
    ];

    // First API call to get the assistant's response and any tool calls
    const response = await openai.chat.completions.create({
      model: "gpt-4o-2024-08-06", // Use the latest model that supports tool calling
      messages: messages,
      tools: tools,
      tool_choice: "auto",
    });

    const choice = response.choices?.[0];
    const message = choice.message;
    const toolCalls = message.tool_calls;

    let preferences = null;

    // Handle each tool call
    for (const toolCall of toolCalls) {
      const toolName = toolCall.function.name;
      const argumentsStr = toolCall.function.arguments;

      // Get the Zod schema for the tool
      const argsSchema = toolSchemas[toolName];
      // Parse the arguments using the Zod schema
      const args = argsSchema.parse(JSON.parse(argumentsStr));

      // Execute the tool based on the tool name
      switch (toolName) {
        case "extractPreferences":
          preferences = args;
          break;
        default:
          throw new Error(`Unknown tool called: ${toolName}`);
      }

      // Add the assistant's message with the tool call to messages
      messages.push(message);

      // Add the tool's response to messages
      messages.push({
        role: "tool",
        content: JSON.stringify(preferences),
        tool_call_id: toolCall.id,
      });
    }

    if (!preferences) {
      throw new Error("No preferences extracted.");
    }

    console.log("Extracted Preferences:", preferences);
    return preferences;
  } catch (error) {
    console.error("Error extracting preferences:", error);
    throw new Error("Failed to extract preferences from user input");
  }
};

module.exports = { extractPreferences };


