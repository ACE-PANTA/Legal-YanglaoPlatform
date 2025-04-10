/// <reference types="vite/client" />
declare module '*.vue' {
    import type { ComponentOptions } from 'vue'
    const componentOptions: ComponentOptions<{}, {}, any>
    export default componentOptions
}