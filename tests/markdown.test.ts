import { describe, expect, it } from "vitest";
import {
  extractToc,
  markdownToHtml,
  parseFrontmatter,
  readingTime,
} from "@/lib/markdown";

describe("markdown pipeline", () => {
  it("parses frontmatter", () => {
    const { frontmatter, body } = parseFrontmatter(
      `---\ntitle: Hello\ntags: [a, b]\n---\nBody text`
    );
    expect(frontmatter.title).toBe("Hello");
    expect(frontmatter.tags).toEqual(["a", "b"]);
    expect(body).toBe("Body text");
  });

  it("renders headings with ids and builds a toc", () => {
    const md = "## First Section\n\ntext\n\n### Sub Section\n\nmore";
    const html = markdownToHtml(md);
    expect(html).toContain('<h2 id="first-section">');
    expect(html).toContain('<h3 id="sub-section">');
    expect(extractToc(md)).toEqual([
      { id: "first-section", text: "First Section", level: 2 },
      { id: "sub-section", text: "Sub Section", level: 3 },
    ]);
  });

  it("escapes HTML — script injection is neutralized", () => {
    const html = markdownToHtml('<script>alert("xss")</script>');
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });

  it("escapes HTML inside code fences", () => {
    const html = markdownToHtml("```js\nconst a = '<b>';\n```");
    expect(html).toContain("language-js");
    expect(html).not.toContain("<b>");
  });

  it("renders lists, quotes, links, and inline code", () => {
    const html = markdownToHtml(
      "- item one\n- item two\n\n> quoted\n\n`code` and [link](https://example.com)"
    );
    expect(html).toContain("<ul><li>item one</li><li>item two</li></ul>");
    expect(html).toContain("<blockquote>");
    expect(html).toContain("<code>code</code>");
    expect(html).toContain('rel="noopener noreferrer"');
  });

  it("computes reading time", () => {
    expect(readingTime("word ".repeat(440))).toBe(2);
    expect(readingTime("short")).toBe(1);
  });
});
