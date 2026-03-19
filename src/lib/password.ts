import { createHash, randomBytes } from "crypto";

export async function hash(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const hashed = createHash("sha256")
    .update(password + salt)
    .digest("hex");
  return `${salt}:${hashed}`;
}

export async function compare(password: string, stored: string): Promise<boolean> {
  const [salt, hashed] = stored.split(":");
  const test = createHash("sha256")
    .update(password + salt)
    .digest("hex");
  return test === hashed;
}
