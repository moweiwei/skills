# Vben Utils 技能

## 概述

Vben Admin 框架中工具函数的使用指南。当需要在 Vben Admin 项目中使用工具函数时使用此技能，包括数据处理、格式转换、类型判断、文件操作、树形结构处理等场景。适用于需要通用工具函数的各种业务模块。

## 适用场景

- 数据处理和转换
- 日期时间格式化
- 金额单位转换
- 树形结构处理
- 文件上传下载
- 类型判断和验证
- URL 参数处理

## 核心规范

### 1. 工具函数分类

#### 数据处理
- `cloneDeep`: 深拷贝对象
- `isEmpty`: 判断是否为空
- `isObject`: 判断是否为对象
- `isString`: 判断是否为字符串
- `isNumber`: 判断是否为数字
- `isFunction`: 判断是否为函数
- `isEqual`: 深度比较两个值是否相等

#### 日期时间
- `formatDateTime`: 格式化日期时间
- `formatDate`: 格式化日期
- `formatPast`: 格式化相对时间（如"3天前"）
- `addTime`: 添加时间
- `betweenDay`: 计算两个日期之间的天数
- `beginOfDay`: 获取某天的开始时间
- `endOfDay`: 获取某天的结束时间
- `isSameDay`: 判断是否为同一天

#### 金额处理
- `fenToYuan`: 分转元
- `yuanToFen`: 元转分
- `fenToYuanFormat`: 分转元并格式化
- `floatToFixed2`: 浮点数保留两位小数
- `erpPriceMultiply`: ERP 价格计算
- `erpPriceInputFormatter`: ERP 价格输入格式化

#### 树形结构
- `handleTree`: 将列表转换为树形结构
- `treeToString`: 树形结构转字符串
- `getTreePath`: 获取树节点路径

#### 文件操作
- `downloadFileFromBlobPart`: 从 Blob 下载文件
- `downloadFileFromImageUrl`: 从图片 URL 下载文件
- `downloadImageByCanvas`: 通过 Canvas 下载图片
- `dataURLtoBlob`: DataURL 转 Blob
- `base64ToFile`: Base64 转文件
- `formatFileSize`: 格式化文件大小
- `getFileIcon`: 获取文件图标
- `getFileNameFromUrl`: 从 URL 获取文件名
- `getFileTypeClass`: 获取文件类型 CSS 类
- `generateAcceptedFileTypes`: 生成可接受的文件类型

#### URL 处理
- `getUrlValue`: 获取 URL 参数值
- `getUrlNumberValue`: 获取 URL 数字参数值
- `openWindow`: 打开新窗口

#### 其他工具
- `jsonParse`: JSON 解析（带错误处理）
- `buildShortUUID`: 生成短 UUID
- `groupBy`: 按属性分组
- `get`: 安全获取对象属性
- `getNestedValue`: 获取嵌套属性值

### 2. 常用工具函数示例

#### 数据处理

```typescript
import { cloneDeep, isEmpty, isObject, isString } from '@vben/utils';

// 深拷贝
const original = { a: 1, b: { c: 2 } };
const cloned = cloneDeep(original);

// 判断是否为空
isEmpty(null); // true
isEmpty([]); // true
isEmpty({}); // true
isEmpty(''); // true

// 类型判断
isObject({}); // true
isString('hello'); // true
```

#### 日期时间格式化

```typescript
import { formatDateTime, formatDate, formatPast } from '@vben/utils';

const date = new Date('2024-01-24T10:30:00');

// 格式化日期时间
formatDateTime(date); // "2024-01-24 10:30:00"

// 格式化日期
formatDate(date); // "2024-01-24"

// 相对时间
formatPast(date); // "刚刚" 或 "3天前"
```

#### 金额处理

```typescript
import { fenToYuan, yuanToFen, floatToFixed2 } from '@vben/utils';

// 分转元
fenToYuan(100); // 1.00

// 元转分
yuanToFen(1.5); // 150

// 保留两位小数
floatToFixed2(3.14159); // "3.14"

// ERP 价格计算
import { erpPriceMultiply } from '@vben/utils';
erpPriceMultiply(100, 1.5); // 150
```

#### 树形结构处理

```typescript
import { handleTree } from '@vben/utils';

const list = [
  { id: 1, name: '部门1', parentId: 0 },
  { id: 2, name: '部门2', parentId: 0 },
  { id: 3, name: '子部门1', parentId: 1 },
  { id: 4, name: '子部门2', parentId: 1 },
];

const tree = handleTree(list, 'id', 'parentId');
// 结果：
// [
//   {
//     id: 1,
//     name: '部门1',
//     parentId: 0,
//     children: [
//       { id: 3, name: '子部门1', parentId: 1 },
//       { id: 4, name: '子部门2', parentId: 1 },
//     ]
//   },
//   { id: 2, name: '部门2', parentId: 0 }
// ]
```

#### 文件下载

```typescript
import { downloadFileFromBlobPart } from '@vben/utils';

// 下载 Excel 文件
async function handleExport() {
  const data = await exportUser(params);
  downloadFileFromBlobPart({ 
    fileName: '用户列表.xlsx', 
    source: data 
  });
}

// 下载图片
import { downloadFileFromImageUrl } from '@vben/utils';
downloadFileFromImageUrl(imageUrl, '图片名称.jpg');
```

### 3. 项目自定义工具函数

项目自定义的工具函数位于 `apps/web-ele/src/utils/`：

```typescript
// apps/web-ele/src/utils/index.ts
import type { Recordable } from '@vben/types';

export * from './rangePickerProps';
export * from './routerHelper';

type Fn<T = any> = (item: T, index: number, array: Array<T>) => boolean;

/**
 * 查找数组对象的某个下标
 */
export const findIndex = <T = Recordable<any>>(
  ary: Array<T>,
  fn: Fn<T>,
): number => {
  if (ary.findIndex) {
    return ary.findIndex((item, index, array) => fn(item, index, array));
  }
  let index = -1;
  ary.some((item: T, i: number, ary: Array<T>) => {
    const ret: boolean = fn(item, i, ary);
    if (ret) {
      index = i;
      return true;
    }
    return false;
  });
  return index;
};
```

### 4. 日期范围选择器工具

```typescript
// apps/web-ele/src/utils/rangePickerProps.ts
import type { RangePickerProps } from 'ant-design-vue';

import dayjs from 'dayjs';

/**
 * 获取日期范围选择器的默认属性
 */
export function getRangePickerDefaultProps(): RangePickerProps {
  return {
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
    showTime: { format: 'HH:mm:ss' },
    format: 'YYYY-MM-DD HH:mm:ss',
  };
}

/**
 * 获取快捷日期范围
 */
export function getShortcutRangePickerProps(): RangePickerProps {
  return {
    ...getRangePickerDefaultProps(),
    shortcuts: [
      {
        text: '今天',
        value: () => [dayjs().startOf('day'), dayjs().endOf('day')],
      },
      {
        text: '昨天',
        value: () => [
          dayjs().subtract(1, 'day').startOf('day'),
          dayjs().subtract(1, 'day').endOf('day'),
        ],
      },
      {
        text: '最近7天',
        value: () => [dayjs().subtract(7, 'day'), dayjs()],
      },
      {
        text: '最近30天',
        value: () => [dayjs().subtract(30, 'day'), dayjs()],
      },
      {
        text: '本月',
        value: () => [dayjs().startOf('month'), dayjs().endOf('month')],
      },
      {
        text: '上月',
        value: () => [
          dayjs().subtract(1, 'month').startOf('month'),
          dayjs().subtract(1, 'month').endOf('month'),
        ],
      },
    ],
  };
}
```

### 5. 路由工具

```typescript
// apps/web-ele/src/utils/routerHelper.ts
import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

/**
 * 获取路由标题
 */
export function getRouteTitle(route: RouteLocationNormalized): string {
  const { meta } = route;
  return meta?.title ? $t(meta.title as string) : '';
}

/**
 * 判断是否为外部链接
 */
export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path);
}
```

## 完整示例

### 用户管理页面工具函数使用

```vue
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';

import { 
  downloadFileFromBlobPart, 
  isEmpty, 
  formatDateTime,
  handleTree,
  fenToYuan,
} from '@vben/utils';

import type { User } from '#/api/system/user';
import { getUserPage, exportUser } from '#/api/system/user';

// 搜索表单
const searchForm = reactive({
  username: '',
  status: undefined as number | undefined,
  createTime: [] as string[],
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
  // 检查搜索条件是否为空
  if (isEmpty(searchForm.username) && isEmpty(searchForm.status)) {
    // 可以添加提示或特殊处理
  }
  
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

// 导出用户
async function handleExport() {
  try {
    const data = await exportUser(searchForm);
    downloadFileFromBlobPart({ 
      fileName: `用户列表_${formatDateTime(new Date())}.xlsx`, 
      source: data 
    });
    ElMessage.success('导出成功');
  } catch {
    ElMessage.error('导出失败');
  }
}

// 格式化显示金额
function formatBalance(balance: number): string {
  return fenToYuan(balance);
}

// 处理部门树
async function handleDeptTree() {
  const deptList = await getDeptList();
  const deptTree = handleTree(deptList, 'id', 'parentId');
  return deptTree;
}

// 初始化
onMounted(() => {
  fetchUserList();
});
</script>

<template>
  <div>
    <!-- 使用工具函数的示例 -->
    <div v-if="!isEmpty(userList)">
      <table>
        <tr v-for="user in userList" :key="user.id">
          <td>{{ user.username }}</td>
          <td>{{ formatDateTime(user.createTime) }}</td>
          <td>{{ formatBalance(user.balance || 0) }}</td>
        </tr>
      </table>
    </div>
    
    <div v-else>
      暂无数据
    </div>
  </div>
</template>
```

### 文件上传组件工具函数使用

```vue
<script setup lang="ts">
import { 
  formatFileSize, 
  getFileIcon, 
  getFileNameFromUrl,
  dataURLtoBlob,
  isString,
} from '@vben/utils';

// 文件处理
function handleFileUpload(file: File) {
  // 检查文件大小
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    throw new Error(`文件大小不能超过 ${formatFileSize(maxSize)}`);
  }
  
  // 获取文件图标
  const icon = getFileIcon(file.name);
  
  // 获取文件名（从 URL 或文件对象）
  const fileName = isString(file) ? getFileNameFromUrl(file as string) : file.name;
  
  return {
    name: fileName,
    size: formatFileSize(file.size),
    icon,
  };
}

// 图片处理
function handleImageToBlob(dataUrl: string) {
  const blob = dataURLtoBlob(dataUrl);
  return blob;
}
</script>
```

## 使用提示

1. **按需导入**: 只导入需要的工具函数，减少打包体积
2. **错误处理**: 工具函数通常不处理业务错误，需要在调用处处理
3. **类型安全**: 使用 TypeScript 类型，确保参数和返回值类型正确
4. **性能考虑**: 大数据量时注意深拷贝和树形处理的性能
5. **组合使用**: 多个工具函数可以组合使用完成复杂任务

## 常见问题

### Q: `isEmpty` 函数判断哪些值为空？
A: `null`, `undefined`, `''`, `[]`, `{}` 都被认为是空值。

### Q: 如何自定义工具函数？
A: 在 `apps/web-ele/src/utils/` 目录下添加新的工具函数文件。

### Q: 日期格式化时区问题如何处理？
A: `formatDateTime` 默认使用本地时区，如果需要 UTC 时间，可以传递 `{ utc: true }` 选项。

### Q: 树形结构处理时循环引用怎么办？
A: `handleTree` 函数会检测循环引用并跳过，避免无限递归。

### Q: 文件下载时文件名乱码怎么办？
A: `downloadFileFromBlobPart` 会自动处理文件名编码，确保正确显示中文。