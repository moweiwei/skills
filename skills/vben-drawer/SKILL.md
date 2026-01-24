---
name: vben-drawer
description: Vben Admin 框架中 useVbenDrawer 的使用指南。当需要在 Vben Admin 项目中创建、管理抽屉（Drawer）时使用此技能，包括详情展示、配置面板、内容预览等场景。适用于需要从侧边滑出展示内容的交互场景。
---

# Vben Drawer 使用指南

本技能提供 Vben Admin 框架中 `useVbenDrawer` 的完整使用指南和最佳实践。

## 核心概念

`useVbenDrawer` 是 Vben Admin 框架提供的抽屉组合式函数，用于创建和管理侧边抽屉组件。它返回一个数组，包含：
- `[0]` Drawer 组件 - 用于模板中渲染
- `[1]` drawerApi - 用于控制抽屉的 API 对象

## 基础用法

### 1. 简单抽屉

```vue
<script lang="ts" setup>
import { useVbenDrawer } from '@vben/common-ui';

const [Drawer, drawerApi] = useVbenDrawer({
  title: '详情',
  closable: true,
});

function handleOpen() {
  drawerApi.open();
}
</script>

<template>
  <div>
    <button @click="handleOpen">打开抽屉</button>
    <Drawer>
      <div>抽屉内容</div>
    </Drawer>
  </div>
</template>
```

### 2. 带连接组件的抽屉

```vue
<script lang="ts" setup>
import { useVbenDrawer } from '@vben/common-ui';
import DetailComponent from './detail.vue';

const [Drawer, drawerApi] = useVbenDrawer({
  connectedComponent: DetailComponent,
  title: '详情',
});

function handleOpen() {
  drawerApi.open();
}
</script>

<template>
  <div>
    <button @click="handleOpen">查看详情</button>
    <Drawer />
  </div>
</template>
```

## 配置选项

### 基础配置

```typescript
const [Drawer, drawerApi] = useVbenDrawer({
  // 标题
  title: '抽屉标题',
  
  // 是否显示关闭按钮
  closable: true,
  
  // 是否显示底部
  footer: true,
  
  // 是否显示头部
  header: true,
  
  // 连接的组件
  connectedComponent: DetailComponent,
  
  // 取消回调
  onCancel() {
    drawerApi.close();
  },
  
  // 确认回调
  onConfirm() {
    // 确认逻辑
    drawerApi.close();
  },
});
```

## drawerApi 方法

### 常用方法

```typescript
// 打开抽屉
drawerApi.open();

// 关闭抽屉
drawerApi.close();

// 设置数据（传递给连接的组件）
drawerApi.setData(data);

// 获取数据
const data = drawerApi.getData();
```

## 常见场景

### 场景 1: 详情展示

```vue
<script lang="ts" setup>
import { ref } from 'vue';
import { useVbenDrawer } from '@vben/common-ui';

const selectedData = ref(null);

const [Drawer, drawerApi] = useVbenDrawer({
  title: '详情',
  closable: true,
  footer: false,
});

function handleViewDetail(data) {
  selectedData.value = data;
  drawerApi.open();
}
</script>

<template>
  <div>
    <button @click="handleViewDetail(item)">查看详情</button>
    
    <Drawer class="w-[600px]">
      <div v-if="selectedData">
        <div class="mb-4">
          <div class="text-lg font-bold">{{ selectedData.title }}</div>
          <div class="text-sm text-gray-500">{{ selectedData.subtitle }}</div>
        </div>
        <div class="space-y-4">
          <div>
            <div class="mb-2 text-sm font-semibold">描述</div>
            <div class="text-sm text-gray-700">{{ selectedData.description }}</div>
          </div>
        </div>
      </div>
    </Drawer>
  </div>
</template>
```

### 场景 2: 带确认操作的抽屉

```vue
<script lang="ts" setup>
import { useVbenDrawer } from '@vben/common-ui';

const [Drawer, drawerApi] = useVbenDrawer({
  title: '联网搜索详情',
  closable: true,
  footer: true,
  onCancel() {
    drawerApi.close();
  },
  onConfirm() {
    // 执行确认操作
    const data = drawerApi.getData();
    if (data?.url) {
      window.open(data.url, '_blank');
    }
    drawerApi.close();
  },
});

function handleClick(item) {
  drawerApi.setData(item);
  drawerApi.open();
}
</script>

<template>
  <div>
    <div @click="handleClick(item)">点击查看</div>
    
    <Drawer class="w-[600px]" cancel-text="关闭" confirm-text="访问原文">
      <!-- 抽屉内容 -->
    </Drawer>
  </div>
</template>
```

### 场景 3: 连接组件的抽屉

```vue
<script lang="ts" setup>
import { useVbenDrawer } from '@vben/common-ui';
import RoleRepository from './role-repository.vue';

const [Drawer, drawerApi] = useVbenDrawer({
  connectedComponent: RoleRepository,
  title: '角色仓库',
});

function handleOpenRepository() {
  drawerApi.open();
}
</script>

<template>
  <div>
    <button @click="handleOpenRepository">打开角色仓库</button>
    <Drawer />
  </div>
</template>
```

### 场景 4: 无头部和底部的抽屉

```vue
<script lang="ts" setup>
import { useVbenDrawer } from '@vben/common-ui';

const [Drawer, drawerApi] = useVbenDrawer({
  header: false,
  footer: false,
});
</script>

<template>
  <Drawer class="w-[400px]">
    <!-- 自定义内容，完全控制布局 -->
    <div class="h-full p-4">
      <div class="mb-4 flex items-center justify-between">
        <h3 class="text-lg font-bold">自定义标题</h3>
        <button @click="drawerApi.close()">关闭</button>
      </div>
      <div class="flex-1">
        <!-- 内容区域 -->
      </div>
    </div>
  </Drawer>
</template>
```

### 场景 5: 配置面板

```vue
<script lang="ts" setup>
import { ref } from 'vue';
import { useVbenDrawer } from '@vben/common-ui';

const config = ref({
  theme: 'light',
  language: 'zh-CN',
});

const [Drawer, drawerApi] = useVbenDrawer({
  title: '设置',
  closable: true,
  footer: true,
  onConfirm() {
    // 保存配置
    saveConfig(config.value);
    drawerApi.close();
  },
});
</script>

<template>
  <div>
    <button @click="drawerApi.open()">打开设置</button>
    
    <Drawer class="w-[400px]">
      <div class="space-y-4">
        <div>
          <label class="mb-2 block text-sm font-medium">主题</label>
          <select v-model="config.theme" class="w-full">
            <option value="light">浅色</option>
            <option value="dark">深色</option>
          </select>
        </div>
        <div>
          <label class="mb-2 block text-sm font-medium">语言</label>
          <select v-model="config.language" class="w-full">
            <option value="zh-CN">简体中文</option>
            <option value="en-US">English</option>
          </select>
        </div>
      </div>
    </Drawer>
  </div>
</template>
```

## 最佳实践

### 1. 合理设置宽度

```vue
<template>
  <!-- 小抽屉 -->
  <Drawer class="w-[400px]">
    <!-- 简单内容 -->
  </Drawer>
  
  <!-- 中等抽屉 -->
  <Drawer class="w-[600px]">
    <!-- 详情内容 -->
  </Drawer>
  
  <!-- 大抽屉 -->
  <Drawer class="w-[800px]">
    <!-- 复杂内容 -->
  </Drawer>
</template>
```

### 2. 数据传递

```typescript
// 打开时传递数据
function handleOpen(item) {
  drawerApi.setData(item);
  drawerApi.open();
}

// 在抽屉内获取数据
const data = drawerApi.getData();
```

### 3. 按钮文本自定义

```vue
<template>
  <Drawer 
    cancel-text="取消" 
    confirm-text="确定"
  >
    <!-- 内容 -->
  </Drawer>
</template>
```

### 4. 回调处理

```typescript
const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    // 取消时的清理逻辑
    drawerApi.close();
  },
  onConfirm() {
    // 确认时的处理逻辑
    const data = drawerApi.getData();
    // 处理数据
    drawerApi.close();
  },
});
```

### 5. 连接组件通信

```vue
<!-- 父组件 -->
<script lang="ts" setup>
import { useVbenDrawer } from '@vben/common-ui';
import DetailComponent from './detail.vue';

const [Drawer, drawerApi] = useVbenDrawer({
  connectedComponent: DetailComponent,
});

function handleOpen(data) {
  drawerApi.setData(data);
  drawerApi.open();
}
</script>

<!-- 子组件 detail.vue -->
<script lang="ts" setup>
import { useVbenDrawer } from '@vben/common-ui';

const [Drawer, drawerApi] = useVbenDrawer({});

// 获取父组件传递的数据
const data = drawerApi.getData();
</script>
```

### 6. 条件渲染

```vue
<script lang="ts" setup>
import { ref } from 'vue';

const selectedData = ref(null);

function handleOpen(data) {
  selectedData.value = data;
  drawerApi.open();
}
</script>

<template>
  <Drawer>
    <div v-if="selectedData">
      <!-- 有数据时显示 -->
      {{ selectedData.title }}
    </div>
    <div v-else>
      <!-- 无数据时显示 -->
      暂无数据
    </div>
  </Drawer>
</template>
```

## 常见错误

### 错误 1: 忘记渲染 Drawer 组件

```vue
<!-- ❌ 错误：只声明了但没有渲染 -->
<script lang="ts" setup>
const [Drawer, drawerApi] = useVbenDrawer({});
</script>

<template>
  <button @click="drawerApi.open()">打开</button>
  <!-- 忘记渲染 Drawer -->
</template>

<!-- ✅ 正确：渲染 Drawer 组件 -->
<template>
  <button @click="drawerApi.open()">打开</button>
  <Drawer>
    <!-- 内容 -->
  </Drawer>
</template>
```

### 错误 2: 未处理关闭逻辑

```typescript
// ❌ 错误：onCancel 中未关闭抽屉
const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    // 只做了其他操作，忘记关闭
    console.log('取消');
  },
});

// ✅ 正确：确保关闭抽屉
const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    // 清理逻辑
    drawerApi.close();
  },
});
```

### 错误 3: 数据未初始化

```vue
<!-- ❌ 错误：直接使用可能为 null 的数据 -->
<template>
  <Drawer>
    <div>{{ selectedData.title }}</div>
  </Drawer>
</template>

<!-- ✅ 正确：先判断数据是否存在 -->
<template>
  <Drawer>
    <div v-if="selectedData">
      <div>{{ selectedData.title }}</div>
    </div>
  </Drawer>
</template>
```

## 完整示例

### 详情抽屉

```vue
<script lang="ts" setup>
import { ref } from 'vue';
import { useVbenDrawer } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';

interface DetailData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  url?: string;
}

const selectedData = ref<DetailData | null>(null);

const [Drawer, drawerApi] = useVbenDrawer({
  title: '详情',
  closable: true,
  footer: true,
  onCancel() {
    selectedData.value = null;
    drawerApi.close();
  },
  onConfirm() {
    if (selectedData.value?.url) {
      window.open(selectedData.value.url, '_blank');
    }
    drawerApi.close();
  },
});

function handleViewDetail(data: DetailData) {
  selectedData.value = data;
  drawerApi.open();
}
</script>

<template>
  <div>
    <!-- 触发按钮 -->
    <button @click="handleViewDetail(item)">
      <IconifyIcon icon="lucide:eye" />
      查看详情
    </button>
    
    <!-- 抽屉 -->
    <Drawer class="w-[600px]" cancel-text="关闭" confirm-text="访问链接">
      <div v-if="selectedData">
        <!-- 标题区域 -->
        <div class="mb-4">
          <div class="mb-2 text-lg font-bold text-gray-900">
            {{ selectedData.title }}
          </div>
          <div class="text-sm text-gray-500">
            {{ selectedData.subtitle }}
          </div>
        </div>
        
        <!-- 内容区域 -->
        <div class="space-y-4">
          <div>
            <div class="mb-2 text-sm font-semibold text-gray-900">描述</div>
            <div class="rounded-lg bg-gray-50 p-3 text-sm leading-relaxed text-gray-700">
              {{ selectedData.description }}
            </div>
          </div>
          
          <div v-if="selectedData.url">
            <div class="mb-2 text-sm font-semibold text-gray-900">链接</div>
            <div class="break-all text-sm text-blue-600">
              {{ selectedData.url }}
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  </div>
</template>
```

## 总结

使用 `useVbenDrawer` 时记住：

1. **必须渲染**：声明后必须在模板中渲染 Drawer 组件
2. **合理宽度**：根据内容复杂度设置合适的宽度
3. **数据传递**：使用 `setData()` 和 `getData()` 传递数据
4. **回调处理**：在 `onCancel` 和 `onConfirm` 中正确处理关闭逻辑
5. **条件渲染**：使用 `v-if` 判断数据是否存在
6. **连接组件**：使用 `connectedComponent` 实现组件复用
7. **自定义按钮**：使用 `cancel-text` 和 `confirm-text` 自定义按钮文本
8. **灵活配置**：根据需求配置 `header` 和 `footer` 的显示
