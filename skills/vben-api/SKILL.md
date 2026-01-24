# Vben API 技能

## 概述

Vben Admin 框架中 API 调用的使用指南。当需要在 Vben Admin 项目中创建、管理 API 接口时使用此技能，包括 RESTful API 定义、请求封装、类型定义、错误处理等场景。适用于需要与后端进行数据交互的各种业务模块。

## 适用场景

- 创建新的 API 模块
- 定义接口类型
- 封装请求函数
- 处理文件上传/下载
- 批量操作接口
- 分页查询接口

## 核心规范

### 1. 文件结构

```
api/
├── [模块名]/
│   ├── index.ts          # 主文件，导出所有 API 函数和类型
│   └── [子模块]/         # 可选，复杂模块可拆分
└── request.ts           # 请求客户端配置
```

### 2. 类型定义规范

```typescript
import type { PageParam, PageResult } from '@vben/request';

export namespace SystemUserApi {
  /** 用户信息 */
  export interface User {
    id?: number;
    username: string;
    nickname: string;
    deptId: number;
    postIds: string[];
    email: string;
    mobile: string;
    sex: number;
    avatar: string;
    loginIp: string;
    status: number;
    remark: string;
    createTime?: Date;
  }
}
```

### 3. API 函数命名规范

| 操作类型 | 函数命名模式 | 示例 |
|---------|------------|------|
| 分页查询 | `get[实体]Page` | `getUserPage` |
| 详情查询 | `get[实体]` | `getUser` |
| 新增 | `create[实体]` | `createUser` |
| 修改 | `update[实体]` | `updateUser` |
| 删除 | `delete[实体]` | `deleteUser` |
| 批量删除 | `delete[实体]List` | `deleteUserList` |
| 导出 | `export[实体]` | `exportUser` |
| 导入 | `import[实体]` | `importUser` |
| 状态修改 | `update[实体]Status` | `updateUserStatus` |
| 获取简单列表 | `getSimple[实体]List` | `getSimpleUserList` |

### 4. 请求方法使用

```typescript
import { requestClient } from '#/api/request';

// GET 请求 - 查询
export function getUserPage(params: PageParam) {
  return requestClient.get<PageResult<SystemUserApi.User>>(
    '/system/user/page',
    { params },
  );
}

// POST 请求 - 新增
export function createUser(data: SystemUserApi.User) {
  return requestClient.post('/system/user/create', data);
}

// PUT 请求 - 修改
export function updateUser(data: SystemUserApi.User) {
  return requestClient.put('/system/user/update', data);
}

// DELETE 请求 - 删除
export function deleteUser(id: number) {
  return requestClient.delete(`/system/user/delete?id=${id}`);
}

// 文件下载
export function exportUser(params: any) {
  return requestClient.download('/system/user/export-excel', { params });
}

// 文件上传
export function importUser(file: File, updateSupport: boolean) {
  return requestClient.upload('/system/user/import', {
    file,
    updateSupport,
  });
}
```

### 5. 分页参数规范

```typescript
// 使用 PageParam 类型定义分页参数
export interface PageParam {
  pageNo: number;
  pageSize: number;
  [key: string]: any; // 其他查询条件
}

// 使用 PageResult 类型接收分页结果
export interface PageResult<T> {
  list: T[];
  total: number;
}
```

### 6. 错误处理

API 错误由 `requestClient` 的拦截器统一处理，业务组件中只需处理成功逻辑：

```typescript
async function handleDelete(row: SystemUserApi.User) {
  const loadingInstance = ElLoading.service({
    text: $t('ui.actionMessage.deleting', [row.username]),
  });
  try {
    await deleteUser(row.id!);
    ElMessage.success($t('ui.actionMessage.deleteSuccess', [row.username]));
    handleRefresh();
  } finally {
    loadingInstance.close();
  }
}
```

## 完整示例

```typescript
// api/system/user/index.ts
import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SystemUserApi {
  export interface User {
    id?: number;
    username: string;
    nickname: string;
    deptId: number;
    postIds: string[];
    email: string;
    mobile: string;
    sex: number;
    avatar: string;
    loginIp: string;
    status: number;
    remark: string;
    createTime?: Date;
  }
}

/** 查询用户管理列表 */
export function getUserPage(params: PageParam) {
  return requestClient.get<PageResult<SystemUserApi.User>>(
    '/system/user/page',
    { params },
  );
}

/** 查询用户详情 */
export function getUser(id: number) {
  return requestClient.get<SystemUserApi.User>(`/system/user/get?id=${id}`);
}

/** 新增用户 */
export function createUser(data: SystemUserApi.User) {
  return requestClient.post('/system/user/create', data);
}

/** 修改用户 */
export function updateUser(data: SystemUserApi.User) {
  return requestClient.put('/system/user/update', data);
}

/** 删除用户 */
export function deleteUser(id: number) {
  return requestClient.delete(`/system/user/delete?id=${id}`);
}

/** 批量删除用户 */
export function deleteUserList(ids: number[]) {
  return requestClient.delete(`/system/user/delete-list?ids=${ids.join(',')}`);
}

/** 导出用户 */
export function exportUser(params: any) {
  return requestClient.download('/system/user/export-excel', { params });
}

/** 下载用户导入模板 */
export function importUserTemplate() {
  return requestClient.download('/system/user/get-import-template');
}

/** 导入用户 */
export function importUser(file: File, updateSupport: boolean) {
  return requestClient.upload('/system/user/import', {
    file,
    updateSupport,
  });
}

/** 用户密码重置 */
export function resetUserPassword(id: number, password: string) {
  return requestClient.put('/system/user/update-password', { id, password });
}

/** 用户状态修改 */
export function updateUserStatus(id: number, status: number) {
  return requestClient.put('/system/user/update-status', { id, status });
}

/** 获取用户精简信息列表 */
export function getSimpleUserList() {
  return requestClient.get<SystemUserApi.User[]>('/system/user/simple-list');
}
```

## 使用提示

1. **类型安全**: 始终为请求和响应定义 TypeScript 类型
2. **命名一致**: 遵循统一的命名规范，便于团队协作
3. **错误处理**: 依赖拦截器统一处理，避免重复代码
4. **文件操作**: 使用 `download` 和 `upload` 方法处理文件
5. **分页规范**: 统一使用 `pageNo` 和 `pageSize` 参数

## 常见问题

### Q: 如何添加自定义请求头？
A: 在 `requestClient` 配置中统一处理，无需在每个 API 函数中添加。

### Q: 如何处理跨域？
A: 在 `vite.config.mts` 中配置代理，API 函数使用相对路径。

### Q: 如何取消请求？
A: `requestClient` 基于 axios，支持 CancelToken，但通常不需要手动取消。

### Q: 如何调试 API 请求？
A: 使用浏览器开发者工具的 Network 面板，或添加请求/响应拦截器日志。