import { Plugin } from "@opencode/plugin"

const slimDescriptions: Record<string, string> = {
  bash: `Run a bash command. Use \`workdir\` to set directory (not cd). Quote paths with spaces. Timeout: 120000ms default.
Use dedicated tools instead: Glob (not find), Grep (not grep), Read (not cat), Edit (not sed), Write (not echo).
Parallel: multiple Bash calls. Sequential: chain with &&. Never commit/push/amend unless asked.`,
  todowrite: `Manage task list. States: pending, in_progress, completed, cancelled. One in_progress at a time.`,
  edit: `Exact string replacement. Read file first. Preserve indentation. Fails on no match or multiple matches. replaceAll for renaming.`,
  read: `Read file/directory. Absolute paths. offset for later sections. Grep for search. Parallel for multiple files.`,
  glob: `Find files by glob pattern. Returns paths sorted by modification time.`,
  grep: `Search file contents by regex with include filter. Returns paths and line numbers.`,
  write: `Write/overwrite file. Read existing files first. Prefer editing over new files.`,
  webfetch: `Fetch URL content as markdown/text/html. Read-only.`,
  question: `Ask user a question with options. multiple:true for multi-select.`,
  perplexity_perplexity_search: `Web search returning ranked results (title/url/snippet/date). Params: { query: string | string[], max_results?: number, max_tokens_per_page?: number, country?: string }.`,
}

const ENV_MARKER = "You are powered by the model"

export default Plugin.define({
  id: "debloat",
  async setup(ctx) {
    const directory = ctx.location.directory

    const minimalEnv = [
      `<env>`,
      `  Working directory: ${directory}`,
      `  Platform: ${process.platform}`,
      `  Date: ${new Date().toDateString()}`,
      `</env>`,
    ].join("\n")

    // V1 `experimental.chat.system.transform` -> V2 `context` hook on the system parts.
    // Scoped to the llama-swap provider (was the `providerID !== "llama-swap"` guard).
    await ctx.session.hook(
      "context",
      (event) => {
        const part = event.system.find((p) => p.type === "text" && p.text.includes(ENV_MARKER))
        if (!part || part.type !== "text") return
        const idx = part.text.indexOf(ENV_MARKER)
        const agentPrompt = part.text.slice(0, idx).trimEnd()
        part.text = `${agentPrompt}\n\n${minimalEnv}`
      },
      { providerID: "llama-swap" },
    )

    // V1 `tool.definition` -> V2 `tool` transform (rewrite descriptions).
    await ctx.tool.transform((editor) => {
      for (const [toolID, description] of Object.entries(slimDescriptions)) {
        if (editor.get(toolID)) {
          editor.update(toolID, (tool) => {
            tool.description = description
          })
        }
      }
    })
  },
})
