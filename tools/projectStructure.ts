// .kilocode/tools/projectStructure.ts
import fs from "fs";
import path from "path";

export default async function projectStructure() {
  const cwd = process.cwd();

  return {
    framework: fs.existsSync("vite.config.ts") ? "vite" : "unknown",
    srcDirs: fs.readdirSync(cwd).filter(d =>
      ["src", "packages", "apps"].includes(d)
    ),
    hasPinia: fs.existsSync("src/store") || fs.existsSync("src/stores"),
    hasRouter: fs.existsSync("src/router"),
    uiLibs: [
      fs.existsSync("node_modules/element-plus") && "element-plus",
      fs.existsSync("node_modules/antd") && "antd",
    ].filter(Boolean),
  };
}
