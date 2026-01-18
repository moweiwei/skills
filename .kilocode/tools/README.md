# Kilocode Tools

这些工具为 Kilocode AI 提供项目上下文信息，帮助 AI 更好地理解和辅助开发 Vben Admin + Element Plus 项目。

## 工具列表

### 1. findComponent.ts

**功能**：查找项目中的组件文件

**用途**：
- 快速定位 Vue/TSX/JSX 组件
- 支持模糊匹配组件名称
- 优先显示主应用中的组件
- 自动排除 node_modules 和构建产物

**返回**：匹配的组件文件路径列表（最多10个）

**示例**：
```typescript
// 查找名称包含 "form" 的组件
await findComponent("form");
// 返回: ["apps/web-antd/src/views/xxx/modules/form.vue", ...]
```

---

### 2. frontendConventions.ts

**功能**：定义前端开发规范和约定

**用途**：
- 提供 Vue 3 + TypeScript 开发规范
- 定义 Element Plus 使用规范
- 说明 Vben Admin 框架约定
- 指导命名规范和文件组织

**返回**：包含以下规范的对象
- Vue 配置（版本、语法、状态管理）
- TypeScript 配置（严格模式、类型规范）
- 编码风格（Composition API、导入顺序）
- UI 库规范（Element Plus + Vben 组件）
- 命名规范（组件、文件、变量）
- 文件组织（页面结构、模块组织）
- API 调用规范
- 表单和表格规范
- 国际化和路由规范

**示例**：
```typescript
const conventions = await frontendConventions();
// conventions.vue.script === "script-setup"
// conventions.ui.library === "element-plus"
// conventions.naming.component === "PascalCase"
```

---

### 3. projectStructure.ts

**功能**：分析项目结构和配置

**用途**：
- 检测项目类型（Vite、Turbo monorepo）
- 识别源码目录结构
- 检测已安装的 UI 库
- 分析 Vben 框架配置
- 提供推荐的文件路径

**返回**：包含以下信息的对象
- 构建工具（vite/turbo）
- 是否为 monorepo
- 源码目录列表
- 主应用路径和结构
- 状态管理和路由配置
- UI 库列表
- Vben 包列表
- 配置文件检测
- 推荐的文件路径

**示例**：
```typescript
const structure = await projectStructure();
// structure.framework === "vite"
// structure.isMonorepo === true
// structure.primaryUI === "element-plus"
// structure.paths.api === "apps/web-antd/src/api"
```

---

### 4. uiLibrary.ts

**功能**：定义 UI 库使用规范

**用途**：
- 说明 Element Plus 组件使用方式
- 定义 Vben 封装组件的优先级
- 提供组件导入示例
- 说明最佳实践
- 指导常见场景的实现

**返回**：包含以下信息的对象
- 主要 UI 库（element-plus）
- Element Plus 组件映射
- Vben 封装组件（优先使用）
- 导入方式
- 主题配置
- 图标系统
- 最佳实践
- 常见场景实现

**示例**：
```typescript
const ui = await uiLibrary();
// ui.primary === "element-plus"
// ui.usage.form === "el-form"
// ui.vbenComponents.form.hook === "useVbenForm"
// ui.bestPractices.priority === "Vben Components > Element Plus Components"
```

---

## 使用场景

### 场景 1：创建新页面

AI 会使用这些工具来：
1. 通过 `projectStructure` 确定文件应该放在哪里
2. 通过 `frontendConventions` 了解命名和组织规范
3. 通过 `uiLibrary` 选择合适的组件
4. 通过 `findComponent` 查找类似的现有组件作为参考

### 场景 2：重构组件

AI 会使用这些工具来：
1. 通过 `findComponent` 定位需要重构的组件
2. 通过 `frontendConventions` 确保符合项目规范
3. 通过 `uiLibrary` 使用正确的组件和最佳实践

### 场景 3：解决问题

AI 会使用这些工具来：
1. 通过 `projectStructure` 理解项目结构
2. 通过 `frontendConventions` 检查是否符合规范
3. 通过 `findComponent` 查找相关组件
4. 通过 `uiLibrary` 确认正确的使用方式

---

## 技术栈

- **框架**：Vue 3 + TypeScript
- **构建工具**：Vite + Turbo (monorepo)
- **UI 库**：Element Plus
- **管理框架**：Vben Admin
- **状态管理**：Pinia
- **路由**：Vue Router
- **表格**：vxe-table（通过 Vben 封装）
- **表单**：Vben Form（基于 Element Plus）

---

## 开发规范要点

### 优先级

1. **Vben 封装组件** > Element Plus 原生组件
   - 表单：使用 `useVbenForm` 而不是 `el-form`
   - 表格：使用 `useVbenVxeGrid` 而不是 `el-table`
   - 弹窗：使用 `useVbenModal` 而不是 `el-dialog`
   - 抽屉：使用 `useVbenDrawer` 而不是 `el-drawer`

2. **Composition API** > Options API
   - 使用 `<script setup>` 语法
   - 使用组合式函数（Composables）

3. **TypeScript 严格模式**
   - 禁止使用 `any`
   - 明确的类型定义

### 文件组织

```
apps/web-antd/src/views/xxx/
├── index.vue          # 主页面
├── data.ts            # 配置和常量
└── modules/           # 子组件
    ├── form.vue       # 表单组件
    └── detail.vue     # 详情组件
```

### 命名规范

- 组件名：`PascalCase`（如 `UserForm.vue`）
- 文件名：`kebab-case`（如 `user-form.vue`）
- 变量名：`camelCase`（如 `userName`）
- 常量名：`UPPER_SNAKE_CASE`（如 `MAX_COUNT`）

---

## 维护说明

这些工具文件应该随着项目的发展而更新：

1. **添加新的 UI 组件**：更新 [`uiLibrary.ts`](.kilocode/tools/uiLibrary.ts)
2. **修改项目结构**：更新 [`projectStructure.ts`](.kilocode/tools/projectStructure.ts)
3. **调整开发规范**：更新 [`frontendConventions.ts`](.kilocode/tools/frontendConventions.ts)
4. **优化组件查找**：更新 [`findComponent.ts`](.kilocode/tools/findComponent.ts)

---

## 相关资源

- [Vben Admin 文档](https://doc.vben.pro/)
- [Element Plus 文档](https://element-plus.org/)
- [Vue 3 文档](https://vuejs.org/)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [Vite 文档](https://vitejs.dev/)
