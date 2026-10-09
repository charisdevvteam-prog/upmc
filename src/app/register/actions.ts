"use server";

import { redirect } from "next/navigation";
import { getSql } from "@/lib/db";
import {
  parseRegistration,
  registrationFields,
  type RegistrationErrors,
  type RegistrationInput,
} from "@/lib/registration";

export type RegisterState = {
  error?: string;
  fieldErrors?: RegistrationErrors;
};

const MAX_RAW_LENGTH = 2000;

function readInput(formData: FormData): RegistrationInput | null {
  const input = {} as RegistrationInput;
  for (const field of registrationFields) {
    const value = formData.get(field);
    if (value !== null && typeof value !== "string") return null;
    if ((value ?? "").length > MAX_RAW_LENGTH) return null;
    input[field] = value ?? "";
  }
  return input;
}

function databaseErrorCode(error: unknown) {
  if (typeof error === "object" && error !== null && "code" in error) {
    return String((error as { code: unknown }).code);
  }
  return undefined;
}

export async function submitRegistration(
  _prev: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  if (String(formData.get("website") ?? "") !== "") {
    redirect("/thank-you");
  }

  const input = readInput(formData);
  if (!input) {
    return { error: "Some answers are too long. Please shorten them and try again." };
  }

  const parsed = parseRegistration(input);
  if (!parsed.ok) {
    return {
      error: "Please check the highlighted answers.",
      fieldErrors: parsed.errors,
    };
  }

  const entry = parsed.data;

  try {
    const sql = getSql();
    await sql`
      insert into registrations
        (title, name, email, phone, assembly, heard, joining, location, days, expectations)
      values
        (${entry.title}, ${entry.name}, ${entry.email}, ${entry.phone}, ${entry.assembly},
         ${entry.heard}, ${entry.joining}, ${entry.location}, ${entry.days},
         ${entry.expectations})
    `;
  } catch (error) {
    const code = databaseErrorCode(error);
    if (code === "23505") {
      return {
        error: `${entry.name} is already registered with ${entry.email}. You're all set.`,
      };
    }
    if (code === "23514" || code === "22001") {
      return { error: "Some answers aren't in the expected format. Please review them." };
    }
    console.error("Registration insert failed", { code });
    return {
      error: "We couldn't save your registration right now. Please try again in a moment.",
    };
  }

  redirect("/thank-you");
}
