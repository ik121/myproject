import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    hmr: true, //热更新
    port: 3000, //端口号
    proxy: {
      '/m1': {
        //后端接口前缀
        target: 'http://127.0.0.1:4523/ ', //目标代理接口地址
        secure: false,
        changeOrigin: true, //开启代理，在本地创建一个虚拟服务器
        pathRewrite: {
          '^/m1': '/m1',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
