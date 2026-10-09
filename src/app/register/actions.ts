"use server";

import { redirect } from "next/navigation";
import { getSql } from "@/lib/db";

export type RegisterState = {
  error?: string;
};

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

export async function submitRegistration(
  _prev: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const entry = {
    title: field(formData, "title"),
    name: field(formData, "name"),
    email: field(formData, "email"),
    phone: field(formData, "phone"),
    assembly: field(formData, "assembly"),
    heard: field(formData, "heard"),
    joining: field(formData, "joining"),
    location: field(formData, "location"),
    days: field(formData, "days"),
    expectations: field(formData, "expectations"),
  };

  if (
    !entry.title ||
    !entry.name ||
    !entry.email ||
    !entry.phone ||
    !entry.assembly ||
    !entry.heard ||
    !entry.joining ||
    !entry.location ||
    !entry.days
  ) {
    return { error: "Please complete the required fields." };
  }

  try {
    const sql = getSql();
    await sql`
      insert into registrations
        (title, name, email, phone, assembly, heard, joining, location, days, expectations)
      values
        (${entry.title}, ${entry.name}, ${entry.email}, ${entry.phone}, ${entry.assembly},
         ${entry.heard}, ${entry.joining}, ${entry.location}, ${entry.days},
         ${entry.expectations || null})
    `;
  } catch (error) {
    console.error("Registration insert failed", error);
    return { error: "Could not submit your registration. Please try again." };
  }

  redirect("/thank-you");
}
