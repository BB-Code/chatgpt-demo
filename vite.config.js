import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [],
    define: {
        'process.env': {
            "OPENAI_API_KEY": ""
        }
    }
})