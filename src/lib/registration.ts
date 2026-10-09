import {
  daysAttending,
  hearAboutOptions,
  joiningOptions,
  titles,
} from "@/lib/content";

export const registrationFields = [
  "title",
  "name",
  "email",
  "phone",
  "assembly",
  "heard",
  "joining",
  "location",
  "days",
  "expectations",
] as const;

export type RegistrationField = (typeof registrationFields)[number];
export type RegistrationInput = Record<RegistrationField, string>;
export type RegistrationErrors = Partial<Record<RegistrationField, string>>;

export type Registration = {
  title: (typeof titles)[number];
  name: string;
  email: string;
  phone: string;
  assembly: string;
  heard: (typeof hearAboutOptions)[number];
  joining: (typeof joiningOptions)[number];
  location: string;
  days: (typeof daysAttending)[number];
  expectations: string | null;
};

export const limits = {
  name: 100,
  email: 254,
  assembly: 120,
  location: 120,
  expectations: 1000,
} as const;

const SMALL_WORDS = new Set([
  "a",
  "an",
  "and",
  "at",
  "by",
  "de",
  "for",
  "in",
  "of",
  "on",
  "the",
  "to",
]);

const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u200B-\u200F\u2028\u2029\uFEFF]/g;
const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M}' .-]*$/u;
const PLACE_PATTERN = /^[\p{L}\p{M}\p{N}][\p{L}\p{M}\p{N}' .,&()/-]*$/u;
const EMAIL_PATTERN = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/;

function clean(value: string) {
  return value.normalize("NFC").replace(CONTROL_CHARS, "");
}

function singleLine(value: string) {
  return clean(value).replace(/\s+/g, " ").trim();
}

function capitalise(word: string) {
  return word
    .split(/([-'’])/)
    .map((part) =>
      /^[-'’]$/.test(part)
        ? part
        : part.charAt(0).toLocaleUpperCase() + part.slice(1),
    )
    .join("");
}

function isShouting(value: string) {
  const letters = value.replace(/[^\p{L}]/gu, "");
  return letters.length > 1 && letters === letters.toLocaleUpperCase();
}

function smartCase(value: string, keepSmallWords: boolean) {
  const shouting = isShouting(value);
  return value
    .split(" ")
    .map((word, index) => {
      const lower = word.toLocaleLowerCase();
      if (keepSmallWords && index > 0 && SMALL_WORDS.has(lower)) return lower;
      const first = word.charAt(0);
      const typedCapitalised =
        first !== first.toLocaleLowerCase() && !shouting;
      return typedCapitalised ? word : capitalise(lower);
    })
    .join(" ");
}

export function formatName(value: string) {
  return smartCase(singleLine(value), false);
}

export function formatPlace(value: string) {
  return smartCase(singleLine(value), true);
}

export function formatEmail(value: string) {
  return singleLine(value).replace(/\s/g, "").toLowerCase();
}

export function formatPhone(value: string) {
  const compact = singleLine(value).replace(/[\s().-]/g, "");
  if (/^00\d+$/.test(compact)) return `+${compact.slice(2)}`;
  if (/^0\d{9}$/.test(compact)) return `+233${compact.slice(1)}`;
  if (/^\d{9}$/.test(compact) && /^[2-5]/.test(compact)) {
    return `+233${compact}`;
  }
  if (/^233\d{9}$/.test(compact)) return `+${compact}`;
  return compact;
}

export function formatExpectations(value: string) {
  return clean(value)
    .replace(/\r\n?/g, "\n")
    .replace(/[^\S\n]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function oneOf<T extends string>(
  options: readonly T[],
  value: string,
): T | undefined {
  return options.find((option): option is T => option === value);
}

export function validateField(
  field: RegistrationField,
  raw: string,
): string | undefined {
  switch (field) {
    case "title":
      return oneOf(titles, raw) ? undefined : "Choose your title.";
    case "name": {
      const value = formatName(raw);
      if (!value) return "Enter your name.";
      if (value.length < 2) return "Your name looks too short.";
      if (value.length > limits.name) {
        return `Keep your name under ${limits.name} characters.`;
      }
      if (!NAME_PATTERN.test(value)) {
        return "Use letters, spaces, hyphens, or apostrophes only.";
      }
      if (value.split(" ").length < 2) {
        return "Enter your first and last name.";
      }
      return undefined;
    }
    case "email": {
      const value = formatEmail(raw);
      if (!value) return "Enter your email address.";
      if (value.length > limits.email || !EMAIL_PATTERN.test(value)) {
        return "Enter a valid email address, like you@example.com.";
      }
      return undefined;
    }
    case "phone": {
      const value = formatPhone(raw);
      if (!value) return "Enter your phone number.";
      if (!/^\+?\d+$/.test(value)) {
        return "Use digits only, with an optional + country code.";
      }
      if (!/^\+[1-9]\d{6,14}$/.test(value)) {
        return "Enter a full number, like 024 123 4567 or +233 24 123 4567.";
      }
      return undefined;
    }
    case "assembly":
    case "location": {
      const value = formatPlace(raw);
      const label = field === "assembly" ? "your assembly" : "where you're joining from";
      if (!value) return `Enter ${label}.`;
      if (value.length < 2) return "That looks too short.";
      if (value.length > limits[field]) {
        return `Keep this under ${limits[field]} characters.`;
      }
      if (!PLACE_PATTERN.test(value)) {
        return "Use letters, numbers, and basic punctuation only.";
      }
      return undefined;
    }
    case "heard":
      return oneOf(hearAboutOptions, raw)
        ? undefined
        : "Choose how you heard about the program.";
    case "joining":
      return oneOf(joiningOptions, raw)
        ? undefined
        : "Choose how you're joining.";
    case "days":
      return oneOf(daysAttending, raw)
        ? undefined
        : "Choose the days you're attending.";
    case "expectations":
      return formatExpectations(raw).length > limits.expectations
        ? `Keep this under ${limits.expectations} characters.`
        : undefined;
  }
}

export function parseRegistration(
  input: RegistrationInput,
):
  | { ok: true; data: Registration; errors?: undefined }
  | { ok: false; errors: RegistrationErrors; data?: undefined } {
  const errors: RegistrationErrors = {};
  for (const field of registrationFields) {
    const message = validateField(field, input[field] ?? "");
    if (message) errors[field] = message;
  }
  if (Object.keys(errors).length > 0) return { ok: false, errors };

  const expectations = formatExpectations(input.expectations);
  return {
    ok: true,
    data: {
      title: oneOf(titles, input.title)!,
      name: formatName(input.name),
      email: formatEmail(input.email),
      phone: formatPhone(input.phone),
      assembly: formatPlace(input.assembly),
      heard: oneOf(hearAboutOptions, input.heard)!,
      joining: oneOf(joiningOptions, input.joining)!,
      location: formatPlace(input.location),
      days: oneOf(daysAttending, input.days)!,
      expectations: expectations || null,
    },
  };
}
