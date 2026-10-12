// Generates the bcrypt hash for ADMIN_PASSWORD_HASH (the first Owner account).
//   npm run admin:hash
// Prompts for the password so it never lands in shell history.
import bcrypt from "bcryptjs";
import { createInterface } from "node:readline";

async function ask(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) =>
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    })
  );
}

const password = await ask("Password for the first admin Owner (10+ characters): ");
if (!password || password.length < 10) {
  console.error("Password must be at least 10 characters.");
  process.exit(1);
}
const hash = await bcrypt.hash(password, 12);
console.log("\nIn Vercel → Settings → Environment Variables:");
console.log("  Key:   ADMIN_PASSWORD_HASH");
console.log("  Value: (copy the line below — it starts with $2b$; do NOT paste your password)\n");
console.log(hash);
console.log("");
