# Vben Permission 技能

## 概述

Vben Admin 框架中权限控制的使用指南。当需要在 Vben Admin 项目中实现权限控制时使用此技能，包括路由权限、按钮权限、数据权限、菜单权限等场景。适用于需要实现细粒度权限控制的各种业务模块。

## 适用场景

- 路由访问权限控制
- 按钮操作权限控制
- 菜单显示权限控制
- 数据范围权限控制
- 接口访问权限控制
- 角色和权限分配

## 核心规范

### 1. 权限体系架构

Vben Admin 采用 RBAC（基于角色的访问控制）权限模型：

```
用户 (User) → 角色 (Role) → 权限 (Permission) → 资源 (Resource)
```

- **用户**: 系统使用者，可以拥有多个角色
- **角色**: 权限集合，如管理员、普通用户
- **权限**: 具体操作权限，如 `system:user:create`
- **资源**: 被保护的对象，如菜单、按钮、数据

### 2. 权限标识规范

权限标识采用 `模块:资源:操作` 的三段式格式：

```typescript
// 系统模块
'system:user:create'    // 创建用户
'system:user:update'    // 修改用户
'system:user:delete'    // 删除用户
'system:user:query'     // 查询用户
'system:user:export'    // 导出用户
'system:user:import'    // 导入用户

// 商城模块
'mall:product:create'   // 创建商品
'mall:order:query'      // 查询订单
'mall:order:update'     // 修改订单

// CRM 模块
'crm:customer:create'   // 创建客户
'crm:contract:query'    // 查询合同
```

### 3. 路由权限控制

#### 路由级权限

在路由配置中通过 `meta.permissions` 设置权限：

```typescript
// router/routes/modules/system.ts
{
  path: '/system/user',
  name: 'SystemUser',
  component: () => import('#/views/system/user/index.vue'),
  meta: {
    title: '用户管理',
    icon: 'ant-design:user-outlined',
    permissions: ['system:user:query'], // 需要此权限才能访问
  },
}
```

#### 动态路由生成

系统根据用户权限动态生成可访问的路由：

```typescript
// router/access.ts
import { generateAccessible } from '@vben/access';
import { useAccessStore } from '@vben/stores';

async function generateAccess(options) {
  const accessStore = useAccessStore();
  
  return await generateAccessible('backend', {
    ...options,
    fetchMenuListAsync: async () => {
      const accessMenus = accessStore.accessMenus;
      return convertServerMenuToRouteRecordStringComponent(accessMenus);
    },
    forbiddenComponent: () => import('#/views/_core/fallback/forbidden.vue'),
  });
}
```

### 4. 按钮权限控制

#### 使用 `auth` 属性

在按钮组件上使用 `auth` 属性控制显示：

```vue
<template>
  <TableAction
    :actions="[
      {
        label: '新增用户',
        type: 'primary',
        icon: ACTION_ICON.ADD,
        auth: ['system:user:create'], // 按钮权限控制
        onClick: handleCreate,
      },
      {
        label: '导出用户',
        type: 'primary',
        icon: ACTION_ICON.DOWNLOAD,
        auth: ['system:user:export'],
        onClick: handleExport,
      },
      {
        label: '批量删除',
        type: 'danger',
        icon: ACTION_ICON.DELETE,
        auth: ['system:user:delete'],
        disabled: isEmpty(checkedIds),
        onClick: handleDeleteBatch,
      },
    ]"
  />
</template>
```

#### 使用 `v-auth` 指令

使用 `v-auth` 指令控制元素显示：

```vue
<template>
  <!-- 单个权限 -->
  <ElButton v-auth="'system:user:create'" @click="handleCreate">
    新增用户
  </ElButton>
  
  <!-- 多个权限（满足任意一个即可） -->
  <ElButton 
    v-auth="['system:user:create', 'system:user:update']" 
    @click="handleEdit"
  >
    编辑用户
  </ElButton>
  
  <!-- 权限不满足时隐藏 -->
  <div v-auth.hide="'system:user:delete'">
    删除按钮（无权限时隐藏）
  </div>
  
  <!-- 权限不满足时禁用 -->
  <ElButton 
    v-auth.disable="'system:user:export'" 
    @click="handleExport"
  >
    导出（无权限时禁用）
  </ElButton>
</template>
```

### 5. 编程式权限检查

#### 使用 `usePermission` 钩子

```typescript
import { usePermission } from '@vben/hooks';

function checkPermission() {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermission();
  
  // 检查单个权限
  const canCreateUser = hasPermission('system:user:create');
  
  // 检查任意权限
  const canEditOrDelete = hasAnyPermission(['system:user:update', 'system:user:delete']);
  
  // 检查所有权限
  const canFullManage = hasAllPermissions(['system:user:create', 'system:user:update', 'system:user:delete']);
  
  return {
    canCreateUser,
    canEditOrDelete,
    canFullManage,
  };
}
```

#### 在组件中使用

```vue
<script setup lang="ts">
import { usePermission } from '@vben/hooks';

const { hasPermission } = usePermission();

// 检查权限
const canCreate = hasPermission('system:user:create');
const canDelete = hasPermission('system:user:delete');

// 根据权限控制逻辑
function handleAction(action: string) {
  if (action === 'create' && !canCreate) {
    ElMessage.error('没有创建权限');
    return;
  }
  
  if (action === 'delete' && !canDelete) {
    ElMessage.error('没有删除权限');
    return;
  }
  
  // 执行操作...
}
</script>
```

### 6. 数据权限控制

#### 数据范围权限

```typescript
// 检查数据范围权限
import { useDataScope } from '@vben/hooks';

function checkDataScope() {
  const { getDataScope, checkDataAccess } = useDataScope();
  
  // 获取用户的数据范围
  const dataScope = getDataScope('system:dept');
  
  // 检查是否有权限访问特定数据
  const canAccessDept = checkDataAccess('system:dept', deptId);
  
  return {
    dataScope,
    canAccessDept,
  };
}
```

#### 数据过滤

在查询数据时根据权限过滤：

```typescript
async function fetchUserList() {
  const { getDataScope } = useDataScope();
  const dataScope = getDataScope('system:user');
  
  const params = {
    pageNo: 1,
    pageSize: 10,
    // 根据数据范围添加过滤条件
    deptIds: dataScope.deptIds,
    userIds: dataScope.userIds,
  };
  
  const result = await getUserPage(params);
  return result;
}
```

### 7. 菜单权限控制

菜单权限由后端返回，前端根据权限动态生成菜单：

```typescript
// 从后端获取权限菜单
async function fetchUserPermissions() {
  const authPermissionInfo = await getAuthPermissionInfoApi();
  
  // 存储到 Store
  const accessStore = useAccessStore();
  accessStore.setAccessMenus(authPermissionInfo.menus);
  accessStore.setAccessCodes(authPermissionInfo.permissions);
  
  return authPermissionInfo;
}
```

### 8. 接口权限控制

#### 前端接口权限检查

在调用 API 前检查权限：

```typescript
import { usePermission } from '@vben/hooks';

async function deleteUser(id: number) {
  const { hasPermission } = usePermission();
  
  // 检查权限
  if (!hasPermission('system:user:delete')) {
    ElMessage.error('没有删除权限');
    return;
  }
  
  // 调用 API
  await deleteUserApi(id);
  ElMessage.success('删除成功');
}
```

#### 后端接口权限验证

后端接口会自动验证权限，前端只需处理错误：

```typescript
async function handleDelete(row: User) {
  try {
    await deleteUser(row.id!);
    ElMessage.success('删除成功');
    handleRefresh();
  } catch (error: any) {
    if (error.code === 403) {
      ElMessage.error('没有操作权限');
    } else {
      ElMessage.error(error.message || '删除失败');
    }
  }
}
```

## 完整示例

### 用户管理页面权限控制

```vue
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

import { usePermission } from '@vben/hooks';
import { isEmpty } from '@vben/utils';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import { 
  deleteUser, 
  deleteUserList, 
  exportUser, 
  getUserPage,
  updateUserStatus,
} from '#/api/system/user';
import { $t } from '#/locales';

import { useGridColumns, useGridFormSchema } from './data';

// 权限检查
const { hasPermission, hasAnyPermission } = usePermission();

// 检查各种权限
const canCreateUser = hasPermission('system:user:create');
const canUpdateUser = hasPermission('system:user:update');
const canDeleteUser = hasPermission('system:user:delete');
const canExportUser = hasPermission('system:user:export');
const canImportUser = hasPermission('system:user:import');

// 检查组合权限
const canManageUser = hasAnyPermission(['system:user:create', 'system:user:update', 'system:user:delete']);

// 表格操作
const checkedIds = ref<number[]>([]);

// 创建用户
function handleCreate() {
  if (!canCreateUser) {
    ElMessage.error('没有创建用户权限');
    return;
  }
  // 打开创建对话框...
}

// 编辑用户
function handleEdit(row: User) {
  if (!canUpdateUser) {
    ElMessage.error('没有编辑用户权限');
    return;
  }
  // 打开编辑对话框...
}

// 删除用户
async function handleDelete(row: User) {
  if (!canDeleteUser) {
    ElMessage.error('没有删除用户权限');
    return;
  }
  
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
    handleRefresh();
  } catch {
    // 用户取消
  }
}

// 批量删除
async function handleDeleteBatch() {
  if (!canDeleteUser) {
    ElMessage.error('没有删除用户权限');
    return;
  }
  
  if (isEmpty(checkedIds.value)) {
    ElMessage.warning('请选择要删除的用户');
    return;
  }
  
  try {
    await ElMessageBox.confirm(
      `确定删除选中的 ${checkedIds.value.length} 个用户吗？`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    );
    
    await deleteUserList(checkedIds.value);
    checkedIds.value = [];
    ElMessage.success('删除成功');
    handleRefresh();
  } catch {
    // 用户取消
  }
}

// 导出用户
async function handleExport() {
  if (!canExportUser) {
    ElMessage.error('没有导出用户权限');
    return;
  }
  
  try {
    const data = await exportUser(await gridApi.formApi.getValues());
    downloadFileFromBlobPart({ fileName: '用户.xls', source: data });
    ElMessage.success('导出成功');
  } catch {
    ElMessage.error('导出失败');
  }
}

// 表格配置
const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: useGridFormSchema(),
  },
  gridOptions: {
    columns: useGridColumns(),
    // ... 其他配置
  },
});
</script>

<template>
  <Page auto-content-height>
    <Grid table-title="用户列表">
      <template #toolbar-tools>
        <!-- 根据权限显示按钮 -->
        <TableAction
          :actions="[
            {
              label: $t('ui.actionTitle.create', ['用户']),
              type: 'primary',
              icon: ACTION_ICON.ADD,
              auth: ['system:user:create'], // 权限控制
              onClick: handleCreate,
            },
            {
              label: $t('ui.actionTitle.export'),
              type: 'primary',
              icon: ACTION_ICON.DOWNLOAD,
              auth: ['system:user:export'], // 权限控制
              onClick: handleExport,
            },
            {
              label: $t('ui.actionTitle.deleteBatch'),
              type: 'danger',
              icon: ACTION_ICON.DELETE,
              auth: ['system:user:delete'], // 权限控制
              disabled: isEmpty(checkedIds),
              onClick: handleDeleteBatch,
            },
          ]"
        />
      </template>
      
      <template #actions="{ row }">
        <!-- 行操作按钮 -->
        <TableAction
          :actions="[
            {
              label: $t('common.edit'),
              type: 'link',
              icon: ACTION_ICON.EDIT,
              auth: ['system:user:update'], // 权限控制
              onClick: handleEdit.bind(null, row),
            },
            {
              label: $t('common.delete'),
              type: 'link',
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['system:user:delete'], // 权限控制
              popConfirm: {
                title: $t('ui.actionMessage.deleteConfirm', [row.username]),
                confirm: handleDelete.bind(null, row),
              },
            },
          ]"
          :drop-down-actions="[
            {
              label: '分配角色',
              type: 'link',
              auth: ['system:permission:assign-user-role'], // 权限控制
              onClick: handleAssignRole.bind(null, row),
            },
            {
              label: '重置密码',
              type: 'link',
              auth: ['system:user:update-password'], // 权限控制
              onClick: handleResetPassword.bind(null, row),
            },
          ]"
        />
      </template>
    </Grid>
    
    <!-- 使用 v-auth 指令控制元素 -->
    <div class="mt-4" v-if="canManageUser">
      <p>您有用户管理权限，可以执行以下操作：</p>
      <div class="space-x-2">
        <ElButton 
          v-auth="'system:user:create'" 
          type="primary"
          @click="handleCreate"
        >
          新增用户
        </ElButton>
        <ElButton 
          v-auth.disable="'system:user:export'"
          @click="handleExport"
        >
          导出数据
        </ElButton>
      </div>
    </div>
    
    <div v-else class="mt-4 text-gray-500">
      您只有查看权限，无法进行修改操作
    </div>
  </Page>
</template>
```

### 权限守卫示例

```typescript
// router/guard.ts
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

import { usePermission } from '@vben/hooks';
import { ElMessage } from 'element-plus';

/**
 * 权限守卫
 */
export function createPermissionGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const { meta } = to;
  
  // 不需要权限验证的路由
  if (!meta?.permissions || meta.permissions.length === 0) {
    next();
    return;
  }
  
  // 检查权限
  const { hasAnyPermission } = usePermission();
  const hasPermission = hasAnyPermission(meta.permissions as string[]);
  
  if (hasPermission) {
    next();
  } else {
    // 无权限，跳转到403页面或提示
    if (meta.menuVisibleWithForbidden) {
      // 显示菜单但内容为403
      next();
    } else {
      ElMessage.error('没有访问权限');
      next('/403');
    }
  }
}
```

## 使用提示

1. **最小权限原则**: 只授予用户完成工作所需的最小权限
2. **前端验证为辅**: 前端权限验证只是用户体验优化，后端必须进行权限验证
3. **权限缓存**: 用户权限信息应缓存，避免频繁请求
4. **权限变更通知**: 权限变更后应及时通知用户重新登录或刷新权限
5. **错误处理**: 权限不足时应给出友好的错误提示

## 常见问题

### Q: 如何添加新的权限标识？
A: 在后端权限系统中定义新的权限标识，前端在需要的地方使用该标识。

### Q: 权限验证失败后如何跳转？
A: 可以跳转到 403 页面，或在当前页面显示无权限提示。

### Q: 如何实现按钮级权限控制？
A: 使用 `v-auth` 指令或 `TableAction` 组件的 `auth` 属性。

### Q: 数据权限如何实现？
A: 通过后端返回数据范围，前端在查询时添加过滤条件。

### Q: 权限变更后如何立即生效？
A: 清除权限缓存，重新获取用户权限信息，或要求用户重新登录。