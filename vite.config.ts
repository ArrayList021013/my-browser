import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import alias from '@rollup/plugin-alias';

export default defineConfig({
    plugins: [
        react(),
        alias({
            entries: [
                {find: '~', replacement: resolve(__dirname, 'src')}
            ]
        })
    ],
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
    }
});