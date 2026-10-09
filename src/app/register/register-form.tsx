"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  useActionState,
  useEffect,
  useState,
  type FormEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
} from "react";
import { easeLuxe } from "@/components/motion";
import { btn } from "@/lib/btn";
import {
  daysAttending,
  hearAboutOptions,
  joiningOptions,
  titles,
} from "@/lib/content";
import {
  formatEmail,
  formatExpectations,
  formatName,
  formatPhone,
  formatPlace,
  limits,
  validateField,
  type RegistrationErrors,
  type RegistrationField,
  type RegistrationInput,
} from "@/lib/registration";
import { submitRegistration, type RegisterState } from "./actions";

const fieldClass =
  "h-14 w-full rounded-2xl border bg-white px-5 text-lg tracking-[-0.02em] outline-none transition placeholder:text-zinc-400 focus:ring-4";
const fieldOk = "border-zinc-300 focus:border-accent focus:ring-accent/25";
const fieldBad = "border-red-500 focus:border-red-500 focus:ring-red-500/20";
const labelClass =
  "mb-3 block text-base font-semibold tracking-[-0.02em] text-zinc-950";

const steps = [
  "What should we call you?",
  "How can we reach you?",
  "How did you hear about the program?",
  "How are you joining the conference?",
  "Where are you joining from?",
  "Which days are you attending?",
  "What are you expecting?",
];

const stepFields: RegistrationField[][] = [
  ["title", "name"],
  ["email", "phone", "assembly"],
  ["heard"],
  ["joining"],
  ["location"],
  ["days"],
  ["expectations"],
];

const formatters: Partial<Record<RegistrationField, (value: string) => string>> = {
  name: formatName,
  email: formatEmail,
  phone: formatPhone,
  assembly: formatPlace,
  location: formatPlace,
  expectations: formatExpectations,
};

const emptyValues: RegistrationInput = {
  title: "",
  name: "",
  email: "",
  phone: "",
  assembly: "",
  heard: "",
  joining: "",
  location: "",
  days: "",
  expectations: "",
};

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm font-medium text-red-600">
      {message}
    </p>
  );
}

function ChoiceBadges({
  value,
  options,
  onChange,
  label,
  error,
  errorId,
}: {
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  label: string;
  error?: string;
  errorId: string;
}) {
  return (
    <div>
      <div
        role="radiogroup"
        aria-label={label}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="flex flex-wrap gap-2.5"
      >
        {options.map((option) => {
          const selected = value === option;
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option)}
              className={`min-h-11 ${btn({ variant: selected ? "primary" : "outline-primary" })}`}
            >
              {option}
            </button>
          );
        })}
      </div>
      <FieldError id={errorId} message={error} />
    </div>
  );
}

export function RegisterForm() {
  const [state, action, pending] = useActionState<RegisterState, FormData>(
    submitRegistration,
    {},
  );
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<RegistrationInput>(emptyValues);
  const [errors, setErrors] = useState<RegistrationErrors>({});

  const lastStep = steps.length - 1;

  useEffect(() => {
    const serverErrors = state.fieldErrors;
    if (!serverErrors) return;
    setErrors(serverErrors);
    const firstBadStep = stepFields.findIndex((fields) =>
      fields.some((field) => serverErrors[field]),
    );
    if (firstBadStep >= 0) setStep(firstBadStep);
  }, [state]);

  const setValue = (field: RegistrationField, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({
        ...current,
        [field]: validateField(field, value),
      }));
    }
  };

  const choose = (field: RegistrationField) => (value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const finishField = (field: RegistrationField) => {
    const raw = values[field];
    const message = validateField(field, raw);
    const format = formatters[field];
    if (!message && format && raw) {
      setValues((current) => ({ ...current, [field]: format(raw) }));
    }
    if (raw || errors[field]) {
      setErrors((current) => ({ ...current, [field]: message }));
    }
  };

  const validateStep = (index: number) => {
    const found: RegistrationErrors = {};
    for (const field of stepFields[index]) {
      const message = validateField(field, values[field]);
      if (message) found[field] = message;
    }
    setErrors((current) => ({ ...current, ...found }));
    const firstBad = stepFields[index].find((field) => found[field]);
    if (firstBad) {
      document.getElementById(firstBad)?.focus();
      return false;
    }
    setValues((current) => {
      const next = { ...current };
      for (const field of stepFields[index]) {
        const format = formatters[field];
        if (format) next[field] = format(next[field]);
      }
      return next;
    });
    return true;
  };

  const goNext = () => {
    if (validateStep(step)) {
      setStep((value) => Math.min(value + 1, lastStep));
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (step < lastStep) {
      event.preventDefault();
      goNext();
      return;
    }
    const firstBadStep = stepFields.findIndex(
      (fields) => !fields.every((field) => !validateField(field, values[field])),
    );
    if (firstBadStep >= 0) {
      event.preventDefault();
      setStep(firstBadStep);
      validateStep(firstBadStep);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    if (
      event.key === "Enter" &&
      event.target instanceof HTMLInputElement &&
      step < lastStep
    ) {
      event.preventDefault();
      goNext();
    }
  };

  const textInput = (
    field: "name" | "email" | "phone" | "assembly" | "location",
    label: string,
    props: InputHTMLAttributes<HTMLInputElement>,
  ) => {
    const errorId = `${field}-error`;
    return (
      <div>
        <label htmlFor={field} className={labelClass}>
          {label}
        </label>
        <input
          id={field}
          value={values[field]}
          onChange={(event) => setValue(field, event.target.value)}
          onBlur={() => finishField(field)}
          aria-invalid={errors[field] ? true : undefined}
          aria-describedby={errors[field] ? errorId : undefined}
          className={`${fieldClass} ${errors[field] ? fieldBad : fieldOk}`}
          {...props}
        />
        <FieldError id={errorId} message={errors[field]} />
      </div>
    );
  };

  const expectationsLength = values.expectations.length;

  return (
    <form
      action={action}
      onSubmit={onSubmit}
      onKeyDown={onKeyDown}
      noValidate
    >
      {(Object.keys(values) as RegistrationField[]).map((field) => (
        <input key={field} type="hidden" name={field} value={values[field]} />
      ))}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="flex items-center justify-between text-sm font-medium tracking-[-0.02em] text-[#6b6b6b]">
        <span>
          Step {step + 1} of {steps.length}
        </span>
        <span>{Math.round(((step + 1) / steps.length) * 100)}%</span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-zinc-100">
        <motion.div
          className="h-full rounded-full bg-accent"
          initial={false}
          animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
          transition={{ duration: 1.1, ease: easeLuxe }}
        />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.9, ease: easeLuxe },
          }}
          exit={{
            opacity: 0,
            y: -16,
            filter: "blur(6px)",
            transition: { duration: 0.45, ease: [0.7, 0, 0.84, 0] },
          }}
        >
          <h2 className="mt-8 text-[2rem] leading-[0.95] font-semibold tracking-[-0.04em] text-zinc-950 sm:mt-10 sm:text-[2.6875rem]">
            {steps[step]}
          </h2>

          <div className="mt-6 grid gap-6 sm:mt-8">
            {step === 0 ? (
              <>
                <div>
                  <p className={labelClass}>Title</p>
                  <ChoiceBadges
                    label="Title"
                    value={values.title}
                    options={titles}
                    onChange={choose("title")}
                    error={errors.title}
                    errorId="title-error"
                  />
                </div>
                {textInput("name", "Full name", {
                  autoComplete: "name",
                  autoCapitalize: "words",
                  placeholder: "e.g. Kwame Mensah",
                  maxLength: limits.name,
                })}
              </>
            ) : null}

            {step === 1 ? (
              <>
                {textInput("email", "Email", {
                  type: "email",
                  inputMode: "email",
                  autoComplete: "email",
                  autoCapitalize: "none",
                  spellCheck: false,
                  placeholder: "you@example.com",
                  maxLength: limits.email,
                })}
                {textInput("phone", "Phone Number", {
                  type: "tel",
                  inputMode: "tel",
                  autoComplete: "tel",
                  placeholder: "e.g. +233 24 123 4567",
                  maxLength: 20,
                })}
                {textInput("assembly", "Assembly", {
                  autoCapitalize: "words",
                  placeholder: "e.g. The Temple of Charis, North Legon",
                  maxLength: limits.assembly,
                })}
              </>
            ) : null}

            {step === 2 ? (
              <ChoiceBadges
                label={steps[2]}
                value={values.heard}
                options={hearAboutOptions}
                onChange={choose("heard")}
                error={errors.heard}
                errorId="heard-error"
              />
            ) : null}

            {step === 3 ? (
              <ChoiceBadges
                label={steps[3]}
                value={values.joining}
                options={joiningOptions}
                onChange={choose("joining")}
                error={errors.joining}
                errorId="joining-error"
              />
            ) : null}

            {step === 4
              ? textInput("location", "Location", {
                  autoComplete: "address-level2",
                  autoCapitalize: "words",
                  placeholder: "e.g. Accra, Ghana",
                  maxLength: limits.location,
                })
              : null}

            {step === 5 ? (
              <ChoiceBadges
                label={steps[5]}
                value={values.days}
                options={daysAttending}
                onChange={choose("days")}
                error={errors.days}
                errorId="days-error"
              />
            ) : null}

            {step === 6 ? (
              <div>
                <label htmlFor="expectations" className={labelClass}>
                  Expectations <span className="font-normal text-[#6b6b6b]">(optional)</span>
                </label>
                <textarea
                  id="expectations"
                  value={values.expectations}
                  onChange={(event) => setValue("expectations", event.target.value)}
                  onBlur={() => finishField("expectations")}
                  maxLength={limits.expectations}
                  rows={5}
                  aria-invalid={errors.expectations ? true : undefined}
                  aria-describedby="expectations-count"
                  className={`w-full rounded-2xl border bg-white px-5 py-4 text-lg tracking-[-0.02em] outline-none transition focus:ring-4 ${errors.expectations ? fieldBad : fieldOk}`}
                />
                <p
                  id="expectations-count"
                  className="mt-2 text-right text-sm text-[#6b6b6b]"
                >
                  {expectationsLength}/{limits.expectations}
                </p>
                <FieldError id="expectations-error" message={errors.expectations} />
              </div>
            ) : null}
          </div>
        </motion.div>
      </AnimatePresence>

      {state.error ? (
        <p
          role="alert"
          className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-base text-red-700"
        >
          {state.error}
        </p>
      ) : null}

      <div className="mt-8 flex gap-3 sm:mt-10">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((value) => value - 1)}
            className={btn({ variant: "outline-secondary", size: "lg" })}
          >
            Back
          </button>
        ) : null}

        {step < lastStep ? (
          <button
            key="continue"
            type="button"
            onClick={goNext}
            className={`flex-1 sm:flex-none ${btn({ variant: "primary", size: "lg" })}`}
          >
            Continue
          </button>
        ) : (
          <button
            key="submit"
            type="submit"
            disabled={pending}
            className={`flex-1 sm:flex-none ${btn({ variant: "primary", size: "lg" })}`}
          >
            {pending ? "Submitting…" : "Submit registration"}
          </button>
        )}
      </div>
    </form>
  );
}
