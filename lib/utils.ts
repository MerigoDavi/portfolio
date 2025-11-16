import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina classes do Tailwind CSS de forma inteligente
 * Resolve conflitos entre classes utilitárias
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
