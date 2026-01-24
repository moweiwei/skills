# Vben Element Plus 技能

## 概述

Vben Admin 框架中 Element Plus 组件库的使用指南。当需要在 Vben Admin 项目中使用 Element Plus 组件时使用此技能，包括基础组件、表单组件、数据展示组件、反馈组件等场景。适用于需要构建用户界面的各种业务模块。

## 适用场景

- 使用 Element Plus 基础组件
- 构建表单界面
- 展示数据表格
- 实现弹窗和提示
- 处理用户反馈
- 布局和导航

## 核心规范

### 1. 导入规范

按需导入 Element Plus 组件：

```typescript
// 基础组件
import { ElButton, ElInput, ElSelect } from 'element-plus';

// 反馈组件
import { ElMessage, ElLoading, ElNotification } from 'element-plus';

// 布局组件
import { ElRow, ElCol, ElCard } from 'element-plus';

// 表单组件
import { ElForm, ElFormItem, ElCheckbox, ElRadio } from 'element-plus';

// 数据展示
import { ElTable, ElPagination, ElTag } from 'element-plus';

// 导航组件
import { ElMenu, ElTabs, ElBreadcrumb } from 'element-plus';
```

### 2. 组件使用规范

#### 按钮组件

```vue
<template>
  <ElButton type="primary" @click="handleClick">
    主要按钮
  </ElButton>
  
  <ElButton type="success" :loading="loading">
    成功按钮
  </ElButton>
  
  <ElButton type="danger" plain>
    危险按钮
  </ElButton>
  
  <ElButton type="text" :disabled="disabled">
    文字按钮
  </ElButton>
</template>
```

#### 表单组件

```vue
<template>
  <ElForm :model="form" :rules="rules" ref="formRef">
    <ElFormItem label="用户名" prop="username">
      <ElInput v-model="form.username" placeholder="请输入用户名" />
    </ElFormItem>
    
    <ElFormItem label="密码" prop="password">
      <ElInput 
        v-model="form.password" 
        type="password" 
        placeholder="请输入密码"
        show-password
      />
    </ElFormItem>
    
    <ElFormItem label="角色" prop="role">
      <ElSelect v-model="form.role" placeholder="请选择角色">
        <ElOption label="管理员" value="admin" />
        <ElOption label="用户" value="user" />
      </ElSelect>
    </ElFormItem>
  </ElForm>
</template>
```

#### 表格组件

```vue
<template>
  <ElTable :data="tableData" style="width: 100%">
    <ElTableColumn prop="date" label="日期" width="180" />
    <ElTableColumn prop="name" label="姓名" width="180" />
    <ElTableColumn prop="address" label="地址" />
    
    <ElTableColumn label="操作" width="120">
      <template #default="{ row }">
        <ElButton type="text" @click="handleEdit(row)">编辑</ElButton>
        <ElButton type="text" @click="handleDelete(row)">删除</ElButton>
      </template>
    </ElTableColumn>
  </ElTable>
  
  <ElPagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :total="total"
    layout="total, sizes, prev, pager, next, jumper"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>
```

### 3. 反馈组件使用

#### 消息提示

```typescript
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus';

// 成功提示
ElMessage.success('操作成功');

// 错误提示
ElMessage.error('操作失败');

// 警告提示
ElMessage.warning('请注意');

// 确认对话框
ElMessageBox.confirm('确定删除吗？', '提示', {
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  type: 'warning',
}).then(() => {
  // 确定操作
}).catch(() => {
  // 取消操作
});

// 通知
ElNotification.success({
  title: '成功',
  message: '这是一条成功的提示消息',
  duration: 3000,
});
```

#### 加载状态

```typescript
import { ElLoading } from 'element-plus';

// 全屏加载
const loadingInstance = ElLoading.service({
  lock: true,
  text: '加载中...',
  background: 'rgba(0, 0, 0, 0.7)',
});

// 关闭加载
loadingInstance.close();

// 局部加载（在组件上使用）
<ElButton :loading="loading" @click="handleSubmit">
  提交
</ElButton>
```

### 4. 布局组件

#### 栅格布局

```vue
<template>
  <ElRow :gutter="20">
    <ElCol :span="6">
      <ElCard>左侧内容</ElCard>
    </ElCol>
    <ElCol :span="18">
      <ElCard>右侧内容</ElCard>
    </ElCol>
  </ElRow>
</template>
```

#### 卡片组件

```vue
<template>
  <ElCard class="box-card">
    <template #header>
      <div class="card-header">
        <span>卡片标题</span>
        <ElButton type="text">操作按钮</ElButton>
      </div>
    </template>
    
    <div>卡片内容</div>
  </ElCard>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
```

### 5. 图标使用

Element Plus 使用 Iconify 图标系统：

```vue
<template>
  <!-- 使用 Iconify 图标 -->
  <ElIcon :size="20">
    <Edit />
  </ElIcon>
  
  <!-- 在按钮中使用图标 -->
  <ElButton type="primary" :icon="Search">
    搜索
  </ElButton>
</template>

<script setup lang="ts">
import { Edit, Search } from '@element-plus/icons-vue';
</script>
```

### 6. 主题和样式

#### 自定义主题色

在 `tailwind.config.mjs` 中配置：

```javascript
export default {
  theme: {
    extend: {
      colors: {
        primary: 'var(--el-color-primary)',
        success: 'var(--el-color-success)',
        warning: 'var(--el-color-warning)',
        danger: 'var(--el-color-danger)',
        info: 'var(--el-color-info)',
      },
    },
  },
};
```

#### 使用 CSS 变量

```css
.custom-element {
  color: var(--el-color-primary);
  background-color: var(--el-bg-color);
  border: 1px solid var(--el-border-color);
}
```

## 完整示例

### 用户管理页面

```vue
<template>
  <ElCard class="user-management">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="text-lg font-semibold">用户管理</span>
        <ElButton type="primary" :icon="Plus" @click="handleCreate">
          新增用户
        </ElButton>
      </div>
    </template>
    
    <!-- 搜索表单 -->
    <ElForm :model="searchForm" inline>
      <ElFormItem label="用户名">
        <ElInput 
          v-model="searchForm.username" 
          placeholder="请输入用户名"
          clearable
        />
      </ElFormItem>
      
      <ElFormItem label="状态">
        <ElSelect v-model="searchForm.status" placeholder="请选择状态" clearable>
          <ElOption label="启用" :value="1" />
          <ElOption label="禁用" :value="0" />
        </ElSelect>
      </ElFormItem>
      
      <ElFormItem>
        <ElButton type="primary" :icon="Search" @click="handleSearch">
          搜索
        </ElButton>
        <ElButton :icon="Refresh" @click="handleReset">
          重置
        </ElButton>
      </ElFormItem>
    </ElForm>
    
    <!-- 用户表格 -->
    <ElTable 
      :data="userList" 
      v-loading="loading"
      style="width: 100%; margin-top: 20px;"
    >
      <ElTableColumn prop="id" label="ID" width="80" />
      <ElTableColumn prop="username" label="用户名" />
      <ElTableColumn prop="nickname" label="昵称" />
      <ElTableColumn prop="email" label="邮箱" />
      <ElTableColumn prop="mobile" label="手机号" />
      
      <ElTableColumn prop="status" label="状态" width="100">
        <template #default="{ row }">
          <ElTag :type="row.status === 1 ? 'success' : 'danger'">
            {{ row.status === 1 ? '启用' : '禁用' }}
          </ElTag>
        </template>
      </ElTableColumn>
      
      <ElTableColumn prop="createTime" label="创建时间" width="180" />
      
      <ElTableColumn label="操作" width="200" fixed="right">
        <template #default="{ row }">
          <ElButton type="primary" size="small" :icon="Edit" @click="handleEdit(row)">
            编辑
          </ElButton>
          <ElButton 
            type="danger" 
            size="small" 
            :icon="Delete" 
            @click="handleDelete(row)"
          >
            删除
          </ElButton>
        </template>
      </ElTableColumn>
    </ElTable>
    
    <!-- 分页 -->
    <ElPagination
      v-model:current-page="pagination.pageNo"
      v-model:page-size="pagination.pageSize"
      :total="pagination.total"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      style="margin-top: 20px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </ElCard>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus, Search, Refresh, Edit, Delete } from '@element-plus/icons-vue';

import type { User } from '#/api/system/user';
import { getUserPage, deleteUser } from '#/api/system/user';

// 搜索表单
const searchForm = reactive({
  username: '',
  status: undefined as number | undefined,
});

// 用户列表
const userList = ref<User[]>([]);
const loading = ref(false);

// 分页
const pagination = reactive({
  pageNo: 1,
  pageSize: 10,
  total: 0,
});

// 获取用户列表
async function fetchUserList() {
  loading.value = true;
  try {
    const params = {
      pageNo: pagination.pageNo,
      pageSize: pagination.pageSize,
      ...searchForm,
    };
    
    const result = await getUserPage(params);
    userList.value = result.list;
    pagination.total = result.total;
  } finally {
    loading.value = false;
  }
}

// 搜索
function handleSearch() {
  pagination.pageNo = 1;
  fetchUserList();
}

// 重置
function handleReset() {
  searchForm.username = '';
  searchForm.status = undefined;
  handleSearch();
}

// 分页大小改变
function handleSizeChange(size: number) {
  pagination.pageSize = size;
  fetchUserList();
}

// 当前页改变
function handleCurrentChange(page: number) {
  pagination.pageNo = page;
  fetchUserList();
}

// 新增用户
function handleCreate() {
  // 打开新增对话框
  ElMessage.info('打开新增对话框');
}

// 编辑用户
function handleEdit(row: User) {
  // 打开编辑对话框
  ElMessage.info(`编辑用户: ${row.username}`);
}

// 删除用户
async function handleDelete(row: User) {
  try {
    await ElMessageBox.confirm(
      `确定删除用户 "${row.username}" 吗？`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    );
    
    await deleteUser(row.id!);
    ElMessage.success('删除成功');
    fetchUserList();
  } catch {
    // 用户取消
  }
}

// 初始化
onMounted(() => {
  fetchUserList();
});
</script>

<style scoped>
.user-management {
  margin: 20px;
}
</style>
```

## 使用提示

1. **按需导入**: 只导入需要的组件，减少打包体积
2. **响应式设计**: 使用栅格系统实现响应式布局
3. **统一风格**: 遵循 Element Plus 的设计规范
4. **错误处理**: 合理使用反馈组件提示用户
5. **性能优化**: 大数据量表格使用虚拟滚动
6. **无障碍**: 为重要操作添加适当的 ARIA 属性

## 常见问题

### Q: 如何自定义 Element Plus 主题？
A: 在 `vite.config.mts` 中配置 `ElementPlus` 插件，或使用 CSS 变量覆盖。

### Q: 如何解决图标不显示？
A: 确保正确导入 `@element-plus/icons-vue` 并注册图标组件。

### Q: 表格数据量大时卡顿怎么办？
A: 使用虚拟滚动或分页加载，避免一次性渲染大量数据。

### Q: 如何实现表单验证？
A: 使用 `ElForm` 的 `rules` 属性，或配合 `zod` 进行验证。

### Q: 如何全局配置 Element Plus？
A: 在 `main.ts` 中通过 `app.use(ElementPlus, { ... })` 进行全局配置。