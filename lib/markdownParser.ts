// lib/markdownParser.ts
// Complete markdown parser with structure detection

export interface ParsedContent {
  blocks: ContentBlock[];
  plainText: string;
}

export interface ContentBlock {
  type: 'h1' | 'h2' | 'h3' | 'p' | 'ul' | 'ol' | 'blockquote' | 'image';
  content: string;
  rawMarkdown: string;
}

export const parseMarkdownContent = (markdown: string): ParsedContent => {
  if (!markdown) return { blocks: [], plainText: '' };

  const lines = markdown.split('\n');
  const blocks: ContentBlock[] = [];
  let plainText = '';
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines
    if (!trimmed) {
      i++;
      continue;
    }

    // H1: # Heading
    if (trimmed.startsWith('# ') && !trimmed.startsWith('# ')) {
      const content = trimmed.slice(2).trim();
      blocks.push({
        type: 'h1',
        content: processInlineMarkdown(content),
        rawMarkdown: line,
      });
      plainText += content + '\n';
      i++;
    }
    // H2: ## Heading
    else if (trimmed.startsWith('## ') && !trimmed.startsWith('### ')) {
      const content = trimmed.slice(3).trim();
      blocks.push({
        type: 'h2',
        content: processInlineMarkdown(content),
        rawMarkdown: line,
      });
      plainText += content + '\n';
      i++;
    }
    // H3: ### Heading
    else if (trimmed.startsWith('### ')) {
      const content = trimmed.slice(4).trim();
      blocks.push({
        type: 'h3',
        content: processInlineMarkdown(content),
        rawMarkdown: line,
      });
      plainText += content + '\n';
      i++;
    }
    // Blockquote: >
    else if (trimmed.startsWith('> ')) {
      const content = trimmed.slice(2).trim();
      blocks.push({
        type: 'blockquote',
        content: processInlineMarkdown(content),
        rawMarkdown: line,
      });
      plainText += content + '\n';
      i++;
    }
    // Image: ![alt](url)
    else if (trimmed.match(/^!\[.*?\]\(.*?\)$/)) {
      const match = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (match) {
        blocks.push({
          type: 'image',
          content: JSON.stringify({ alt: match[1], src: match[2] }),
          rawMarkdown: line,
        });
      }
      i++;
    }
    // Unordered list: - item
    else if (trimmed.startsWith('- ')) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        const itemText = lines[i].trim().slice(2).trim();
        listItems.push(processInlineMarkdown(itemText));
        i++;
      }
      blocks.push({
        type: 'ul',
        content: JSON.stringify(listItems),
        rawMarkdown: listItems.join('\n'),
      });
      plainText += listItems.join('\n') + '\n';
    }
    // Ordered list: 1. item
    else if (trimmed.match(/^\d+\.\s/)) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].trim().match(/^\d+\.\s/)) {
        const itemText = lines[i].trim().replace(/^\d+\.\s/, '');
        listItems.push(processInlineMarkdown(itemText));
        i++;
      }
      blocks.push({
        type: 'ol',
        content: JSON.stringify(listItems),
        rawMarkdown: listItems.join('\n'),
      });
      plainText += listItems.join('\n') + '\n';
    }
    // Paragraph
    else {
      blocks.push({
        type: 'p',
        content: processInlineMarkdown(trimmed),
        rawMarkdown: line,
      });
      plainText += trimmed + '\n';
      i++;
    }
  }

  return { blocks, plainText };
};

// Process inline markdown: **bold**, *italic*, ***bold-italic***
export const processInlineMarkdown = (text: string): string => {
  if (!text) return '';

  // Bold and italic: ***text*** or **_text_**
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  text = text.replace(/\*\*_(.+?)_\*\*/g, '<strong><em>$1</em></strong>');
  text = text.replace(/_\*\*(.+?)\*\*_/g, '<strong><em>$1</em></strong>');

  // Bold: **text**
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Italic: *text* or _text_
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
  text = text.replace(/_(.+?)_/g, '<em>$1</em>');

  // Links: [text](url)
  text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank">$1</a>');

  return text;
};

// Reverse: Convert structured content back to markdown for editing
export const contentToMarkdown = (blocks: ContentBlock[]): string => {
  return blocks
    .map((block) => {
      switch (block.type) {
        case 'h1':
          return `# ${stripHtmlTags(block.content)}`;
        case 'h2':
          return `## ${stripHtmlTags(block.content)}`;
        case 'h3':
          return `### ${stripHtmlTags(block.content)}`;
        case 'p':
          return stripHtmlTags(block.content);
        case 'blockquote':
          return `> ${stripHtmlTags(block.content)}`;
        case 'ul': {
          try {
            const items = JSON.parse(block.content) as string[];
            return items.map((item) => `- ${stripHtmlTags(item)}`).join('\n');
          } catch {
            return '';
          }
        }
        case 'ol': {
          try {
            const items = JSON.parse(block.content) as string[];
            return items.map((item, idx) => `${idx + 1}. ${stripHtmlTags(item)}`).join('\n');
          } catch {
            return '';
          }
        }
        case 'image': {
          try {
            const { alt, src } = JSON.parse(block.content);
            return `![${alt}](${src})`;
          } catch {
            return '';
          }
        }
        default:
          return '';
      }
    })
    .join('\n\n');
};

const stripHtmlTags = (html: string): string => {
  if (!html) return '';
  return html
    .replace(/<strong>/g, '**')
    .replace(/<\/strong>/g, '**')
    .replace(/<em>/g, '*')
    .replace(/<\/em>/g, '*')
    .replace(/<a href="(.+?)".*?>(.+?)<\/a>/g, '[$2]($1)')
    .replace(/<[^>]*>/g, '');
};

// Parse content from DB - handle both JSON and plain text
export const parseStoredContent = (content: string): ContentBlock[] => {
  if (!content) return [];

  try {
    // Try parsing as JSON blocks
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed) && parsed.length > 0 && parsed[0]?.type) {
      return parsed as ContentBlock[];
    }
  } catch {
    // If not JSON, treat as plain markdown and parse
    const { blocks } = parseMarkdownContent(content);
    return blocks;
  }
  
  return [];
};