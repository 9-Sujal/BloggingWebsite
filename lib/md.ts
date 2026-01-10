import MarkdownIt from "markdown-it";
import hljs from "highlight.js";

const md = new MarkdownIt({
  html: true, // allow HTML inside markdown
  linkify: true, // auto-detect links
  typographer: true, // smart quotes, dashes, etc.

  highlight: (code:string, lang:string):string => {
    // Check if provided language is supported, else use plaintext
    const validLang = lang && hljs.getLanguage(lang) ? lang : "plaintext";

    try {
      const highlighted = hljs.highlight(code, { language: validLang }).value;
      return `<pre class="hljs"><code>${highlighted}</code></pre>`;
    } catch (error) {
      console.error("Highlighting error:", error);
      return `<pre class="hljs"><code>${md.utils.escapeHtml(code)}</code></pre>`;
    }
  },
});

export default md;
