"use server";
import * as crypto from "crypto";

export async function generateRandomSalt(length: number = 8) {
  const randomBytes = crypto.randomBytes(length);
  return randomBytes.toString("hex");
}

export async function generateDateSalt() {
  const salt = (await getCurrentDateOnly()).getTime().toString(16);
  return salt;
}

function getCurrentDateOnly() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();

  const dateOnly = new Date(year, month, day);

  return dateOnly;
}
