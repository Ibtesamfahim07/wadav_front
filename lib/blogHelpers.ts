// lib/blogHelpers.ts
// Utility functions for blog operations

import { ContentBlock, parseMarkdownContent, contentToMarkdown, parseStoredContent } from './markdownParser';

/**
 * Convert content to appropriate format based on source
 * Ensures consistency between admin input and database storage
 */
export const normalizeContent = (
  content: string,
  sourceFormat: 'markdown' | 'auto' = 'auto'
): string => {
  if (!content) return '';

  if (sourceFormat === 'auto') {
    // Auto-detect format
    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed[0]?.type) {
        return content; // Already JSON blocks
      }
    } catch {
      // Not JSON, treat as markdown
    }
    // Treat as markdown - parse and convert to JSON
    const { blocks } = parseMarkdownContent(content);
    return JSON.stringify(blocks);
  }

  if (sourceFormat === 'markdown') {
    const { blocks } = parseMarkdownContent(content);
    return JSON.stringify(blocks);
  }

  return content;
};

/**
 * Extract plain text from content for preview/excerpt
 */
export const extractPlainText = (content: string, maxLength: number = 200): string => {
  let plainText = '';

  try {
    const blocks = parseStoredContent(content);
    for (const block of blocks) {
      if (block.type === 'p' || block.type === 'h1' || block.type === 'h2' || block.type === 'h3') {
        const text = stripHtmlTags(block.content);
        plainText += text + ' ';
      }
      if (plainText.length >= maxLength) break;
    }
  } catch {
    plainText = stripHtmlTags(content);
  }

  return plainText.substring(0, maxLength).trim() + (plainText.length > maxLength ? '...' : '');
};

/**
 * Remove HTML tags from string
 */
export const stripHtmlTags = (html: string): string => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '');
};

/**
 * Generate table of contents from content blocks
 */
export interface TableOfContentsItem {
  id: string;
  text: string;
  level: 1 | 2 | 3;
}

export const generateTableOfContents = (content: string): TableOfContentsItem[] => {
  const toc: TableOfContentsItem[] = [];

  try {
    const blocks = parseStoredContent(content);
    let headingCount = 0;

    blocks.forEach((block) => {
      if (['h1', 'h2', 'h3'].includes(block.type)) {
        headingCount++;
        const text = stripHtmlTags(block.content);
        const id = `heading-${headingCount}`;
        const level = parseInt(block.type.charAt(1)) as 1 | 2 | 3;

        toc.push({ id, text, level });
      }
    });
  } catch (error) {
    console.error('Error generating TOC:', error);
  }

  return toc;
};

/**
 * Calculate reading time in minutes
 */
export const calculateReadingTime = (content: string): number => {
  const plainText = extractPlainText(content, 999999);
  const wordCount = plainText.split(/\s+/).length;
  const readingTimeMinutes = Math.ceil(wordCount / 200); // Average 200 words per minute
  return Math.max(1, readingTimeMinutes);
};

/**
 * Validate markdown syntax
 */
export const validateMarkdownSyntax = (markdown: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!markdown?.trim()) {
    errors.push('Content cannot be empty');
    return { valid: false, errors };
  }

  try {
    const { blocks } = parseMarkdownContent(markdown);
    if (blocks.length === 0) {
      errors.push('No valid content blocks found');
    }
  } catch (error) {
    errors.push(`Parse error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Format content for sharing (JSON and markdown)
 */
export const getContentInFormat = (
  content: string,
  format: 'json' | 'markdown'
): string => {
  try {
    const blocks = parseStoredContent(content);

    if (format === 'markdown') {
      return contentToMarkdown(blocks);
    } else {
      return JSON.stringify(blocks, null, 2);
    }
  } catch (error) {
    console.error('Error formatting content:', error);
    return content;
  }
};

/**
 * Compare two content versions
 */
export const compareContent = (
  oldContent: string,
  newContent: string
): { changed: boolean; summary: string } => {
  try {
    const oldBlocks = parseStoredContent(oldContent);
    const newBlocks = parseStoredContent(newContent);

    const changed = JSON.stringify(oldBlocks) !== JSON.stringify(newBlocks);
    const summary = `${oldBlocks.length} → ${newBlocks.length} blocks`;

    return { changed, summary };
  } catch (error) {
    return { changed: true, summary: 'Unable to compare' };
  }
};

/**
 * Sanitize content to remove potentially harmful scripts
 */
export const sanitizeContent = (content: string): string => {
  if (!content) return '';

  // Remove script tags
  let sanitized = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Remove event handlers
  sanitized = sanitized.replace(/on\w+\s*=\s*"[^"]*"/gi, '');
  sanitized = sanitized.replace(/on\w+\s*=\s*'[^']*'/gi, '');

  return sanitized;
};

/**
 * Create a backup of content
 */
export interface ContentBackup {
  id: string;
  content: string;
  format: 'json' | 'markdown';
  createdAt: Date;
  title?: string;
}

export const createContentBackup = (
  content: string,
  title?: string
): ContentBackup => {
  try {
    parseStoredContent(content);
    return {
      id: `backup-${Date.now()}`,
      content,
      format: content.startsWith('[{') ? 'json' : 'markdown',
      createdAt: new Date(),
      title,
    };
  } catch {
    throw new Error('Invalid content format');
  }
};

/**
 * Migrate content from old format to new format
 */
export const migrateContent = (oldContent: string): string => {
  try {
    const blocks = parseStoredContent(oldContent);
    return JSON.stringify(blocks);
  } catch (error) {
    console.error('Migration error:', error);
    return oldContent;
  }
};