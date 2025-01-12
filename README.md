# OpenScratch Note

一个用于安全分享私密笔记的开源应用程序。

## 关于本项目

OpenScratch Note 是一个基于 [Enclosed](https://github.com/CorentinTh/enclosed) 项目修改的开源应用。本项目遵循 Apache 2.0 许可证。

### 原始项目致谢

本项目基于 [Enclosed](https://github.com/CorentinTh/enclosed) (作者：[Corentin Thomasset](https://corentin.tech)) 进行修改。感谢原作者的杰出工作。

## 功能特点

- **端到端加密**: 使用 AES-GCM 256位密钥进行加密，密钥通过 PBKDF2 派生
- **文件附件**: 支持安全地分享文件
- **零知识存储**: 服务器对笔记内容完全无知
- **安全选项**: 支持设置密码、过期时间和阅后即焚
- **简约界面**: 直观的用户界面
- **多语言支持**: 支持多种语言
- **认证系统**: 可选的邮箱/密码认证
- **深色模式**: 支持深色主题
- **响应式设计**: 适配所有设备
- **开源**: 基于 Apache 2.0 许可证
- **可自托管**: 支持私有部署
- **命令行工具**: 支持通过终端创建笔记

## 技术栈

本项目使用以下开源技术：

### 前端
- **[SolidJS](https://www.solidjs.com)**
- **[Shadcn Solid](https://shadcn-solid.com/)**
- **[UnoCSS](https://unocss.dev/)**
- **[Tabler Icons](https://tablericons.com/)**

### 后端
- **[HonoJS](https://hono.dev/)**
- **[Unstorage](https://unstorage.unjs.io/)**
- **[Zod](https://github.com/colinhacks/zod)**

## 部署说明

### Docker 快速启动

```bash
docker run -d --name openscratch-note --restart unless-stopped -p 8787:8787 your-username/openscratch-note
```

更多部署和配置信息请参考文档。

## 开源协议

本项目基于 Apache 2.0 许可证开源。

## 项目结构

本项目使用 pnpm 工作空间管理：

- **packages/app-client**: 基于 SolidJS 的前端应用
- **packages/app-server**: 基于 HonoJS 的后端应用
- **packages/deploy-cloudflare**: Cloudflare Pages 部署配置
- **packages/lib**: 核心功能库
- **packages/cli**: 命令行工具

## 贡献指南

欢迎提交 Issue 和 Pull Request！

## 联系方式

如有问题或反馈，请使用 GitHub Issues。
