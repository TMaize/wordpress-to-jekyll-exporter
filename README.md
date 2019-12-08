# wordpress-to-jekyll-exporter

本项目用于将 wordpress 站点导出为 jekyll 站点（post+img，没有主题）

```sh
npm i
node main.js
```

配置文件见：`pkg/config.js`

1. 修正部分 md 不支持的格式

2. 支持自动修正图片路径引用

3. main.js 自定义 Front Matter
