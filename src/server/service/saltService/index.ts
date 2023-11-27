"use server";
import * as crypto from "crypto";

export async function generateRandomSalt(length: number = 8) {
  const randomBytes = crypto.randomBytes(length);
  return randomBytes.toString("hex");
}
