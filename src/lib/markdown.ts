// Minimal markdown model for the magazine: H1 = section, H2 = subhead, paragraphs,
// bullet lists, rules. Inline: links, **bold**, _italic_. HTML comments are dropped.

export type Block =
  | { kind: 'heading'; level: number; text: string; id: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'rule' };

export type Section = { title: string; id: string; blocks: Block[] };

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[’'“”"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function parseMarkdown(source: string): Block[] {
  const text = source.replace(/<!--[\s\S]*?-->/g, '');
  const blocks: Block[] = [];
  let list: string[] | null = null;
  const flush = () => { if (list) { blocks.push({ kind: 'list', items: list }); list = null; } };
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line) { flush(); continue; }
    if (line === '* * *' || line === '---') { flush(); blocks.push({ kind: 'rule' }); continue; }
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) { flush(); blocks.push({ kind: 'heading', level: h[1].length, text: h[2].trim(), id: slugify(h[2]) }); continue; }
    const li = line.match(/^[-*]\s+(.*)$/);
    if (li) { (list ??= []).push(li[1]); continue; }
    flush();
    blocks.push({ kind: 'paragraph', text: line });
  }
  flush();
  return blocks;
}

export function sectionize(blocks: Block[]): Section[] {
  const sections: Section[] = [];
  let current: Section | null = null;
  for (const block of blocks) {
    if (block.kind === 'heading' && block.level === 1) {
      current = { title: block.text, id: block.id, blocks: [] };
      sections.push(current);
    } else if (current) {
      current.blocks.push(block);
    }
  }
  return sections;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Inline markdown to HTML. Links open in a new tab; emphasis uses the print
// convention of underscores for italics (titles of publications).
export function inline(text: string): string {
  let out = escapeHtml(text);
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label, href) =>
    `<a href="${href}" target="_blank" rel="noopener">${label}</a>`);
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/(^|[^A-Za-z0-9])_([^_]+)_(?![A-Za-z0-9])/g, '$1<em>$2</em>');
  return out;
}

export function plain(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/(^|[^A-Za-z0-9])_([^_]+)_(?![A-Za-z0-9])/g, '$1$2');
}
