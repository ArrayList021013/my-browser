import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [react()],
    // root: './',
    base: './', //基础路径
    build: {
        outDir: 'dist',         //输出目录
        assetsDir: 'assets',    //静态资源目录
        rollupOptions: {
            input: {
                //这里的 index.html 是自己写的 index.html 而不是 dist 文件夹里生成的
                main: resolve(__dirname, 'index.html'),
            },
            output: {
                entryFileNames: 'assets/[name]-[hash].js',
                chunkFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash].[ext]'
            },
            external: ['electron']
        }
    },
    resolve: {
        alias: {
            //设置 @ 符号以便全局引入文件
            '@': resolve(__dirname, 'src')
        }
    }
});