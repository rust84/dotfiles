const slimDescriptions: Record<string, string> = {
  bash: `Run a bash command. Use \`workdir\` to set directory (not cd). Quote paths with spaces. Timeout: 120000ms default.
Use dedicated tools instead: Glob (not find), Grep (not grep), Read (not cat), Edit (not sed), Write (not echo).
Parallel: multiple Bash calls. Sequential: chain with &&. Never commit/push/amend unless asked.`,
  todowrite: `Manage task list. States: pending, in_progress, completed, cancelled. One in_progress at a time.`,
  task: `Launch agent for complex tasks. {agents}
Set subagent_type. Summarize results for user. Pass task_id to resume. Use Read/Glob for simple file lookups instead.`,
  multiedit: `Multiple edits to one file atomically. Array of oldString/newString pairs applied in sequence. All succeed or none apply. Read file first.`,
  edit: `Exact string replacement. Read file first. Preserve indentation. Fails on no match or multiple matches. replaceAll for renaming.`,
  read: `Read file/directory. Absolute paths. offset for later sections. Grep for search. Parallel for multiple files.`,
  glob: `Find files by glob pattern. Returns paths sorted by modification time.`,
  grep: `Search file contents by regex with include filter. Returns paths and line numbers.`,
  write: `Write/overwrite file. Read existing files first. Prefer editing over new files.`,
  webfetch: `Fetch URL content as markdown/text/html. Read-only.`,
  websearch: `Web search. Current year: {{year}}. Types: auto, fast, deep.`,
  codesearch: `Search code examples and API docs. Token count: 1000-50000 (default 5000).`,
  question: `Ask user a question with options. multiple:true for multi-select.`,
  lsp: `LSP operations: goToDefinition, findReferences, hover, documentSymbol, workspaceSymbol. Needs filePath, line, character (1-based).`,
  batch: `Run 1-25 independent tool calls concurrently. Format: [{"tool":"name","parameters":{...}}]. Not for dependent operations.`,
  apply_patch: `Patch format edits. Headers: Add/Delete/Update File. Prefix new lines with +. Wrap in *** Begin Patch / *** End Patch.`,
  "plan-enter": `Switch to plan agent for research/design before implementation.`,
  "plan-exit": `Exit plan agent, switch to build.`,
  todoread: `Read current todo list. No parameters.`,
  ls: `List files/directories. Prefer Glob/Grep for targeted searches.`,
  perplexity_perplexity_search: `Web search returning ranked results (title/url/snippet/date). Params: { query: string | string[], max_results?: number, max_tokens_per_page?: number, country?: string }.`,
}

export default async ({ directory }: { directory: string }) => {
  const agentBySession = new Map<string, string>()
  const ENV_MARKER = "You are powered by the model"

  const minimalEnv = [
    `<env>`,
    `  Working directory: ${directory}`,
    `  Platform: ${process.platform}`,
    `  Date: ${new Date().toDateString()}`,
    `</env>`,
  ].join("\n")

  return {
    "experimental.chat.messages.transform": async (
      _input: any,
      output: { messages: any[] },
    ) => {
      const last = output.messages?.findLast?.((m: any) => m.info?.role === "user")
      if (last?.info?.agent) agentBySession.set(last.info.sessionID, last.info.agent)
    },

    "experimental.chat.system.transform": async (
      input: { sessionID?: string; model: { providerID: string; id: string } },
      output: { system: string[] },
    ) => {
      if (input.model.providerID !== "llama-server") return

      const idx = output.system[0].indexOf(ENV_MARKER)
      if (idx === -1) return

      const agentPrompt = output.system[0].slice(0, idx).trimEnd()
      output.system[0] = `${agentPrompt}\n\n${minimalEnv}`
    },

    "tool.definition": async (
      input: { toolID: string },
      output: { description: string; parameters: any },
    ) => {
      let slim = slimDescriptions[input.toolID]
      if (slim) {
        if (input.toolID === "task" && slim.includes("{agents}")) {
          const agentLines = output.description.match(/^- \w[\w-]*: .+$/gm)
          if (agentLines) {
            slim = slim.replace("{agents}", agentLines.map(l => l.replace(/: .+/, "")).join(", ") + ".")
          }
        }
        output.description = slim
      }
    },
  }
}
