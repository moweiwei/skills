---
name: vben-form
description: Vben Admin 框架中 useVbenForm 的使用指南。当需要在 Vben Admin 项目中创建、管理表单时使用此技能，包括基础表单、动态表单、表单验证、多表单合并等场景。适用于需要实现数据录入、编辑、查询等功能的表单组件。
---

# Vben Form 使用指南

本技能提供 Vben Admin 框架中 `useVbenForm` 的完整使用指南和最佳实践。

## 核心概念

`useVbenForm` 是 Vben Admin 框架提供的表单组合式函数，用于创建和管理表单组件。它返回一个数组，包含：
- `[0]` Form 组件 - 用于模板中渲染
- `[1]` formApi - 用于控制表单的 API 对象

## 基础用法

### 1. 简单表单

```vue
<script lang="ts" setup>
import { useVbenForm } from '#/adapter/form';

const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
    labelWidth: 100,
  },
  layout: 'horizontal',
  schema: [
    {
      fieldName: 'name',
      label: '名称',
      component: 'Input',
      rules: 'required',
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
  showDefaultActions: false,
});
</script>

<template>
  <Form />
</template>
```

### 2. 表单配置选项

```typescript
const [Form, formApi] = useVbenForm({
  // 通用配置
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
    formItemClass: 'col-span-2',
    labelWidth: 100,
  },
  
  // 布局方式
  layout: 'horizontal', // 'horizontal' | 'vertical'
  
  // 包装类
  wrapperClass: 'grid-cols-2',
  
  // 表单项配置
  schema: [],
  
  // 是否显示默认操作按钮
  showDefaultActions: false,
  
  // 值变化回调
  handleValuesChange: (values, fieldsChanged) => {
    console.log('值变化:', values, fieldsChanged);
  },
});
```

## formApi 方法

### 常用方法

```typescript
// 验证表单
const { valid } = await formApi.validate();

// 获取表单值
const values = await formApi.getValues();

// 设置表单值
await formApi.setValues({ name: '张三', age: 18 });

// 设置单个字段值
await formApi.setFieldValue('name', '李四');

// 重置表单
await formApi.resetForm();

// 更新 schema
formApi.updateSchema(newSchema);

// 设置禁用状态
formApi.setDisabled(true);

// 合并多个表单
const values = await formApi
  .merge(form2Api)
  .merge(form3Api)
  .submitAllForm(true);
```

### 解构使用

```typescript
// 可以直接解构需要的方法
const [Form, { setFieldValue, validate, getValues }] = useVbenForm({
  schema: [],
});

// 使用解构的方法
await setFieldValue('name', '张三');
const { valid } = await validate();
const values = await getValues();
```

## Schema 配置

### 基础字段类型

```typescript
const schema = [
  // 输入框
  {
    fieldName: 'name',
    label: '名称',
    component: 'Input',
    rules: 'required',
  },
  
  // 下拉选择
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
  
  // API 下拉选择
  {
    fieldName: 'categoryId',
    label: '分类',
    component: 'ApiSelect',
    componentProps: {
      api: async () => {
        const data = await getCategoryList();
        return data.map(item => ({
          label: item.name,
          value: item.id,
        }));
      },
    },
  },
  
  // 日期选择
  {
    fieldName: 'createTime',
    label: '创建时间',
    component: 'DatePicker',
  },
  
  // 开关
  {
    fieldName: 'enabled',
    label: '是否启用',
    component: 'Switch',
  },
  
  // 文本域
  {
    fieldName: 'description',
    label: '描述',
    component: 'Textarea',
  },
];
```

### 验证规则

```typescript
const schema = [
  // 必填
  {
    fieldName: 'name',
    label: '名称',
    component: 'Input',
    rules: 'required',
  },
  
  // 多个规则
  {
    fieldName: 'email',
    label: '邮箱',
    component: 'Input',
    rules: 'required|email',
  },
  
  // 自定义规则
  {
    fieldName: 'age',
    label: '年龄',
    component: 'InputNumber',
    rules: z.number().min(18).max(100),
  },
];
```

## 常见场景

### 场景 1: 模态框表单

```vue
<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';
import { useVbenForm } from '#/adapter/form';

const emit = defineEmits(['success']);

const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
    labelWidth: 100,
  },
  layout: 'horizontal',
  schema: [],
  showDefaultActions: false,
});

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) return;
    
    modalApi.lock();
    try {
      const data = await formApi.getValues();
      await submitApi(data);
      
      await modalApi.close();
      emit('success');
    } finally {
      modalApi.unlock();
    }
  },
  
  async onOpenChange(isOpen: boolean) {
    if (!isOpen) {
      await formApi.resetForm();
      return;
    }
    
    const data = modalApi.getData();
    if (data?.id) {
      const detail = await getDetailApi(data.id);
      await formApi.setValues(detail);
    }
  },
});
</script>

<template>
  <Modal title="表单">
    <Form class="mx-4" />
  </Modal>
</template>
```

### 场景 2: 多表单合并提交

```vue
<script lang="ts" setup>
import { useVbenForm } from '#/adapter/form';

const [InfoForm, infoFormApi] = useVbenForm({
  schema: [
    { fieldName: 'name', label: '名称', component: 'Input' },
  ],
  showDefaultActions: false,
});

const [DetailForm, detailFormApi] = useVbenForm({
  schema: [
    { fieldName: 'description', label: '描述', component: 'Textarea' },
  ],
  showDefaultActions: false,
});

const [PriceForm, priceFormApi] = useVbenForm({
  schema: [
    { fieldName: 'price', label: '价格', component: 'InputNumber' },
  ],
  showDefaultActions: false,
});

async function handleSubmit() {
  // 合并多个表单并提交
  const values = await infoFormApi
    .merge(detailFormApi)
    .merge(priceFormApi)
    .submitAllForm(true);
  
  await submitApi(values);
}
</script>

<template>
  <div>
    <InfoForm />
    <DetailForm />
    <PriceForm />
    <button @click="handleSubmit">提交</button>
  </div>
</template>
```

### 场景 3: 动态表单

```vue
<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useVbenForm } from '#/adapter/form';

const propertyList = ref([]);

const [Form, formApi] = useVbenForm({
  schema: useFormSchema(propertyList.value),
  showDefaultActions: false,
});

// 监听属性变化，更新表单
watch(
  propertyList,
  () => {
    formApi.updateSchema(useFormSchema(propertyList.value));
  },
  { deep: true },
);

function useFormSchema(properties) {
  return [
    { fieldName: 'name', label: '名称', component: 'Input' },
    ...properties.map(prop => ({
      fieldName: prop.key,
      label: prop.label,
      component: 'Input',
    })),
  ];
}
</script>
```

### 场景 4: 表单值变化监听

```vue
<script lang="ts" setup>
import { useVbenForm } from '#/adapter/form';

const formData = ref({});

const [Form, formApi] = useVbenForm({
  schema: [
    {
      fieldName: 'type',
      label: '类型',
      component: 'Select',
      componentProps: {
        options: [
          { label: '类型A', value: 'A' },
          { label: '类型B', value: 'B' },
        ],
      },
    },
    {
      fieldName: 'subType',
      label: '子类型',
      component: 'Select',
    },
  ],
  showDefaultActions: false,
  handleValuesChange: (values, fieldsChanged) => {
    // 当类型改变时，重置子类型
    if (fieldsChanged.includes('type')) {
      formData.value.type = values.type;
      formApi.setFieldValue('subType', undefined);
    }
  },
});
</script>
```

### 场景 5: 表单禁用

```vue
<script lang="ts" setup>
import { useVbenForm } from '#/adapter/form';

const isDetail = ref(false);

const [Form, formApi] = useVbenForm({
  schema: [],
  showDefaultActions: false,
});

// 详情模式下禁用表单
if (isDetail.value) {
  formApi.setDisabled(true);
}
</script>
```

## 布局配置

### 水平布局

```typescript
const [Form, formApi] = useVbenForm({
  commonConfig: {
    labelWidth: 100,
  },
  layout: 'horizontal',
  schema: [],
});
```

### 垂直布局

```typescript
const [Form, formApi] = useVbenForm({
  layout: 'vertical',
  schema: [],
});
```

### 网格布局

```typescript
const [Form, formApi] = useVbenForm({
  wrapperClass: 'grid-cols-2', // 两列布局
  commonConfig: {
    formItemClass: 'col-span-2', // 某些字段占两列
  },
  schema: [],
});
```

## 最佳实践

### 1. Schema 分离

```typescript
// data.ts
export function useFormSchema() {
  return [
    {
      fieldName: 'name',
      label: '名称',
      component: 'Input',
      rules: 'required',
    },
    // ...更多字段
  ];
}

// form.vue
import { useFormSchema } from './data';

const [Form, formApi] = useVbenForm({
  schema: useFormSchema(),
});
```

### 2. 表单验证

```typescript
async function handleSubmit() {
  // 先验证
  const { valid } = await formApi.validate();
  if (!valid) {
    message.error('请填写完整信息');
    return;
  }
  
  // 再提交
  const data = await formApi.getValues();
  await submitApi(data);
}
```

### 3. 表单重置

```typescript
async function handleReset() {
  await formApi.resetForm();
}

// 或在模态框关闭时重置
async onOpenChange(isOpen: boolean) {
  if (!isOpen) {
    await formApi.resetForm();
  }
}
```

### 4. 动态更新 Schema

```typescript
// 根据条件动态更新表单项
watch(
  () => someCondition.value,
  () => {
    formApi.updateSchema(getSchemaByCondition());
  },
);
```

### 5. 表单数据转换

```typescript
async function handleSubmit() {
  const values = await formApi.getValues();
  
  // 数据转换
  const data = {
    ...values,
    price: convertToInteger(values.price), // 元转分
    createTime: formatDate(values.createTime),
  };
  
  await submitApi(data);
}
```

### 6. 多表单协作

```typescript
// 使用 merge 合并多个表单
const values = await form1Api
  .merge(form2Api)
  .merge(form3Api)
  .submitAllForm(true);
```

### 7. 表单加载状态

```typescript
const formLoading = ref(false);

async function loadFormData() {
  formLoading.value = true;
  try {
    const data = await getDetailApi(id);
    await formApi.setValues(data);
  } finally {
    formLoading.value = false;
  }
}
```

### 8. 字段联动

```typescript
const [Form, formApi] = useVbenForm({
  schema: [],
  handleValuesChange: (values, fieldsChanged) => {
    // 字段 A 变化时，更新字段 B
    if (fieldsChanged.includes('fieldA')) {
      formApi.setFieldValue('fieldB', calculateB(values.fieldA));
    }
  },
});
```

## 常见错误

### 错误 1: 未验证就提交

```typescript
// ❌ 错误：直接提交
async function handleSubmit() {
  const data = await formApi.getValues();
  await submitApi(data);
}

// ✅ 正确：先验证
async function handleSubmit() {
  const { valid } = await formApi.validate();
  if (!valid) return;
  
  const data = await formApi.getValues();
  await submitApi(data);
}
```

### 错误 2: 忘记重置表单

```typescript
// ❌ 错误：关闭时未重置
async onOpenChange(isOpen: boolean) {
  if (!isOpen) return;
  // 只处理打开逻辑
}

// ✅ 正确：关闭时重置
async onOpenChange(isOpen: boolean) {
  if (!isOpen) {
    await formApi.resetForm();
    return;
  }
  // 打开逻辑
}
```

### 错误 3: Schema 配置错误

```typescript
// ❌ 错误：缺少必要配置
const schema = [
  {
    fieldName: 'name',
    // 缺少 label 和 component
  },
];

// ✅ 正确：完整配置
const schema = [
  {
    fieldName: 'name',
    label: '名称',
    component: 'Input',
  },
];
```

## 完整示例

### 标准表单组件

```vue
<script lang="ts" setup>
import type { DataType } from '#/api/xxx';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { createApi, getDetailApi, updateApi } from '#/api/xxx';
import { $t } from '#/locales';

import { useFormSchema } from '../data';

const emit = defineEmits(['success']);
const formData = ref<DataType>();

const getTitle = computed(() => {
  return formData.value?.id
    ? $t('ui.actionTitle.edit', ['数据'])
    : $t('ui.actionTitle.create', ['数据']);
});

const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
    labelWidth: 100,
  },
  layout: 'horizontal',
  schema: useFormSchema(),
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
      message.success($t('ui.actionMessage.operationSuccess'));
    } finally {
      modalApi.unlock();
    }
  },
  
  async onOpenChange(isOpen: boolean) {
    if (!isOpen) {
      formData.value = undefined;
      await formApi.resetForm();
      return;
    }
    
    const data = modalApi.getData<DataType>();
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

### Schema 配置文件

```typescript
// data.ts
import type { VbenFormSchema } from '#/adapter/form';

export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'name',
      label: '名称',
      component: 'Input',
      rules: 'required',
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
      rules: 'required',
    },
    {
      fieldName: 'categoryId',
      label: '分类',
      component: 'ApiSelect',
      componentProps: {
        api: async () => {
          const data = await getCategoryList();
          return data.map(item => ({
            label: item.name,
            value: item.id,
          }));
        },
      },
    },
    {
      fieldName: 'description',
      label: '描述',
      component: 'Textarea',
    },
  ];
}
```

## 总结

使用 `useVbenForm` 时记住：

1. **配置分离**：将 schema 配置独立到 data.ts 文件
2. **先验证后提交**：使用 `validate()` 验证表单
3. **及时重置**：关闭时使用 `resetForm()` 清理状态
4. **合理布局**：根据需求选择 horizontal/vertical 布局
5. **动态更新**：使用 `updateSchema()` 动态更新表单项
6. **多表单合并**：使用 `merge()` 合并多个表单
7. **字段联动**：使用 `handleValuesChange` 处理字段联动
8. **数据转换**：提交前进行必要的数据格式转换
