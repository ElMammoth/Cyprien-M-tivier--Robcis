"use client";

import { Locale, VisitorType } from "./translations";

const VISITOR_KEY = "portfolio-visitor-type";
const LOCALE_KEY = "portfolio-locale";

export function getVisitorType(): VisitorType | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(VISITOR_KEY) as VisitorType | null;
}

export function setVisitorType(type: VisitorType) {
  localStorage.setItem(VISITOR_KEY, type);
}

export function getLocale(): Locale {
  if (typeof window === "undefined") return "en";
  return (localStorage.getItem(LOCALE_KEY) as Locale) || "en";
}

export function setLocale(locale: Locale) {
  localStorage.setItem(LOCALE_KEY, locale);
}
