import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        work: resolve(__dirname, 'pages/work.html'),
        projects: resolve(__dirname, 'pages/projects.html'),
        publications: resolve(__dirname, 'pages/publications.html'),
        writing: resolve(__dirname, 'pages/writing.html'),
        collections: resolve(__dirname, 'pages/collections.html'),
        blog_external: resolve(__dirname, 'pages/blog/external-context-layer-for-ai-agents.html'),
        blog_voice: resolve(__dirname, 'pages/blog/the-shape-of-a-voice-controlled-agent.html'),
        blog_about: resolve(__dirname, 'pages/blog/about-varunkhatri.html'),
        blog_belief: resolve(__dirname, 'pages/blog/on-belief-in-god.html'),
        blog_artifact: resolve(__dirname, 'pages/blog/why-use-an-artifact-manager.html'),
      }
    }
  }
})
