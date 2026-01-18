import fg from "fast-glob";

export default async function findComponent(name: string) {
  const files = await fg([
    `src/**/*${name}*.vue`,
    `src/**/*${name}*.tsx`,
    `src/**/*${name}*.jsx`,
  ]);

  return files.slice(0, 10);
}
