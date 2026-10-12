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
console.log("\nAdd this to your environment variables (Vercel → Settings → Environment Variables):\n");
console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
