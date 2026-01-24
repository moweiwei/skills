---
name: vxe-table
description: VXE Table 4.17.46 组件属性与配置指南。专注于 Grid 配置式表格，包含 vxe-grid、vxe-colgroup、vxe-column、vxe-toolbar 所有支持的属性、说明、类型和返回类型。适用于 Vben Admin 项目中的表格开发。
---

# VXE Table 4.17.46 组件属性指南

本技能提供 VXE Table 4.17.46 版本中 Grid 配置式表格的完整属性参考，基于官方文档和源码分析。

## 版本信息

- **版本**: vxe-table@4.17.46
- **GitHub**: https://github.com/x-extends/vxe-table
- **官网**: https://vxetable.cn/#/grid/api
- **重点**: Grid 配置式表格（vxe-grid）

## 核心组件属性

### 1. vxe-grid 组件属性

`vxe-grid` 是 VXE Table 的核心表格组件，支持配置式开发。

#### 基础属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `border` | `boolean \| string` | `false` | 边框样式，可选值：`true`、`false`、`"inner"`、`"outer"`、`"full"`、`"none"` |
| `height` | `number \| string` | `-` | 表格高度，支持数字、百分比、`"auto"` |
| `max-height` | `number \| string` | `-` | 表格最大高度 |
| `auto-resize` | `boolean` | `false` | 是否自动调整大小 |
| `show-overflow` | `boolean \| string` | `false` | 内容溢出显示，可选值：`true`、`false`、`"ellipsis"`、`"tooltip"` |
| `show-header` | `boolean` | `true` | 是否显示表头 |
| `show-footer` | `boolean` | `false` | 是否显示表尾 |
| `keep-source` | `boolean` | `false` | 是否保持源数据 |
| `align` | `string` | `"left"` | 对齐方式，可选值：`"left"`、`"center"`、`"right"` |
| `header-align` | `string` | `-` | 表头对齐方式 |
| `footer-align` | `string` | `-` | 表尾对齐方式 |
| `size` | `string` | `"medium"` | 尺寸，可选值：`"mini"`、`"small"`、`"medium"`、`"large"` |
| `round` | `boolean` | `false` | 是否圆角 |
| `loading` | `boolean` | `false` | 加载状态 |
| `empty-text` | `string` | `"暂无数据"` | 空数据提示文本 |

#### 数据配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `data` | `Array<any>` | `[]` | 表格数据 |
| `columns` | `Array<VxeColumnPropTypes>` | `[]` | 列配置数组 |
| `seq-config` | `object` | `{}` | 序号列配置 |
| `radio-config` | `object` | `{}` | 单选框配置 |
| `checkbox-config` | `object` | `{}` | 复选框配置 |
| `sort-config` | `object` | `{}` | 排序配置 |
| `filter-config` | `object` | `{}` | 筛选配置 |
| `edit-config` | `object` | `{}` | 编辑配置 |
| `valid-config` | `object` | `{}` | 校验配置 |
| `tree-config` | `object` | `{}` | 树形配置 |
| `menu-config` | `object` | `{}` | 右键菜单配置 |
| `expand-config` | `object` | `{}` | 展开行配置 |
| `tooltip-config` | `object` | `{}` | 提示框配置 |
| `form-config` | `object` | `{}` | 表单配置 |
| `toolbar-config` | `object` | `{}` | 工具栏配置 |
| `pager-config` | `object` | `{}` | 分页配置 |
| `proxy-config` | `object` | `{}` | 数据代理配置 |
| `import-config` | `object` | `{}` | 导入配置 |
| `export-config` | `object` | `{}` | 导出配置 |
| `print-config` | `object` | `{}` | 打印配置 |
| `custom-config` | `object` | `{}` | 自定义配置 |

#### 行配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `row-config` | `object` | `{}` | 行配置 |
| `row-config.keyField` | `string` | `"id"` | 行数据主键字段 |
| `row-config.isHover` | `boolean` | `false` | 是否启用行悬停高亮 |
| `row-config.isCurrent` | `boolean` | `false` | 是否启用当前行高亮 |
| `row-config.height` | `number` | `48` | 行高度 |
| `row-config.stripe` | `boolean` | `false` | 是否显示斑马纹 |

#### 列配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `column-config` | `object` | `{}` | 列配置 |
| `column-config.resizable` | `boolean` | `false` | 是否可调整列宽 |
| `column-config.width` | `number \| string` | `-` | 列默认宽度 |
| `column-config.min-width` | `number` | `40` | 列最小宽度 |
| `column-config.max-width` | `number` | `-` | 列最大宽度 |

#### 代理配置 (proxyConfig)

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `proxyConfig.autoLoad` | `boolean` | `true` | 是否自动加载数据 |
| `proxyConfig.seq` | `boolean` | `false` | 是否启用自动序号 |
| `proxyConfig.form` | `boolean` | `false` | 是否启用表单代理 |
| `proxyConfig.showLoading` | `boolean` | `false` | 是否显示加载状态 |
| `proxyConfig.showActiveMsg` | `boolean` | `true` | 是否显示操作消息 |
| `proxyConfig.showResponseMsg` | `boolean` | `true` | 是否显示响应消息 |
| `proxyConfig.response` | `object` | `{}` | 响应字段映射 |
| `proxyConfig.response.result` | `string` | `"list"` | 数据列表字段名 |
| `proxyConfig.response.total` | `string` | `"total"` | 总数字段名 |
| `proxyConfig.ajax` | `object` | `{}` | AJAX 配置 |
| `proxyConfig.ajax.query` | `function` | `-` | 查询函数 |
| `proxyConfig.ajax.delete` | `function` | `-` | 删除函数 |
| `proxyConfig.ajax.save` | `function` | `-` | 保存函数 |

#### 工具栏配置 (toolbarConfig)

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `toolbarConfig.refresh` | `boolean` | `false` | 是否显示刷新按钮 |
| `toolbarConfig.import` | `boolean` | `false` | 是否显示导入按钮 |
| `toolbarConfig.export` | `boolean` | `false` | 是否显示导出按钮 |
| `toolbarConfig.print` | `boolean` | `false` | 是否显示打印按钮 |
| `toolbarConfig.zoom` | `boolean` | `false` | 是否显示缩放按钮 |
| `toolbarConfig.custom` | `boolean` | `false` | 是否显示自定义按钮 |
| `toolbarConfig.buttons` | `Array<object>` | `[]` | 自定义按钮数组 |
| `toolbarConfig.buttons[].code` | `string` | `-` | 按钮编码 |
| `toolbarConfig.buttons[].name` | `string` | `-` | 按钮名称 |
| `toolbarConfig.buttons[].icon` | `string` | `-` | 按钮图标 |
| `toolbarConfig.buttons[].status` | `string` | `-` | 按钮状态，可选值：`"primary"`、`"success"`、`"warning"`、`"danger"`、`"info"` |
| `toolbarConfig.buttons[].disabled` | `boolean` | `false` | 是否禁用 |
| `toolbarConfig.buttons[].visible` | `boolean` | `true` | 是否可见 |

#### 分页配置 (pagerConfig)

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `pagerConfig.enabled` | `boolean` | `false` | 是否启用分页 |
| `pagerConfig.currentPage` | `number` | `1` | 当前页码 |
| `pagerConfig.pageSize` | `number` | `10` | 每页大小 |
| `pagerConfig.total` | `number` | `0` | 总数据量 |
| `pagerConfig.pageSizes` | `Array<number>` | `[10, 20, 50, 100]` | 每页大小选项 |
| `pagerConfig.layouts` | `Array<string>` | `["PrevJump", "PrevPage", "Number", "NextPage", "NextJump", "Sizes", "Total"]` | 布局组件 |
| `pagerConfig.align` | `string` | `"left"` | 对齐方式 |

#### 编辑配置 (editConfig)

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `editConfig.trigger` | `string` | `"manual"` | 触发方式，可选值：`"manual"`、`"click"`、`"dblclick"` |
| `editConfig.mode` | `string` | `"cell"` | 编辑模式，可选值：`"cell"`、`"row"` |
| `editConfig.showStatus` | `boolean` | `true` | 是否显示编辑状态 |
| `editConfig.showIcon` | `boolean` | `true` | 是否显示编辑图标 |
| `editConfig.activeMethod` | `function` | `-` | 激活编辑的方法 |
| `editConfig.beforeEditMethod` | `function` | `-` | 编辑前的方法 |

### 2. vxe-colgroup 组件属性

`vxe-colgroup` 用于列分组，可以包含多个 `vxe-column`。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | `-` | 分组标题 |
| `align` | `string` | `-` | 对齐方式，可选值：`"left"`、`"center"`、`"right"` |
| `header-align` | `string` | `-` | 表头对齐方式 |
| `width` | `number \| string` | `-` | 分组宽度 |
| `min-width` | `number` | `-` | 分组最小宽度 |
| `max-width` | `number` | `-` | 分组最大宽度 |
| `resizable` | `boolean` | `false` | 是否可调整宽度 |
| `fixed` | `string` | `-` | 固定列，可选值：`"left"`、`"right"` |
| `visible` | `boolean` | `true` | 是否可见 |
| `class-name` | `string` | `-` | 自定义类名 |
| `header-class-name` | `string` | `-` | 表头自定义类名 |

### 3. vxe-column 组件属性

`vxe-column` 定义表格列，支持多种类型和配置。

#### 基础属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `string` | `-` | 列类型，可选值：`"seq"`、`"radio"`、`"checkbox"`、`"expand"`、`"html"` |
| `field` | `string` | `-` | 字段名，对应数据对象的属性 |
| `title` | `string` | `-` | 列标题 |
| `width` | `number \| string` | `-` | 列宽度 |
| `min-width` | `number` | `40` | 列最小宽度 |
| `max-width` | `number` | `-` | 列最大宽度 |
| `resizable` | `boolean` | `false` | 是否可调整宽度 |
| `fixed` | `string` | `-` | 固定列，可选值：`"left"`、`"right"` |
| `align` | `string` | `-` | 对齐方式，可选值：`"left"`、`"center"`、`"right"` |
| `header-align` | `string` | `-` | 表头对齐方式 |
| `footer-align` | `string` | `-` | 表尾对齐方式 |
| `show-overflow` | `boolean \| string` | `-` | 内容溢出显示 |
| `show-header-overflow` | `boolean \| string` | `-` | 表头溢出显示 |
| `visible` | `boolean` | `true` | 是否可见 |
| `class-name` | `string` | `-` | 自定义类名 |
| `header-class-name` | `string` | `-` | 表头自定义类名 |
| `footer-class-name` | `string` | `-` | 表尾自定义类名 |

#### 功能属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `sortable` | `boolean` | `false` | 是否可排序 |
| `sort-by` | `string \| Array<string>` | `-` | 排序字段 |
| `sort-type` | `string` | `"auto"` | 排序类型，可选值：`"auto"`、`"string"`、`"number"`、`"date"` |
| `filters` | `Array<object>` | `[]` | 筛选器配置 |
| `filter-multiple` | `boolean` | `true` | 是否多选筛选 |
| `filter-method` | `function` | `-` | 筛选方法 |
| `tree-node` | `boolean` | `false` | 是否树节点列 |
| `edit-render` | `object` | `{}` | 编辑渲染器配置 |
| `cell-render` | `object` | `{}` | 单元格渲染器配置 |
| `content-render` | `object` | `{}` | 内容渲染器配置 |
| `formatter` | `function \| string` | `-` | 格式化函数或格式化名称 |
| `params` | `object` | `{}` | 额外参数 |

#### 编辑渲染器 (editRender)

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `editRender.name` | `string` | `-` | 渲染器名称，如：`"VxeInput"`、`"VxeSelect"`、`"VxeDatePicker"` |
| `editRender.props` | `object` | `{}` | 渲染器属性 |
| `editRender.options` | `Array<object>` | `[]` | 选项数据（用于 Select 等） |
| `editRender.events` | `object` | `{}` | 事件监听器 |
| `editRender.autofocus` | `string` | `-` | 自动聚焦字段 |

#### 单元格渲染器 (cellRender)

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `cellRender.name` | `string` | `-` | 渲染器名称，如：`"CellImage"`、`"CellTag"`、`"CellSwitch"`、`"CellOperation"` |
| `cellRender.props` | `object` | `{}` | 渲染器属性 |
| `cellRender.options` | `Array<string \| object>` | `[]` | 选项配置（如操作按钮） |
| `cellRender.attrs` | `object` | `{}` | 额外属性 |

#### 插槽 (slots)

| 插槽名 | 作用域参数 | 说明 |
|--------|------------|------|
| `default` | `{ row, rowIndex, column, columnIndex, $rowIndex, $columnIndex }` | 默认单元格插槽 |
| `header` | `{ column, columnIndex, $columnIndex }` | 表头插槽 |
| `footer` | `{ column, columnIndex, $columnIndex, items, data }` | 表尾插槽 |
| `filter` | `{ column, columnIndex, $columnIndex }` | 筛选器插槽 |
| `edit` | `{ row, rowIndex, column, columnIndex, $rowIndex, $columnIndex }` | 编辑插槽 |

### 4. vxe-toolbar 组件属性

`vxe-toolbar` 是独立的工具栏组件，也可通过 `toolbarConfig` 集成到 `vxe-grid` 中。

#### 基础属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `height` | `number \| string` | `-` | 工具栏高度 |
| `perfect` | `boolean` | `false` | 是否完美模式 |
| `refresh` | `boolean` | `false` | 是否显示刷新按钮 |
| `import` | `boolean` | `false` | 是否显示导入按钮 |
| `export` | `boolean` | `false` | 是否显示导出按钮 |
| `print` | `boolean` | `false` | 是否显示打印按钮 |
| `zoom` | `boolean` | `false` | 是否显示缩放按钮 |
| `custom` | `boolean` | `false` | 是否显示自定义按钮 |
| `buttons` | `Array<object>` | `[]` | 自定义按钮数组 |
| `tools` | `Array<object>` | `[]` | 工具按钮数组 |
| `loading` | `boolean` | `false` | 加载状态 |
| `class-name` | `string` | `-` | 自定义类名 |

#### 按钮配置 (buttons)

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `code` | `string` | `-` | 按钮编码，内置值：`"refresh"`、`"import"`、`"export"`、`"print"`、`"zoom"`、`"custom"` |
| `name` | `string` | `-` | 按钮显示文本 |
| `icon` | `string` | `-` | 按钮图标，使用 VXE 图标类名 |
| `status` | `string` | `-` | 按钮状态，可选值：`"primary"`、`"success"`、`"warning"`、`"danger"`、`"info"` |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `visible` | `boolean` | `true` | 是否可见 |
| `dropdowns` | `Array<object>` | `[]` | 下拉菜单项 |
| `circle` | `boolean` | `false` | 是否圆形按钮 |
| `round` | `boolean` | `false` | 是否圆角按钮 |
| `size` | `string` | `"medium"` | 按钮尺寸 |

#### 工具配置 (tools)

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `code` | `string` | `-` | 工具编码 |
| `name` | `string` | `-` | 工具名称 |
| `icon` | `string` | `-` | 工具图标 |
| `type` | `string` | `-` | 工具类型，如：`"input"`、`"select"`、`"date"` |
| `placeholder` | `string` | `-` | 占位符 |
| `options` | `Array<object>` | `[]` | 选项数据 |
| `value` | `any` | `-` | 当前值 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `visible` | `boolean` | `true` | 是否可见 |

## 配置示例

### 基础 Grid 配置

```vue
<template>
  <vxe-grid v-bind="gridOptions"></vxe-grid>
</template>

<script setup>
import { reactive } from 'vue'
import type { VxeGridProps } from 'vxe-table'

interface RowVO {
  id: number
  name: string
  age: number
  address: string
}

const gridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  height: 400,
  showOverflow: true,
  rowConfig: {
    keyField: 'id',
    isHover: true
  },
  columnConfig: {
    resizable: true
  },
  toolbarConfig: {
    refresh: true,
    export: true,
    custom: true,
    buttons: [
      { code: 'insert', name: '新增', status: 'primary' },
      { code: 'delete', name: '删除', status: 'danger' }
    ]
  },
  pagerConfig: {
    enabled: true,
    pageSize: 10,
    pageSizes: [10, 20, 50, 100]
  },
  proxyConfig: {
    ajax: {
      query: async ({ page }) => {
        // 模拟 API 调用
        return {
          list: [],
          total: 0
        }
      }
    }
  },
  columns: [
    { type: 'seq', width: 60, title: '序号' },
    { type: 'checkbox', width: 50 },
    { field: 'name', title: '姓名', width: 120 },
    { field: 'age', title: '年龄', width: 100, sortable: true },
    { field: 'address', title: '地址', minWidth: 200 }
  ],
  data: []
})
</script>
```

### 服务端分页与筛选

```vue
<template>
  <vxe-grid v-bind="gridOptions"></vxe-grid>
</template>

<script setup>
import { reactive } from 'vue'
import type { VxeGridProps } from 'vxe-table'

const gridOptions = reactive<VxeGridProps>({
  border: true,
  height: 500,
  filterConfig: {
    showIcon: true
  },
  sortConfig: {
    multiple: true
  },
  pagerConfig: {
    enabled: true,
    pageSize: 20
  },
  proxyConfig: {
    seq: true,
    showLoading: true,
    response: {
      result: 'result',
      total: 'page.total'
    },
    ajax: {
      query: async ({ page, sorts, filters, form }) => {
        // 服务端查询
        const params = {
          pageNo: page.currentPage,
          pageSize: page.pageSize,
          sorts,
          filters,
          ...form
        }
        // 调用 API
        return await fetchData(params)
      }
    }
  },
  columns: [
    { type: 'seq', width: 70 },
    { 
      field: 'name', 
      title: '姓名',
      filterRender: { name: 'VxeInput', props: { clearable: true } }
    },
    { 
      field: 'status', 
      title: '状态',
      filterRender: {
        name: 'VxeSelect',
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 }
        ]
      }
    }
  ]
})
</script>
```

### 编辑功能配置

```vue
<template>
  <vxe-grid v-bind="gridOptions"></vxe-grid>
</template>

<script setup>
import { reactive } from 'vue'
import type { VxeGridProps } from 'vxe-table'

const gridOptions = reactive<VxeGridProps>({
  border: true,
  height: 400,
  editConfig: {
    trigger: 'click',
    mode: 'cell',
    showStatus: true
  },
  editRules: {
    name: [
      { required: true, message: '姓名不能为空' }
    ],
    age: [
      { required: true, message: '年龄不能为空' },
      { pattern: /^[0-9]+$/, message: '年龄必须为数字' }
    ]
  },
  columns: [
    { type: 'seq', width: 60 },
    {
      field: 'name',
      title: '姓名',
      editRender: { name: 'VxeInput', props: { clearable: true } }
    },
    {
      field: 'age',
      title: '年龄',
      editRender: { name: 'VxeNumberInput', props: { min: 0, max: 150 } }
    },
    {
      field: 'gender',
      title: '性别',
      editRender: {
        name: 'VxeSelect',
        options: [
          { label: '男', value: 'male' },
          { label: '女', value: 'female' }
        ]
      }
    }
  ],
  data: [
    { id: 1, name: '张三', age: 28, gender: 'male' },
    { id: 2, name: '李四', age: 32, gender: 'female' }
  ]
})
</script>
```

## 常用渲染器

### 内置渲染器

| 渲染器名称 | 说明 | 适用场景 |
|------------|------|----------|
| `VxeInput` | 输入框 | 文本编辑 |
| `VxeNumberInput` | 数字输入框 | 数字编辑 |
| `VxeSelect` | 下拉选择框 | 选项选择 |
| `VxeDatePicker` | 日期选择器 | 日期编辑 |
| `VxeSwitch` | 开关 | 状态切换 |
| `CellImage` | 图片显示 | 图片展示 |
| `CellTag` | 标签显示 | 状态标签 |
| `CellSwitch` | 开关操作 | 状态切换操作 |
| `CellOperation` | 操作按钮 | 行操作按钮 |

### 自定义渲染器示例

```typescript
// 在 adapter/vxe-table.ts 中注册自定义渲染器
vxeUI.renderer.add('CellStatus', {
  renderTableDefault(renderOpts, params) {
    const { props } = renderOpts
    const { row, column } = params
    const value = row[column.field]
    
    const statusMap = {
      0: { text: '禁用', color: 'error' },
      1: { text: '启用', color: 'success' }
    }
    
    const status = statusMap[value] || { text: '未知', color: 'default' }
    
    return h(Tag, { color: status.color }, () => status.text)
  }
})

// 在列配置中使用
const columns = [
  {
    field: 'status',
    title: '状态',
    cellRender: { name: 'CellStatus' }
  }
]
```

## 注意事项

1. **版本兼容性**: 确保使用 vxe-table@4.17.46 版本，API 可能在不同版本间有变化
2. **性能优化**: 大数据量时启用虚拟滚动，合理配置 `height` 和 `max-height`
3. **类型安全**: 使用 TypeScript 类型定义，避免属性错误
4. **响应式设计**: 表格容器需要有明确的高度，避免布局抖动
5. **事件处理**: 注意事件冒泡和默认行为，必要时使用 `.prevent` 或 `.stop`

## 参考资源

- [VXE Table 官方文档](https://vxetable.cn/#/grid/api)
- [GitHub 源码](https://github.com/x-extends/vxe-table)
- [Vben Admin 集成示例](https://github.com/vbenjs/vue-vben-admin)

## 更新日志

- **2026-01-24**: 基于 vxe-table@4.17.46 创建技能文件，包含 vxe-grid、vxe-colgroup、vxe-column、vxe-toolbar 完整属性参考。