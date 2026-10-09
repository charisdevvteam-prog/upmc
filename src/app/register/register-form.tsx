"use client";

import { AnimatePresence, motion } from "motion/react";
import { useActionState, useState } from "react";
import { easeLuxe } from "@/components/motion";
import { btn } from "@/lib/btn";
import {
  daysAttending,
  hearAboutOptions,
  joiningOptions,
  titles,
} from "@/lib/content";
import { submitRegistration, type RegisterState } from "./actions";

const fieldClass =
  "h-14 w-full rounded-2xl border border-zinc-300 bg-white px-5 text-lg tracking-[-0.02em] outline-none transition placeholder:text-zinc-400 focus:border-accent focus:ring-4 focus:ring-accent/25";
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

function ChoiceBadges({
  value,
  options,
  onChange,
  label,
}: {
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  label: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2.5">
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
  );
}

export function RegisterForm() {
  const [state, action, pending] = useActionState<RegisterState, FormData>(
    submitRegistration,
    {},
  );
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [assembly, setAssembly] = useState("");
  const [heard, setHeard] = useState("");
  const [joining, setJoining] = useState("");
  const [location, setLocation] = useState("");
  const [days, setDays] = useState("");
  const [expectations, setExpectations] = useState("");

  const lastStep = steps.length - 1;
  const canContinue =
    (step === 0 && title && name.trim()) ||
    (step === 1 && email.trim() && phone.trim() && assembly.trim()) ||
    (step === 2 && heard) ||
    (step === 3 && joining) ||
    (step === 4 && location.trim()) ||
    (step === 5 && days);

  return (
    <form action={action}>
      <input type="hidden" name="title" value={title} />
      <input type="hidden" name="name" value={name} />
      <input type="hidden" name="email" value={email} />
      <input type="hidden" name="phone" value={phone} />
      <input type="hidden" name="assembly" value={assembly} />
      <input type="hidden" name="heard" value={heard} />
      <input type="hidden" name="joining" value={joining} />
      <input type="hidden" name="location" value={location} />
      <input type="hidden" name="days" value={days} />
      <input type="hidden" name="expectations" value={expectations} />

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
                    value={title}
                    options={titles}
                    onChange={setTitle}
                  />
                </div>
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Name
                  </label>
                  <input
                    id="name"
                    autoComplete="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className={fieldClass}
                  />
                </div>
              </>
            ) : null}

            {step === 1 ? (
              <>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="assembly" className={labelClass}>
                    Assembly
                  </label>
                  <input
                    id="assembly"
                    value={assembly}
                    onChange={(event) => setAssembly(event.target.value)}
                    className={fieldClass}
                  />
                </div>
              </>
            ) : null}

            {step === 2 ? (
              <ChoiceBadges
                label={steps[2]}
                value={heard}
                options={hearAboutOptions}
                onChange={setHeard}
              />
            ) : null}

            {step === 3 ? (
              <ChoiceBadges
                label={steps[3]}
                value={joining}
                options={joiningOptions}
                onChange={setJoining}
              />
            ) : null}

            {step === 4 ? (
              <div>
                <label htmlFor="location" className={labelClass}>
                  Location
                </label>
                <input
                  id="location"
                  autoComplete="address-level2"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  className={fieldClass}
                />
              </div>
            ) : null}

            {step === 5 ? (
              <ChoiceBadges
                label={steps[5]}
                value={days}
                options={daysAttending}
                onChange={setDays}
              />
            ) : null}

            {step === 6 ? (
              <div>
                <label htmlFor="expectations" className={labelClass}>
                  Expectations <span className="font-normal text-[#6b6b6b]">(optional)</span>
                </label>
                <textarea
                  id="expectations"
                  value={expectations}
                  onChange={(event) => setExpectations(event.target.value)}
                  rows={5}
                  className="w-full rounded-2xl border border-zinc-300 bg-white px-5 py-4 text-lg tracking-[-0.02em] outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/25"
                />
              </div>
            ) : null}
          </div>
        </motion.div>
      </AnimatePresence>

      {state.error ? (
        <p role="alert" className="mt-6 text-base text-red-600">
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
            type="button"
            disabled={!canContinue}
            onClick={() => setStep((value) => value + 1)}
            className={`flex-1 sm:flex-none ${btn({ variant: "primary", size: "lg" })}`}
          >
            Continue
          </button>
        ) : (
          <button
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
