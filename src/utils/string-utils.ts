export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toKebabCase(str: string) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

export function toSpaceCase(str: string) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[\s_]+/g, ' ')
    .replace(/[\s-]+/g, ' ')
    .toLowerCase();
}

export function toCapitalizedSpaceCase(str: string) {
  return toSpaceCase(str).split(' ').map(capitalize).join(' ');
}
