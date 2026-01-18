import fg from "fast-glob";

/**
 * 查找组件文件
 * 支持在 Vben Admin + Element Plus 项目中查找 Vue 组件、TSX 组件等
 * @param name 组件名称（支持模糊匹配）
 * @returns 返回匹配的组件文件路径列表（最多10个）
 */
export default async function findComponent(name: string) {
  const files = await fg([
    // 主应用组件
    `apps/web-antd/src/**/*${name}*.vue`,
    `apps/web-antd/src/**/*${name}*.tsx`,
    `apps/web-antd/src/**/*${name}*.jsx`,
    
    // 公共组件库
    `packages/**/src/**/*${name}*.vue`,
    `packages/**/src/**/*${name}*.tsx`,
    `packages/**/src/**/*${name}*.jsx`,
    
    // 排除 node_modules 和构建产物
    `!**/node_modules/**`,
    `!**/dist/**`,
    `!**/.turbo/**`,
  ], {
    cwd: process.cwd(),
    absolute: false,
  });

  // 返回前10个结果，优先显示主应用中的组件
  return files
    .sort((a, b) => {
      const aIsApp = a.startsWith('apps/web-antd');
      const bIsApp = b.startsWith('apps/web-antd');
      if (aIsApp && !bIsApp) return -1;
      if (!aIsApp && bIsApp) return 1;
      return a.localeCompare(b);
    })
    .slice(0, 10);
}
