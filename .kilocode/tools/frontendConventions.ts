/**
 * 前端开发规范
 * 定义 Vben Admin + Element Plus 项目的开发约定和最佳实践
 */
export default async function frontendConventions() {
  return {
    // Vue 相关配置
    vue: {
      version: 3,
      script: "script-setup", // 使用 <script setup> 语法
      state: "pinia", // 状态管理使用 Pinia
      composition: true, // 优先使用 Composition API
    },
    
    // TypeScript 配置
    typescript: {
      strict: true, // 严格模式
      allowAny: false, // 禁止使用 any
      preferType: true, // 优先使用 type 而不是 interface（除非需要扩展）
    },
    
    // 编码风格
    style: {
      preferCompositionApi: true, // 优先使用 Composition API
      noOptionsApi: true, // 不使用 Options API
      useScriptSetup: true, // 使用 <script setup>
      importOrder: [
        "type imports", // 类型导入放在最前
        "vue", // Vue 核心
        "third-party", // 第三方库
        "vben", // Vben 框架
        "element-plus", // Element Plus
        "local", // 本地模块
      ],
    },
    
    // UI 库规范
    ui: {
      library: "element-plus",
      version: "latest",
      // 常用组件映射
      components: {
        form: "el-form",
        table: "el-table",
        dialog: "el-dialog",
        drawer: "el-drawer",
        button: "el-button",
        input: "el-input",
        select: "el-select",
        datePicker: "el-date-picker",
        switch: "el-switch",
        pagination: "el-pagination",
      },
      // 但在 Vben 项目中，优先使用 Vben 封装的组件
      vbenComponents: {
        form: "useVbenForm",
        table: "useVbenVxeGrid",
        modal: "useVbenModal",
        drawer: "useVbenDrawer",
      },
    },
    
    // 命名规范
    naming: {
      component: "PascalCase", // 组件名使用大驼峰
      file: "kebab-case", // 文件名使用短横线
      variable: "camelCase", // 变量使用小驼峰
      constant: "UPPER_SNAKE_CASE", // 常量使用大写下划线
      type: "PascalCase", // 类型使用大驼峰
    },
    
    // 文件组织
    fileStructure: {
      // 页面组件结构
      page: {
        index: "index.vue", // 主文件
        data: "data.ts", // 配置和常量
        modules: "modules/", // 子组件目录
        api: "#/api/xxx", // API 调用
      },
      // 模块组件
      module: {
        form: "modules/form.vue", // 表单组件
        detail: "modules/detail.vue", // 详情组件
      },
    },
    
    // API 调用规范
    api: {
      location: "apps/web-antd/src/api", // API 文件位置
      naming: {
        list: "getXxxPage", // 分页列表
        detail: "getXxxDetail", // 详情
        create: "createXxx", // 创建
        update: "updateXxx", // 更新
        delete: "deleteXxx", // 删除
        export: "exportXxx", // 导出
      },
    },
    
    // 表单规范
    form: {
      // 使用 Vben 的 useVbenForm
      useVbenForm: true,
      // 表单配置分离到 data.ts
      separateSchema: true,
      // 验证规则
      validation: {
        required: "required",
        email: "email",
        custom: "使用 zod 进行复杂验证",
      },
    },
    
    // 表格规范
    table: {
      // 使用 Vben 的 useVbenVxeGrid
      useVbenVxeGrid: true,
      // 列配置分离到 data.ts
      separateColumns: true,
      // 操作列固定在右侧
      actionsFixed: "right",
    },
    
    // 国际化
    i18n: {
      use: true,
      function: "$t", // 使用 $t 函数
      location: "apps/web-antd/src/locales",
    },
    
    // 路由规范
    router: {
      location: "apps/web-antd/src/router/routes/modules",
      naming: "kebab-case",
      meta: {
        title: "必填 - 页面标题",
        icon: "可选 - 菜单图标",
        auth: "可选 - 权限码",
      },
    },
  };
}
