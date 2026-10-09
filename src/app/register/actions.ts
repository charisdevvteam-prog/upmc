"use server";

import { redirect } from "next/navigation";

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
  const url = process.env.GOOGLE_FORM_URL;

  if (!url) {
    return {
      error:
        "The Google form endpoint is not set yet. Add GOOGLE_FORM_URL and try again.",
    };
  }

  const payload = {
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
    submittedAt: new Date().toISOString(),
  };

  if (
    !payload.title ||
    !payload.name ||
    !payload.email ||
    !payload.phone ||
    !payload.assembly ||
    !payload.heard ||
    !payload.joining ||
    !payload.location ||
    !payload.days
  ) {
    return { error: "Please complete the required fields." };
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    redirect: "follow",
  });

  if (!response.ok) {
    return { error: "Could not submit your registration. Please try again." };
  }

  redirect("/thank-you");
}
