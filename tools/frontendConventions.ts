export default async function frontendConventions() {
  return {
    vue: {
      version: 3,
      script: "script-setup",
      state: "pinia",
    },
    typescript: {
      strict: true,
      allowAny: false,
    },
    style: {
      preferCompositionApi: true,
      noOptionsApi: true,
    },
  };
}
