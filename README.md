# yon
Yonyou Package Manager



#### 概述

`yon`为`node`在公司内部的镜像仓库配套的命令行工具，根据镜像代理，嵌套`npm`，关于镜像和命令行工具说明如下：

- 镜像
  - 使用`Nexus Repository OSS`搭建`npm`镜像
  - 镜像源使用淘宝`cnpm`镜像库
  - 镜像无需同步，下载即缓存，实现一次下载，全员共享
- 命令行
  - 实现自动根据IP选择下载源
    - 内网自动使用公司镜像
    - 外网自动使用淘宝镜像
    - 不对`npm`的镜像源入侵

总体实现：公司内通过使用`yon`,实现快速下载包，减少下载等待时间

#### 安装

```
npm install yon -g
```



#### 使用

```
# 安装(install相关命令均支持)
yon install xxx --option

# 帮助
yon 或 yon -h 或 yon --help

# 版本
yon -v 或 yon --version
```

- 其他命令暂不准备实现



#### 开发说明

**夭折的v0.0.1版本** *pub分支*

- 前期对安装命令行工具工作量评估不足，导致入源码坑太深
- 依赖`npminstall`完成,内网`Nexus Repository OSS`搭建的镜像，存在部分下载`404`的问题(`latest`,`>=v1 <v2`)，此部分原因为`npminstall`工具对下载机制做了调整，镜像在`npm`环境测试没有问题

**v0.0.2版本**

上一版当天无法修复的情况下，无法短时间从`npm`等工具源码中构建项目。遂修改策略，短时间撸出的一个试用版本：在`npm`上套壳，确保:能使用内网镜像，能自动切换镜像，不侵入`npm

**v0.0.3-0.0.4**

* 版本调整，仓库迁移测试

**v0.05**

* 增加显示镜像地址
* 增加不支持命令的error提示