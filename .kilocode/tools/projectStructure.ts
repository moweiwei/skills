// .kilocode/tools/projectStructure.ts
import fs from "fs";
import path from "path";

/**
 * 分析项目结构
 * 检测 Vben Admin + Element Plus 项目的目录结构和配置
 */
export default async function projectStructure() {
  const cwd = process.cwd();

  // 检测构建工具
  const framework = fs.existsSync(path.join(cwd, "vite.config.ts"))
    ? "vite"
    : fs.existsSync(path.join(cwd, "turbo.json"))
    ? "turbo"
    : "unknown";

  // 检测源码目录
  const srcDirs = fs.readdirSync(cwd).filter(d =>
    ["src", "packages", "apps"].includes(d)
  );

  // 检测主应用目录
  const mainAppPath = path.join(cwd, "apps/web-antd");
  const hasMainApp = fs.existsSync(mainAppPath);

  // 检测状态管理
  const hasPinia = 
    fs.existsSync(path.join(cwd, "apps/web-antd/src/store")) || 
    fs.existsSync(path.join(cwd, "apps/web-antd/src/stores"));

  // 检测路由
  const hasRouter = fs.existsSync(path.join(cwd, "apps/web-antd/src/router"));

  // 检测 UI 库
  const uiLibs = [
    fs.existsSync(path.join(cwd, "node_modules/element-plus")) && "element-plus",
    fs.existsSync(path.join(cwd, "node_modules/ant-design-vue")) && "ant-design-vue",
    fs.existsSync(path.join(cwd, "node_modules/@vben/common-ui")) && "@vben/common-ui",
  ].filter(Boolean);

  // 检测 Vben 相关包
  const vbenPackages = [
    fs.existsSync(path.join(cwd, "packages/@vben/common-ui")) && "@vben/common-ui",
    fs.existsSync(path.join(cwd, "packages/@vben/layouts")) && "@vben/layouts",
    fs.existsSync(path.join(cwd, "packages/@vben/hooks")) && "@vben/hooks",
    fs.existsSync(path.join(cwd, "packages/@vben/utils")) && "@vben/utils",
  ].filter(Boolean);

  // 检测主要目录结构
  const mainAppStructure = hasMainApp ? {
    api: fs.existsSync(path.join(mainAppPath, "src/api")),
    components: fs.existsSync(path.join(mainAppPath, "src/components")),
    views: fs.existsSync(path.join(mainAppPath, "src/views")),
    router: fs.existsSync(path.join(mainAppPath, "src/router")),
    store: fs.existsSync(path.join(mainAppPath, "src/store")),
    utils: fs.existsSync(path.join(mainAppPath, "src/utils")),
    locales: fs.existsSync(path.join(mainAppPath, "src/locales")),
    assets: fs.existsSync(path.join(mainAppPath, "src/assets")),
  } : null;

  // 检测配置文件
  const configFiles = {
    vite: fs.existsSync(path.join(cwd, "vite.config.ts")),
    turbo: fs.existsSync(path.join(cwd, "turbo.json")),
    tsconfig: fs.existsSync(path.join(cwd, "tsconfig.json")),
    packageJson: fs.existsSync(path.join(cwd, "package.json")),
    pnpmWorkspace: fs.existsSync(path.join(cwd, "pnpm-workspace.yaml")),
  };

  // 检测是否为 monorepo
  const isMonorepo = configFiles.pnpmWorkspace || configFiles.turbo;

  return {
    // 基础信息
    framework,
    isMonorepo,
    srcDirs,
    
    // 主应用
    hasMainApp,
    mainAppPath: hasMainApp ? "apps/web-antd" : null,
    mainAppStructure,
    
    // 状态管理和路由
    hasPinia,
    hasRouter,
    
    // UI 库
    uiLibs,
    primaryUI: uiLibs.includes("element-plus") ? "element-plus" : uiLibs[0],
    
    // Vben 框架
    vbenPackages,
    isVbenProject: vbenPackages.length > 0,
    
    // 配置文件
    configFiles,
    
    // 推荐的文件路径
    paths: {
      api: "apps/web-antd/src/api",
      components: "apps/web-antd/src/components",
      views: "apps/web-antd/src/views",
      router: "apps/web-antd/src/router/routes/modules",
      store: "apps/web-antd/src/store",
      utils: "apps/web-antd/src/utils",
      locales: "apps/web-antd/src/locales",
      adapter: "apps/web-antd/src/adapter",
    },
  };
}
