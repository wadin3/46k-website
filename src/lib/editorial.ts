import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import type { Root, Element, RootContent } from 'hast';
import { assetPath } from './paths';
import { featureTypography } from './editorial-feature';
// CMS media paths start at /images; preserve the configured Pages base.
function deploymentPaths(options?: { referenceList?: boolean }) {
  return (tree: Root) => {
    function visit(node: Root | RootContent) {
      if (node.type === 'element') {
        const element = node as Element;
        for (const key of ['src', 'href']) {
          const path = element.properties[key];
          if (typeof path === 'string') element.properties[key] = assetPath(path);
        }
        const { href } = element.properties;
        if (options?.referenceList && element.tagName === 'a' && typeof href === 'string' && /^https?:\/\//i.test(href)) {
          element.properties.target = '_blank';
          element.properties.rel = ['noopener', 'noreferrer'];
        }
      }
      if ('children' in node) node.children.forEach(visit);
    }
    visit(tree);
  };
}
const processors = {
  body: createMarkdownProcessor({ syntaxHighlight: false, rehypePlugins: [deploymentPaths] }),
  feature: createMarkdownProcessor({ syntaxHighlight: false, rehypePlugins: [deploymentPaths, featureTypography] }),
  references: createMarkdownProcessor({ syntaxHighlight: false, rehypePlugins: [[deploymentPaths, { referenceList: true }]] }),
};

export async function editorialMarkdown(markdown: string, style: keyof typeof processors = 'body') {
  return (await (await processors[style]).render(markdown)).code;
}
