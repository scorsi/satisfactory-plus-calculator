import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function classNames(...classes: ClassValue[]) {
  return twMerge(clsx(...classes));
}
