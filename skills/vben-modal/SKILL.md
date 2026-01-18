---
name: vben-modal
description: Vben Admin 框架中 useVbenModal 的使用指南。当需要在 Vben Admin 项目中创建、编辑或展示模态框（Modal）时使用此技能，包括表单模态框、详情模态框、确认模态框等场景。适用于需要实现 CRUD 操作的表单弹窗、数据详情展示、用户交互确认等功能。
---

# Vben Modal 使用指南

本技能提供 Vben Admin 框架中 `useVbenModal` 的完整使用指南和最佳实践。

## 核心概念

`useVbenModal` 是 Vben Admin 框架提供的模态框组合式函数，用于创建和管理模态框组件。它返回一个数组，包含：
- `[0]` Modal 组件 - 用于模板中渲染
- `[1]` modalApi - 用于控制模态框的 API 对象

## 基础用法

### 1. 父组件中声明模态框

```vue
<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';
import FormComponent from './modules/form.vue';

// 声明模态框
const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: FormComponent,
  destroyOnClose: true,
});

// 打开模态框 - 新建
function handleCreate() {
  formModalApi.setData(null).open();
}

// 打开模态框 - 编辑
function handleEdit(row: any) {
  formModalApi.setData(row).open();
}

// 刷新列表
function handleRefresh() {
  // 刷新逻辑
}
</script>

<template>
  <div>
    <!-- 渲染模态框组件 -->
    <FormModal @success="handleRefresh" />
    
    <!-- 触发按钮 -->
    <button @click="handleCreate">新建</button>
  </div>
</template>
```

### 2. 子组件（表单模态框）实现

```vue
<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useVbenModal } from '@vben/common-ui';
import { useVbenForm } from '#/adapter/form';
import { message } from 'ant-design-vue';

const emit = defineEmits(['success']);

// 表单数据
const formData = ref<any>();

// 动态标题
const getTitle = computed(() => {
  return formData.value?.id ? '编辑' : '新建';
});

// 表单实例
const [Form, formApi] = useVbenForm({
  schema: [], // 表单配置
  showDefaultActions: false,
});

// 模态框实例
const [Modal, modalApi] = useVbenModal({
  // 确认回调
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) return;
    
    modalApi.lock(); // 锁定模态框，防止重复提交
    try {
      const data = await formApi.getValues();
      // 提交数据
      await (formData.value?.id ? updateApi(data) : createApi(data));
      
      await modalApi.close();
      emit('success');
      message.success('操作成功');
    } finally {
      modalApi.unlock(); // 解锁模态框
    }
  },
  
  // 打开/关闭回调
  async onOpenChange(isOpen: boolean) {
    if (!isOpen) {
      formData.value = undefined;
      return;
    }
    
    // 加载数据
    const data = modalApi.getData<any>();
    if (!data || !data.id) return;
    
    modalApi.lock();
    try {
      formData.value = await getDetailApi(data.id);
      await formApi.setValues(formData.value);
    } finally {
      modalApi.unlock();
    }
  },
});
</script>

<template>
  <Modal :title="getTitle" class="w-1/2">
    <Form class="mx-4" />
  </Modal>
</template>
```

## 常见场景

### 场景 1: 多个模态框

```vue
<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';

// 声明多个模态框
const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

const [DetailModal, detailModalApi] = useVbenModal({
  connectedComponent: Detail,
  destroyOnClose: true,
});

const [RemarkModal, remarkModalApi] = useVbenModal({
  connectedComponent: RemarkForm,
  destroyOnClose: true,
});
</script>

<template>
  <div>
    <FormModal @success="handleRefresh" />
    <DetailModal />
    <RemarkModal @success="handleRefresh" />
  </div>
</template>
```

### 场景 2: 详情模态框（只读）

```vue
<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';

const [Modal, modalApi] = useVbenModal({
  showConfirmButton: false, // 隐藏确认按钮
  async onOpenChange(isOpen: boolean) {
    if (!isOpen) return;
    
    const data = modalApi.getData<any>();
    // 加载详情数据
  },
});
</script>

<template>
  <Modal title="详情">
    <!-- 详情内容 -->
  </Modal>
</template>
```

### 场景 3: 简单确认模态框

```vue
<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';

const [Modal, modalApi] = useVbenModal({
  showCancelButton: false, // 只显示确认按钮
  async onConfirm() {
    // 确认逻辑
  },
});
</script>
```

### 场景 4: 带参数的模态框

```vue
<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';

const [Modal, modalApi] = useVbenModal({
  destroyOnClose: true,
  async onConfirm() {
    const values = await formApi.getValues();
    const names = values.name; // 获取表单值
    
    // 处理逻辑
    for (const name of names) {
      // 业务逻辑
    }
    
    await modalApi.close();
    emit('success');
  },
});
</script>
```

## modalApi 方法

### 常用方法

```typescript
// 打开模态框
modalApi.open();

// 关闭模态框
await modalApi.close();

// 设置数据（传递给子组件）
modalApi.setData(data);

// 获取数据
const data = modalApi.getData<T>();

// 锁定模态框（禁用操作，显示 loading）
modalApi.lock();

// 解锁模态框
modalApi.unlock();

// 链式调用
formModalApi.setData(row).open();
```

## 配置选项

### useVbenModal 配置

```typescript
const [Modal, modalApi] = useVbenModal({
  // 连接的组件
  connectedComponent: FormComponent,
  
  // 关闭时销毁
  destroyOnClose: true,
  
  // 显示确认按钮
  showConfirmButton: true,
  
  // 显示取消按钮
  showCancelButton: true,
  
  // 确认回调
  async onConfirm() {
    // 确认逻辑
  },
  
  // 打开/关闭回调
  async onOpenChange(isOpen: boolean) {
    // 状态变化逻辑
  },
});
```

### Modal 组件属性

```vue
<template>
  <Modal 
    :title="getTitle"      <!-- 动态标题 -->
    class="w-1/2"          <!-- 宽度样式 -->
  >
    <Form class="mx-4" />
  </Modal>
</template>
```

## 最佳实践

### 1. 命名规范

```typescript
// 模态框组件使用 PascalCase + Modal 后缀
const [FormModal, formModalApi] = useVbenModal({...});
const [DetailModal, detailModalApi] = useVbenModal({...});
const [RemarkModal, remarkModalApi] = useVbenModal({...});

// API 使用 camelCase + ModalApi 后缀
```

### 2. 数据传递模式

```typescript
// 父组件：传递数据
function handleEdit(row: any) {
  formModalApi.setData(row).open();
}

// 子组件：接收数据
const data = modalApi.getData<T>();
```

### 3. 加载状态管理

```typescript
const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    modalApi.lock();    // 开始操作前锁定
    try {
      // 异步操作
      await submitData();
    } finally {
      modalApi.unlock(); // 操作完成后解锁
    }
  },
});
```

### 4. 表单验证

```typescript
async onConfirm() {
  // 先验证
  const { valid } = await formApi.validate();
  if (!valid) return;
  
  // 再提交
  modalApi.lock();
  try {
    const data = await formApi.getValues();
    await submitApi(data);
    await modalApi.close();
    emit('success');
  } finally {
    modalApi.unlock();
  }
}
```

### 5. 事件通知

```typescript
// 子组件：定义事件
const emit = defineEmits(['success']);

// 操作成功后触发
emit('success');

// 父组件：监听事件
<FormModal @success="handleRefresh" />
```

### 6. 清理状态

```typescript
async onOpenChange(isOpen: boolean) {
  if (!isOpen) {
    // 关闭时清理状态
    formData.value = undefined;
    await formApi.resetForm();
    return;
  }
  
  // 打开时加载数据
  const data = modalApi.getData<any>();
  // ...
}
```

## 常见错误

### 错误 1: 忘记解锁模态框

```typescript
// ❌ 错误：异常时未解锁
async onConfirm() {
  modalApi.lock();
  await submitData(); // 如果抛出异常，模态框将永久锁定
  modalApi.unlock();
}

// ✅ 正确：使用 try-finally
async onConfirm() {
  modalApi.lock();
  try {
    await submitData();
  } finally {
    modalApi.unlock();
  }
}
```

### 错误 2: 未验证表单就提交

```typescript
// ❌ 错误：直接提交
async onConfirm() {
  const data = await formApi.getValues();
  await submitApi(data);
}

// ✅ 正确：先验证
async onConfirm() {
  const { valid } = await formApi.validate();
  if (!valid) return;
  
  const data = await formApi.getValues();
  await submitApi(data);
}
```

### 错误 3: 未清理状态

```typescript
// ❌ 错误：关闭时未清理
async onOpenChange(isOpen: boolean) {
  if (!isOpen) return;
  // 只处理打开逻辑
}

// ✅ 正确：关闭时清理
async onOpenChange(isOpen: boolean) {
  if (!isOpen) {
    formData.value = undefined;
    return;
  }
  // 打开逻辑
}
```

## 完整示例

### 父组件（列表页）

```vue
<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import Form from './modules/form.vue';

// 模态框
const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

// 表格
const [Grid, gridApi] = useVbenVxeGrid({
  // 表格配置
});

// 刷新
function handleRefresh() {
  gridApi.query();
}

// 新建
function handleCreate() {
  formModalApi.setData(null).open();
}

// 编辑
function handleEdit(row: any) {
  formModalApi.setData(row).open();
}
</script>

<template>
  <Page>
    <FormModal @success="handleRefresh" />
    <Grid>
      <template #toolbar-tools>
        <button @click="handleCreate">新建</button>
      </template>
      <template #actions="{ row }">
        <button @click="handleEdit(row)">编辑</button>
      </template>
    </Grid>
  </Page>
</template>
```

### 子组件（表单模态框）

```vue
<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useVbenModal } from '@vben/common-ui';
import { useVbenForm } from '#/adapter/form';
import { message } from 'ant-design-vue';
import { createApi, updateApi, getDetailApi } from '#/api';

const emit = defineEmits(['success']);
const formData = ref<any>();

const getTitle = computed(() => {
  return formData.value?.id ? '编辑' : '新建';
});

const [Form, formApi] = useVbenForm({
  schema: [
    {
      fieldName: 'name',
      label: '名称',
      component: 'Input',
      rules: 'required',
    },
  ],
  showDefaultActions: false,
});

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) return;
    
    modalApi.lock();
    try {
      const data = await formApi.getValues();
      await (formData.value?.id ? updateApi(data) : createApi(data));
      
      await modalApi.close();
      emit('success');
      message.success('操作成功');
    } finally {
      modalApi.unlock();
    }
  },
  
  async onOpenChange(isOpen: boolean) {
    if (!isOpen) {
      formData.value = undefined;
      return;
    }
    
    const data = modalApi.getData<any>();
    if (!data || !data.id) return;
    
    modalApi.lock();
    try {
      formData.value = await getDetailApi(data.id);
      await formApi.setValues(formData.value);
    } finally {
      modalApi.unlock();
    }
  },
});
</script>

<template>
  <Modal :title="getTitle" class="w-1/2">
    <Form class="mx-4" />
  </Modal>
</template>
```

## 总结

使用 `useVbenModal` 时记住：

1. **父组件**：声明模态框，通过 `modalApi.setData().open()` 打开
2. **子组件**：实现模态框内容，通过 `modalApi.getData()` 获取数据
3. **生命周期**：使用 `onOpenChange` 处理打开/关闭逻辑
4. **状态管理**：使用 `lock/unlock` 管理加载状态
5. **事件通知**：通过 `emit('success')` 通知父组件刷新
6. **错误处理**：使用 `try-finally` 确保解锁
7. **表单验证**：先验证再提交
8. **清理状态**：关闭时清理数据
