# Vben Pinia 技能

## 概述

Vben Admin 框架中状态管理（Pinia）的使用指南。当需要在 Vben Admin 项目中创建、管理全局状态时使用此技能，包括用户信息、权限信息、应用配置、业务状态等场景。适用于需要跨组件共享状态的各种业务模块。

## 适用场景

- 用户信息管理
- 权限状态管理
- 应用配置管理
- 业务模块状态共享
- 表单状态持久化
- 页面间数据传递

## 核心规范

### 1. 文件结构

```
store/
├── auth.ts              # 认证相关状态
├── user.ts              # 用户信息状态
├── app.ts               # 应用配置状态
├── [模块名].ts          # 业务模块状态
└── index.ts             # Store 聚合导出
```

### 2. Store 命名规范

- **文件命名**: 使用 kebab-case，如 `user-info.ts`
- **Store 命名**: 使用 `use[Name]Store` 格式，如 `useUserInfoStore`
- **变量命名**: 使用 camelCase，如 `userInfo`

### 3. Composition API 风格

使用 Composition API 风格定义 Store：

```typescript
import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  // 状态
  const loginLoading = ref(false);
  const userToken = ref<string | null>(null);
  
  // Getter（计算属性）
  const isLoggedIn = computed(() => !!userToken.value);
  
  // Action（方法）
  async function login(credentials: LoginCredentials) {
    loginLoading.value = true;
    try {
      const result = await loginApi(credentials);
      userToken.value = result.accessToken;
      // 其他逻辑...
    } finally {
      loginLoading.value = false;
    }
  }
  
  function logout() {
    userToken.value = null;
  }
  
  // 重置状态
  function $reset() {
    loginLoading.value = false;
    userToken.value = null;
  }
  
  return {
    // 状态
    loginLoading,
    userToken,
    
    // Getter
    isLoggedIn,
    
    // Action
    login,
    logout,
    $reset,
  };
});
```

### 4. 状态类型定义

始终为状态定义 TypeScript 类型：

```typescript
import type { UserInfo, RoleInfo } from '@vben/types';

interface AuthState {
  userInfo: UserInfo | null;
  roles: RoleInfo[];
  permissions: string[];
  loginLoading: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    userInfo: null,
    roles: [],
    permissions: [],
    loginLoading: false,
  }),
  
  getters: {
    hasPermission: (state) => (permission: string) => {
      return state.permissions.includes(permission);
    },
  },
  
  actions: {
    async fetchUserInfo() {
      // ...
    },
  },
});
```

### 5. 模块化 Store 设计

按功能模块划分 Store，避免单个 Store 过于庞大：

```typescript
// store/user.ts - 用户信息
export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo | null>(null);
  const userRoles = ref<RoleInfo[]>([]);
  
  function setUserInfo(info: UserInfo) {
    userInfo.value = info;
  }
  
  return { userInfo, userRoles, setUserInfo };
});

// store/auth.ts - 认证状态
export const useAuthStore = defineStore('auth', () => {
  const userStore = useUserStore();
  const accessToken = ref<string | null>(null);
  
  async function login(credentials: LoginCredentials) {
    // 调用 API
    const result = await loginApi(credentials);
    accessToken.value = result.accessToken;
    
    // 获取用户信息
    const userInfo = await fetchUserInfo();
    userStore.setUserInfo(userInfo);
  }
  
  return { accessToken, login };
});
```

### 6. 持久化存储

对于需要持久化的状态，使用 `@vben/preferences`：

```typescript
import { preferences } from '@vben/preferences';

export const useAppStore = defineStore('app', () => {
  // 从本地存储读取
  const sidebarCollapsed = ref(
    preferences.app.sidebarCollapsed ?? false,
  );
  
  // 保存到本地存储
  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value;
    preferences.app.sidebarCollapsed = sidebarCollapsed.value;
  }
  
  return { sidebarCollapsed, toggleSidebar };
});
```

### 7. Store 间通信

Store 之间可以相互调用：

```typescript
export const useAuthStore = defineStore('auth', () => {
  const userStore = useUserStore();
  const accessStore = useAccessStore();
  
  async function login(credentials: LoginCredentials) {
    const result = await loginApi(credentials);
    
    // 更新多个 Store
    userStore.setUserInfo(result.user);
    accessStore.setPermissions(result.permissions);
  }
  
  return { login };
});
```

## 完整示例

### 认证 Store

```typescript
// store/auth.ts
import type { AuthPermissionInfo, Recordable, UserInfo } from '@vben/types';
import type { AuthApi } from '#/api';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { LOGIN_PATH } from '@vben/constants';
import { preferences } from '@vben/preferences';
import { resetAllStores, useAccessStore, useUserStore } from '@vben/stores';

import { ElNotification } from 'element-plus';
import { defineStore } from 'pinia';

import {
  getAuthPermissionInfoApi,
  loginApi,
  logoutApi,
  register,
  smsLogin,
  socialLogin,
} from '#/api';
import { $t } from '#/locales';

export const useAuthStore = defineStore('auth', () => {
  const accessStore = useAccessStore();
  const userStore = useUserStore();
  const router = useRouter();

  const loginLoading = ref(false);

  /**
   * 异步处理登录操作
   */
  async function authLogin(
    type: 'mobile' | 'register' | 'social' | 'username',
    params: Recordable<any>,
    onSuccess?: () => Promise<void> | void,
  ) {
    let userInfo: null | UserInfo = null;
    try {
      let loginResult: AuthApi.LoginResult;
      loginLoading.value = true;
      switch (type) {
        case 'mobile': {
          loginResult = await smsLogin(params as AuthApi.SmsLoginParams);
          break;
        }
        case 'register': {
          loginResult = await register(params as AuthApi.RegisterParams);
          break;
        }
        case 'social': {
          loginResult = await socialLogin(params as AuthApi.SocialLoginParams);
          break;
        }
        default: {
          loginResult = await loginApi(params);
        }
      }
      const { accessToken, refreshToken } = loginResult;

      if (accessToken) {
        accessStore.setAccessToken(accessToken);
        accessStore.setRefreshToken(refreshToken);

        const fetchUserInfoResult = await fetchUserInfo();
        userInfo = fetchUserInfoResult.user;

        if (accessStore.loginExpired) {
          accessStore.setLoginExpired(false);
        } else {
          onSuccess
            ? await onSuccess?.()
            : await router.push(
                userInfo.homePath || preferences.app.defaultHomePath,
              );
        }

        if (userInfo?.nickname) {
          ElNotification.success({
            message: `${$t('authentication.loginSuccessDesc')}:${userInfo?.nickname}`,
            duration: 3,
            title: $t('authentication.loginSuccess'),
          });
        }
      }
    } finally {
      loginLoading.value = false;
    }

    return {
      userInfo,
    };
  }

  async function logout(redirect: boolean = true) {
    try {
      const accessToken = accessStore.accessToken as string;
      if (accessToken) {
        await logoutApi(accessToken);
      }
    } catch {
      // 不做任何处理
    }
    resetAllStores();
    accessStore.setLoginExpired(false);

    await router.replace({
      path: LOGIN_PATH,
      query: redirect
        ? {
            redirect: encodeURIComponent(router.currentRoute.value.fullPath),
          }
        : {},
    });
  }

  async function fetchUserInfo() {
    const authPermissionInfo: AuthPermissionInfo | null =
      await getAuthPermissionInfoApi();
    userStore.setUserInfo(authPermissionInfo.user);
    userStore.setUserRoles(authPermissionInfo.roles);
    accessStore.setAccessMenus(authPermissionInfo.menus);
    accessStore.setAccessCodes(authPermissionInfo.permissions);
    return authPermissionInfo;
  }

  function $reset() {
    loginLoading.value = false;
  }

  return {
    $reset,
    authLogin,
    fetchUserInfo,
    loginLoading,
    logout,
  };
});
```

### 业务模块 Store

```typescript
// store/mall/kefu.ts
import type { MallKefuApi } from '#/api/mall/kefu';

import { ref } from 'vue';
import { defineStore } from 'pinia';

import { getKefuList } from '#/api/mall/kefu';

interface KefuState {
  kefuList: MallKefuApi.Kefu[];
  loading: boolean;
  pagination: {
    pageNo: number;
    pageSize: number;
    total: number;
  };
}

export const useMallKefuStore = defineStore('mall-kefu', {
  state: (): KefuState => ({
    kefuList: [],
    loading: false,
    pagination: {
      pageNo: 1,
      pageSize: 10,
      total: 0,
    },
  }),

  getters: {
    onlineKefuList: (state) => {
      return state.kefuList.filter(kefu => kefu.status === 1);
    },
  },

  actions: {
    async fetchKefuList(params?: any) {
      this.loading = true;
      try {
        const result = await getKefuList({
          pageNo: this.pagination.pageNo,
          pageSize: this.pagination.pageSize,
          ...params,
        });
        this.kefuList = result.list;
        this.pagination.total = result.total;
      } finally {
        this.loading = false;
      }
    },

    setPagination(pageNo: number, pageSize: number) {
      this.pagination.pageNo = pageNo;
      this.pagination.pageSize = pageSize;
    },
  },
});
```

## 使用提示

1. **单一职责**: 每个 Store 只负责一个明确的功能领域
2. **类型安全**: 始终为状态定义 TypeScript 类型
3. **响应式**: 使用 `ref` 和 `computed` 创建响应式状态
4. **异步处理**: 在 Action 中处理异步操作，并管理加载状态
5. **持久化**: 需要持久化的状态使用 `@vben/preferences`
6. **模块化**: 按业务模块组织 Store 文件

## 常见问题

### Q: 如何在组件中使用 Store？
A: 在 `setup` 中调用 Store 函数：

```vue
<script setup lang="ts">
import { useAuthStore } from '#/store/auth';

const authStore = useAuthStore();
const { loginLoading } = storeToRefs(authStore);

async function handleLogin() {
  await authStore.login(credentials);
}
</script>
```

### Q: 如何重置 Store 状态？
A: 调用 `$reset()` 方法，或手动重置各个状态。

### Q: Store 之间循环依赖怎么办？
A: 避免循环依赖，如果必须，可以在 Action 中动态导入。

### Q: 如何调试 Store 状态？
A: 使用 Vue DevTools 的 Pinia 面板，或添加状态变更日志。

### Q: 何时应该使用 Store 而不是 Props/Emit？
A: 跨组件共享状态时使用 Store，父子组件通信使用 Props/Emit。