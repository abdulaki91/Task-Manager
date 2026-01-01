import { execSync } from "child_process";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

try {
  execSync("git add .", { stdio: "inherit" });

  const diff = execSync("git diff --cached").toString();
  if (!diff) {
    console.log("No changes to commit");
    process.exit(0);
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `Write a concise Git commit message for the following code changes:\n${diff}`,
      },
    ],
    max_tokens: 50,
  });

  const commitMessage = response.choices[0].message.content.trim();
  execSync(`git commit -m "${commitMessage}"`, { stdio: "inherit" });

  console.log("Committed with AI-generated message:", commitMessage);
} catch (err) {
  console.error("Error:", err.message);
}
