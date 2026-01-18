---
name: vben-vxe-grid
description: Vben Admin 框架中 useVbenVxeGrid 的使用指南。当需要在 Vben Admin 项目中创建、管理数据表格时使用此技能，包括列表展示、分页查询、CRUD 操作、批量操作、导出等场景。适用于需要实现数据列表管理的各种业务模块。
---

# Vben VxeGrid 使用指南

本技能提供 Vben Admin 框架中 `useVbenVxeGrid` 的完整使用指南和最佳实践。

## 核心概念

`useVbenVxeGrid` 是 Vben Admin 框架提供的表格组合式函数，基于 vxe-table 封装，用于创建和管理数据表格。它返回一个数组，包含：
- `[0]` Grid 组件 - 用于模板中渲染
- `[1]` gridApi - 用于控制表格的 API 对象

## 基础用法

### 1. 简单表格

```vue
<script lang="ts" setup>
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getDataPage } from '#/api/xxx';

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: [
      {
        fieldName: 'name',
        label: '名称',
        component: 'Input',
      },
    ],
  },
  gridOptions: {
    columns: [
      { field: 'id', title: 'ID', width: 80 },
      { field: 'name', title: '名称', minWidth: 150 },
      { field: 'status', title: '状态', width: 100 },
    ],
    height: 'auto',
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getDataPage({
            pageNo: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
      },
    },
    rowConfig: {
      keyField: 'id',
      isHover: true,
    },
    toolbarConfig: {
      refresh: true,
      search: true,
    },
  },
});

function handleRefresh() {
  gridApi.query();
}
</script>

<template>
  <Page>
    <Grid table-title="数据列表" />
  </Page>
</template>
```

## 配置选项

### formOptions - 搜索表单配置

```typescript
const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: [
      {
        fieldName: 'name',
        label: '名称',
        component: 'Input',
      },
      {
        fieldName: 'status',
        label: '状态',
        component: 'Select',
        componentProps: {
          options: [
            { label: '启用', value: 1 },
            { label: '禁用', value: 0 },
          ],
        },
      },
    ],
  },
});
```

### gridOptions - 表格配置

```typescript
const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions: {
    // 列配置
    columns: [],
    
    // 高度
    height: 'auto',
    
    // 保持源数据
    keepSource: true,
    
    // 代理配置（数据请求）
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getDataPage({
            pageNo: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
      },
    },
    
    // 行配置
    rowConfig: {
      keyField: 'id',
      isHover: true,
    },
    
    // 工具栏配置
    toolbarConfig: {
      refresh: true,
      search: true,
    },
  },
});
```

### gridEvents - 表格事件

```typescript
const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions: {},
  gridEvents: {
    // 复选框全选事件
    checkboxAll: handleRowCheckboxChange,
    // 复选框单选事件
    checkboxChange: handleRowCheckboxChange,
  },
});

function handleRowCheckboxChange({ records }) {
  checkedIds.value = records.map(item => item.id);
}
```

## gridApi 方法

### 常用方法

```typescript
// 刷新表格数据
gridApi.query();

// 获取搜索表单值
const formValues = await gridApi.formApi.getValues();

// 设置搜索表单值
await gridApi.formApi.setValues({ name: '张三' });

// 重新加载数据
await gridApi.reload();
```

## 列配置

### 基础列

```typescript
const columns = [
  // 普通列
  { field: 'id', title: 'ID', width: 80 },
  { field: 'name', title: '名称', minWidth: 150 },
  
  // 固定列
  { field: 'actions', title: '操作', width: 200, fixed: 'right' },
  
  // 自定义渲染
  {
    field: 'status',
    title: '状态',
    width: 100,
    slots: { default: 'status' },
  },
];
```

### 操作列

```vue
<template>
  <Grid>
    <template #actions="{ row }">
      <TableAction
        :actions="[
          {
            label: '编辑',
            type: 'link',
            icon: ACTION_ICON.EDIT,
            onClick: handleEdit.bind(null, row),
          },
          {
            label: '删除',
            type: 'link',
            danger: true,
            icon: ACTION_ICON.DELETE,
            popConfirm: {
              title: '确认删除吗？',
              confirm: handleDelete.bind(null, row),
            },
          },
        ]"
      />
    </template>
  </Grid>
</template>
```

## 常见场景

### 场景 1: 标准 CRUD 列表

```vue
<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';
import { useVbenVxeGrid, TableAction, ACTION_ICON } from '#/adapter/vxe-table';
import { getDataPage, deleteData } from '#/api/xxx';
import Form from './modules/form.vue';

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: [
      { fieldName: 'name', label: '名称', component: 'Input' },
    ],
  },
  gridOptions: {
    columns: [
      { field: 'id', title: 'ID', width: 80 },
      { field: 'name', title: '名称', minWidth: 150 },
      { field: 'actions', title: '操作', width: 200, fixed: 'right', slots: { default: 'actions' } },
    ],
    height: 'auto',
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getDataPage({
            pageNo: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
      },
    },
    rowConfig: {
      keyField: 'id',
      isHover: true,
    },
    toolbarConfig: {
      refresh: true,
      search: true,
    },
  },
});

function handleRefresh() {
  gridApi.query();
}

function handleCreate() {
  formModalApi.setData(null).open();
}

function handleEdit(row) {
  formModalApi.setData(row).open();
}

async function handleDelete(row) {
  await deleteData(row.id);
  message.success('删除成功');
  handleRefresh();
}
</script>

<template>
  <Page>
    <FormModal @success="handleRefresh" />
    <Grid table-title="数据列表">
      <template #toolbar-tools>
        <TableAction
          :actions="[
            {
              label: '新建',
              type: 'primary',
              icon: ACTION_ICON.ADD,
              onClick: handleCreate,
            },
          ]"
        />
      </template>
      <template #actions="{ row }">
        <TableAction
          :actions="[
            {
              label: '编辑',
              type: 'link',
              icon: ACTION_ICON.EDIT,
              onClick: handleEdit.bind(null, row),
            },
            {
              label: '删除',
              type: 'link',
              danger: true,
              icon: ACTION_ICON.DELETE,
              popConfirm: {
                title: '确认删除吗？',
                confirm: handleDelete.bind(null, row),
              },
            },
          ]"
        />
      </template>
    </Grid>
  </Page>
</template>
```

### 场景 2: 批量操作

```vue
<script lang="ts" setup>
import { ref } from 'vue';
import { confirm } from '@vben/common-ui';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteDataList } from '#/api/xxx';

const checkedIds = ref<number[]>([]);

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions: {
    columns: [
      { type: 'checkbox', width: 50 },
      { field: 'id', title: 'ID', width: 80 },
      { field: 'name', title: '名称', minWidth: 150 },
    ],
    // ...其他配置
  },
  gridEvents: {
    checkboxAll: handleRowCheckboxChange,
    checkboxChange: handleRowCheckboxChange,
  },
});

function handleRowCheckboxChange({ records }) {
  checkedIds.value = records.map(item => item.id);
}

async function handleDeleteBatch() {
  await confirm('确认批量删除吗？');
  await deleteDataList(checkedIds.value);
  checkedIds.value = [];
  message.success('删除成功');
  gridApi.query();
}
</script>

<template>
  <Grid>
    <template #toolbar-tools>
      <TableAction
        :actions="[
          {
            label: '批量删除',
            type: 'primary',
            danger: true,
            icon: ACTION_ICON.DELETE,
            disabled: isEmpty(checkedIds),
            onClick: handleDeleteBatch,
          },
        ]"
      />
    </template>
  </Grid>
</template>
```

### 场景 3: 导出功能

```vue
<script lang="ts" setup>
import { downloadFileFromBlobPart } from '@vben/utils';
import { exportData } from '#/api/xxx';

async function handleExport() {
  const formValues = await gridApi.formApi.getValues();
  const data = await exportData(formValues);
  downloadFileFromBlobPart({ fileName: '数据.xls', source: data });
}
</script>

<template>
  <Grid>
    <template #toolbar-tools>
      <TableAction
        :actions="[
          {
            label: '导出',
            type: 'primary',
            icon: ACTION_ICON.DOWNLOAD,
            onClick: handleExport,
          },
        ]"
      />
    </template>
  </Grid>
</template>
```

### 场景 4: 状态切换

```vue
<script lang="ts" setup>
import { confirm } from '@vben/common-ui';
import { updateStatus } from '#/api/xxx';

async function handleStatusChange(newStatus: number, row: any): Promise<boolean | undefined> {
  return new Promise((resolve, reject) => {
    confirm({
      content: `确认切换状态吗？`,
    })
      .then(async () => {
        await updateStatus(row.id, newStatus);
        message.success('操作成功');
        gridApi.query();
        resolve(true);
      })
      .catch(() => {
        reject(new Error('取消操作'));
      });
  });
}

const columns = [
  {
    field: 'status',
    title: '状态',
    width: 100,
    slots: { default: 'status' },
  },
];
</script>

<template>
  <Grid>
    <template #status="{ row }">
      <Switch
        :checked="row.status === 1"
        @change="(checked) => handleStatusChange(checked ? 1 : 0, row)"
      />
    </template>
  </Grid>
</template>
```

### 场景 5: 树形表格

```vue
<script lang="ts" setup>
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getTreeList } from '#/api/xxx';

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions: {
    columns: [
      { field: 'name', title: '名称', minWidth: 200, treeNode: true },
      { field: 'sort', title: '排序', width: 100 },
    ],
    height: 'auto',
    proxyConfig: {
      ajax: {
        query: async () => {
          return { list: await getTreeList() };
        },
      },
    },
    treeConfig: {
      transform: true,
      rowField: 'id',
      parentField: 'parentId',
    },
  },
});
</script>
```

## 最佳实践

### 1. 配置分离

```typescript
// data.ts
export function useGridColumns() {
  return [
    { field: 'id', title: 'ID', width: 80 },
    { field: 'name', title: '名称', minWidth: 150 },
  ];
}

export function useGridFormSchema() {
  return [
    { fieldName: 'name', label: '名称', component: 'Input' },
  ];
}

// index.vue
import { useGridColumns, useGridFormSchema } from './data';

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: useGridFormSchema(),
  },
  gridOptions: {
    columns: useGridColumns(),
  },
});
```

### 2. 刷新表格

```typescript
// 刷新当前页
function handleRefresh() {
  gridApi.query();
}

// 在操作成功后刷新
async function handleDelete(row) {
  await deleteData(row.id);
  handleRefresh();
}
```

### 3. 搜索表单联动

```typescript
const searchDeptId = ref<number>();

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions: {
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getDataPage({
            pageNo: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
            deptId: searchDeptId.value, // 额外参数
          });
        },
      },
    },
  },
});

function handleDeptSelect(dept) {
  searchDeptId.value = dept.id;
  gridApi.query(); // 刷新表格
}
```

### 4. 权限控制

```vue
<template>
  <Grid>
    <template #toolbar-tools>
      <TableAction
        :actions="[
          {
            label: '新建',
            type: 'primary',
            auth: ['system:user:create'], // 权限码
            onClick: handleCreate,
          },
        ]"
      />
    </template>
    <template #actions="{ row }">
      <TableAction
        :actions="[
          {
            label: '编辑',
            type: 'link',
            auth: ['system:user:update'],
            onClick: handleEdit.bind(null, row),
          },
        ]"
      />
    </template>
  </Grid>
</template>
```

### 5. 操作按钮分组

```vue
<template>
  <Grid>
    <template #actions="{ row }">
      <TableAction
        :actions="[
          {
            label: '编辑',
            type: 'link',
            onClick: handleEdit.bind(null, row),
          },
          {
            label: '删除',
            type: 'link',
            danger: true,
            popConfirm: {
              title: '确认删除吗？',
              confirm: handleDelete.bind(null, row),
            },
          },
        ]"
        :drop-down-actions="[
          {
            label: '分配角色',
            type: 'link',
            onClick: handleAssignRole.bind(null, row),
          },
          {
            label: '重置密码',
            type: 'link',
            onClick: handleResetPassword.bind(null, row),
          },
        ]"
      />
    </template>
  </Grid>
</template>
```

## 常见错误

### 错误 1: 未配置 keyField

```typescript
// ❌ 错误：缺少 keyField
const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions: {
    rowConfig: {
      isHover: true,
    },
  },
});

// ✅ 正确：配置 keyField
const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions: {
    rowConfig: {
      keyField: 'id',
      isHover: true,
    },
  },
});
```

### 错误 2: proxyConfig 返回格式错误

```typescript
// ❌ 错误：直接返回数组
proxyConfig: {
  ajax: {
    query: async ({ page }) => {
      return await getDataPage(); // 返回 { list: [], total: 0 }
    },
  },
}

// ✅ 正确：返回正确格式
proxyConfig: {
  ajax: {
    query: async ({ page }, formValues) => {
      return await getDataPage({
        pageNo: page.currentPage,
        pageSize: page.pageSize,
        ...formValues,
      });
    },
  },
}
```

### 错误 3: 忘记刷新表格

```typescript
// ❌ 错误：操作后未刷新
async function handleDelete(row) {
  await deleteData(row.id);
  message.success('删除成功');
}

// ✅ 正确：操作后刷新
async function handleDelete(row) {
  await deleteData(row.id);
  message.success('删除成功');
  gridApi.query(); // 刷新表格
}
```

## 总结

使用 `useVbenVxeGrid` 时记住：

1. **配置分离**：将 columns 和 schema 配置独立到 data.ts
2. **正确配置 keyField**：rowConfig 中必须设置 keyField
3. **及时刷新**：CRUD 操作后调用 `gridApi.query()` 刷新
4. **权限控制**：使用 auth 属性控制按钮权限
5. **批量操作**：使用 checkbox 和 gridEvents 实现
6. **搜索联动**：通过 proxyConfig 传递额外参数
7. **操作分组**：使用 actions 和 drop-down-actions 分组
8. **导出功能**：获取搜索表单值后调用导出接口
