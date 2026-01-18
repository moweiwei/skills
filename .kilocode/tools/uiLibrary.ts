/**
 * UI 库配置
 * 定义 Element Plus 在 Vben Admin 项目中的使用规范
 */
export default async function uiLibrary() {
  return {
    // 主要 UI 库
    primary: "element-plus",
    version: "latest",
    
    // Element Plus 组件使用映射
    usage: {
      // 表单相关
      form: "el-form",
      formItem: "el-form-item",
      input: "el-input",
      inputNumber: "el-input-number",
      select: "el-select",
      option: "el-option",
      datePicker: "el-date-picker",
      timePicker: "el-time-picker",
      switch: "el-switch",
      checkbox: "el-checkbox",
      radio: "el-radio",
      cascader: "el-cascader",
      upload: "el-upload",
      
      // 表格相关
      table: "el-table",
      tableColumn: "el-table-column",
      pagination: "el-pagination",
      
      // 弹窗相关
      dialog: "el-dialog",
      drawer: "el-drawer",
      popover: "el-popover",
      tooltip: "el-tooltip",
      
      // 按钮和导航
      button: "el-button",
      buttonGroup: "el-button-group",
      dropdown: "el-dropdown",
      menu: "el-menu",
      tabs: "el-tabs",
      breadcrumb: "el-breadcrumb",
      
      // 数据展示
      card: "el-card",
      tag: "el-tag",
      badge: "el-badge",
      avatar: "el-avatar",
      descriptions: "el-descriptions",
      tree: "el-tree",
      
      // 反馈组件
      message: "ElMessage",
      messageBox: "ElMessageBox",
      notification: "ElNotification",
      loading: "ElLoading",
      
      // 布局
      container: "el-container",
      row: "el-row",
      col: "el-col",
      divider: "el-divider",
      space: "el-space",
    },
    
    // Vben 封装的组件（优先使用）
    vbenComponents: {
      // 表单 - 使用 Vben 的 useVbenForm
      form: {
        hook: "useVbenForm",
        import: "#/adapter/form",
        description: "Vben 封装的表单组件，支持动态表单、验证等",
        usage: "const [Form, formApi] = useVbenForm({ schema: [] })",
      },
      
      // 表格 - 使用 Vben 的 useVbenVxeGrid
      table: {
        hook: "useVbenVxeGrid",
        import: "#/adapter/vxe-table",
        description: "Vben 封装的表格组件，基于 vxe-table",
        usage: "const [Grid, gridApi] = useVbenVxeGrid({ gridOptions: {} })",
      },
      
      // 模态框 - 使用 Vben 的 useVbenModal
      modal: {
        hook: "useVbenModal",
        import: "@vben/common-ui",
        description: "Vben 封装的模态框组件",
        usage: "const [Modal, modalApi] = useVbenModal({ onConfirm: async () => {} })",
      },
      
      // 抽屉 - 使用 Vben 的 useVbenDrawer
      drawer: {
        hook: "useVbenDrawer",
        import: "@vben/common-ui",
        description: "Vben 封装的抽屉组件",
        usage: "const [Drawer, drawerApi] = useVbenDrawer({ onConfirm: async () => {} })",
      },
      
      // 表格操作按钮
      tableAction: {
        component: "TableAction",
        import: "#/adapter/vxe-table",
        description: "表格操作按钮组件，支持权限控制",
      },
    },
    
    // 导入方式
    imports: {
      // Element Plus 组件导入
      components: "import { ElButton, ElForm } from 'element-plus'",
      
      // Element Plus 样式导入（通常在 main.ts 中全局导入）
      styles: "import 'element-plus/dist/index.css'",
      
      // Vben 适配器导入
      vbenForm: "import { useVbenForm } from '#/adapter/form'",
      vbenTable: "import { useVbenVxeGrid, TableAction } from '#/adapter/vxe-table'",
      vbenModal: "import { useVbenModal } from '@vben/common-ui'",
      vbenDrawer: "import { useVbenDrawer } from '@vben/common-ui'",
    },
    
    // 主题配置
    theme: {
      // Element Plus 主题变量通常在 CSS 中配置
      cssVars: {
        primary: "--el-color-primary",
        success: "--el-color-success",
        warning: "--el-color-warning",
        danger: "--el-color-danger",
        info: "--el-color-info",
      },
      // Vben 主题配置
      vbenTheme: "通过 @vben/preferences 配置",
    },
    
    // 图标
    icons: {
      // Element Plus 图标
      elementIcons: "@element-plus/icons-vue",
      // Vben 图标
      vbenIcons: "@vben/icons",
      // 推荐使用 Vben 的图标系统
      recommended: "@vben/icons",
    },
    
    // 最佳实践
    bestPractices: {
      // 1. 优先使用 Vben 封装的组件
      priority: "Vben Components > Element Plus Components",
      
      // 2. 表单使用 useVbenForm
      form: "使用 useVbenForm 而不是直接使用 el-form",
      
      // 3. 表格使用 useVbenVxeGrid
      table: "使用 useVbenVxeGrid 而不是直接使用 el-table",
      
      // 4. 弹窗使用 useVbenModal
      modal: "使用 useVbenModal 而不是直接使用 el-dialog",
      
      // 5. 按需导入
      import: "按需导入 Element Plus 组件，避免全量导入",
      
      // 6. 类型支持
      types: "使用 TypeScript 类型定义，获得更好的类型提示",
    },
    
    // 常见场景
    scenarios: {
      // CRUD 页面
      crud: {
        list: "使用 useVbenVxeGrid 展示列表",
        form: "使用 useVbenModal + useVbenForm 实现新增/编辑",
        delete: "使用 ElMessageBox.confirm 确认删除",
      },
      
      // 详情页面
      detail: {
        display: "使用 el-descriptions 展示详情",
        drawer: "使用 useVbenDrawer 在抽屉中展示详情",
      },
      
      // 搜索表单
      search: {
        form: "在 useVbenVxeGrid 的 formOptions 中配置搜索表单",
        advanced: "使用 el-collapse 实现高级搜索",
      },
    },
  };
}
