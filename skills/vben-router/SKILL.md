# Vben Router 技能

## 概述

Vben Admin 框架中路由配置的使用指南。当需要在 Vben Admin 项目中创建、管理路由时使用此技能，包括页面路由、嵌套路由、权限路由、动态路由等场景。适用于需要实现页面导航和权限控制的各种业务模块。

## 适用场景

- 创建新的页面路由
- 配置菜单和图标
- 设置路由权限
- 实现嵌套路由
- 配置路由守卫
- 动态路由加载

## 核心规范

### 1. 文件结构

```
router/
├── routes/
│   ├── modules/          # 按模块划分的路由配置
│   │   ├── system.ts     # 系统模块路由
│   │   ├── mall.ts       # 商城模块路由
│   │   └── ...
│   ├── core.ts           # 核心路由（登录、404等）
│   └── index.ts          # 路由聚合
├── access.ts             # 权限控制
├── guard.ts              # 路由守卫
└── index.ts              # 路由主文件
```

### 2. 路由配置规范

```typescript
import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: $t('page.dashboard.title'),
    },
    name: 'Dashboard',
    path: '/dashboard',
    children: [
      {
        name: 'Workspace',
        path: '/workspace',
        component: () => import('#/views/dashboard/workspace/index.vue'),
        meta: {
          icon: 'carbon:workspace',
          title: $t('page.dashboard.workspace'),
        },
      },
      {
        name: 'Analytics',
        path: '/analytics',
        component: () => import('#/views/dashboard/analytics/index.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:area-chart',
          title: $t('page.dashboard.analytics'),
        },
      },
    ],
  },
];
```

### 3. 路由属性说明

| 属性 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `path` | `string` | 路由路径，使用 kebab-case | `/system/user` |
| `name` | `string` | 路由名称，使用 PascalCase | `SystemUser` |
| `component` | `Component` | 组件，使用懒加载 | `() => import('#/views/system/user/index.vue')` |
| `meta.title` | `string` | 页面标题，使用中文或 $t | `'用户管理'` |
| `meta.icon` | `string` | 图标，使用 iconify 格式 | `'ant-design:user-outlined'` |
| `meta.order` | `number` | 菜单排序，越小越靠前 | `-1` |
| `meta.hideInMenu` | `boolean` | 是否在菜单中隐藏 | `true` |
| `meta.affixTab` | `boolean` | 是否固定标签页 | `true` |
| `meta.permissions` | `string[]` | 权限标识数组 | `['system:user:query']` |

### 4. 路由命名规范

- **路径 (path)**: 使用 kebab-case，如 `/system/user-management`
- **名称 (name)**: 使用 PascalCase，如 `SystemUserManagement`
- **模块划分**: 按业务模块组织路由文件

### 5. 图标使用规范

使用 Iconify 图标，格式为 `{collection}:{icon-name}`：

```typescript
meta: {
  icon: 'ant-design:user-outlined',     // Ant Design 图标
  icon: 'lucide:layout-dashboard',      // Lucide 图标
  icon: 'carbon:workspace',             // Carbon 图标
}
```

### 6. 国际化支持

路由标题使用 `$t` 函数进行国际化：

```typescript
import { $t } from '#/locales';

meta: {
  title: $t('page.dashboard.title'),    // 从语言文件读取
}
```

### 7. 权限控制

路由级权限通过 `meta.permissions` 配置：

```typescript
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

### 8. 嵌套路由

使用 `children` 属性配置嵌套路由：

```typescript
{
  path: '/system',
  name: 'System',
  meta: {
    title: '系统管理',
    icon: 'ant-design:setting-outlined',
  },
  children: [
    {
      path: '/system/user',
      name: 'SystemUser',
      component: () => import('#/views/system/user/index.vue'),
      meta: {
        title: '用户管理',
        icon: 'ant-design:user-outlined',
      },
    },
    {
      path: '/system/role',
      name: 'SystemRole',
      component: () => import('#/views/system/role/index.vue'),
      meta: {
        title: '角色管理',
        icon: 'ant-design:team-outlined',
      },
    },
  ],
}
```

## 完整示例

### 系统模块路由

```typescript
// router/routes/modules/system.ts
import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    path: '/system',
    name: 'System',
    meta: {
      title: $t('page.system.title'),
      icon: 'ant-design:setting-outlined',
      order: 100,
    },
    children: [
      {
        path: '/system/user',
        name: 'SystemUser',
        component: () => import('#/views/system/user/index.vue'),
        meta: {
          title: $t('page.system.user.title'),
          icon: 'ant-design:user-outlined',
          permissions: ['system:user:query'],
        },
      },
      {
        path: '/system/role',
        name: 'SystemRole',
        component: () => import('#/views/system/role/index.vue'),
        meta: {
          title: $t('page.system.role.title'),
          icon: 'ant-design:team-outlined',
          permissions: ['system:role:query'],
        },
      },
      {
        path: '/system/dept',
        name: 'SystemDept',
        component: () => import('#/views/system/dept/index.vue'),
        meta: {
          title: $t('page.system.dept.title'),
          icon: 'ant-design:apartment-outlined',
          permissions: ['system:dept:query'],
        },
      },
      {
        path: '/system/menu',
        name: 'SystemMenu',
        component: () => import('#/views/system/menu/index.vue'),
        meta: {
          title: $t('page.system.menu.title'),
          icon: 'ant-design:menu-outlined',
          permissions: ['system:menu:query'],
        },
      },
    ],
  },
  // 隐藏菜单的路由
  {
    path: '/system/notify-message',
    component: () => import('#/views/system/notify/my/index.vue'),
    name: 'MyNotifyMessage',
    meta: {
      title: '我的站内信',
      icon: 'ant-design:message-filled',
      hideInMenu: true,
    },
  },
];

export default routes;
```

### 核心路由（登录、404等）

```typescript
// router/routes/core.ts
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard/workspace',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('#/views/_core/login/index.vue'),
    meta: {
      title: '登录',
      hideInMenu: true,
    },
  },
  {
    path: '/:path(.*)*',
    name: 'NotFound',
    component: () => import('#/views/_core/exception/404.vue'),
    meta: {
      title: '页面不存在',
      hideInMenu: true,
    },
  },
];

export default routes;
```

## 路由聚合

```typescript
// router/routes/index.ts
import type { RouteRecordRaw } from 'vue-router';

import coreRoutes from './core';
import systemRoutes from './modules/system';
import mallRoutes from './modules/mall';
import dashboardRoutes from './modules/dashboard';
// 导入其他模块路由...

const routes: RouteRecordRaw[] = [
  ...coreRoutes,
  ...dashboardRoutes,
  ...systemRoutes,
  ...mallRoutes,
  // 其他模块路由...
];

export default routes;
```

## 使用提示

1. **懒加载**: 始终使用 `() => import()` 进行组件懒加载
2. **模块化**: 按业务模块组织路由文件
3. **国际化**: 路由标题使用 `$t` 函数
4. **权限控制**: 合理配置 `meta.permissions`
5. **图标规范**: 统一使用 Iconify 图标
6. **路径规范**: 使用 kebab-case，保持一致性

## 常见问题

### Q: 如何添加新的路由模块？
A: 在 `router/routes/modules/` 下创建新的路由文件，然后在 `router/routes/index.ts` 中导入。

### Q: 如何配置路由守卫？
A: 在 `router/guard.ts` 中配置全局路由守卫，处理权限验证、登录状态等。

### Q: 如何实现动态路由？
A: 通过后端接口获取路由配置，使用 `router.addRoute()` 动态添加。

### Q: 如何隐藏某个路由的菜单？
A: 设置 `meta.hideInMenu: true`。

### Q: 如何固定标签页？
A: 设置 `meta.affixTab: true`，该页面标签将不可关闭。