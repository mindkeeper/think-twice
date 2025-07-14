import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function validatepasswordPattern(password) {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isValidLength = password.length >= 8;

  return (
    hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength
  );
}

export function formatPrice(price) {
  return new Intl.NumberFormat("en-US").format(price);
}
