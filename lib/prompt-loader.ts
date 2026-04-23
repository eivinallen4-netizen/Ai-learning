// Re-export from the TypeScript prompts module
// This avoids filesystem reads in API routes
export { loadPrompt, listPrompts } from './prompts'
