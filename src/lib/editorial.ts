import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import type { Root, Element, RootContent } from 'hast';
import { assetPath } from './paths';
import { featureTypography } from './editorial-feature';
// CMS media paths start at /images; preserve the configured Pages base.
function deploymentPaths() {
  return (tree: Root) => {
    function visit(node: Root | RootContent) {
      if (node.type === 'element') {
        const element = node as Element;
        for (const key of ['src', 'href']) {
          const path = element.properties[key];
          if (typeof path === 'string') element.properties[key] = assetPath(path);
        }
      }
      if ('children' in node) node.children.forEach(visit);
    }
    visit(tree);
  };
}
const processor = createMarkdownProcessor({ syntaxHighlight: false, rehypePlugins: [deploymentPaths] });

const featureProcessor = createMarkdownProcessor({ syntaxHighlight: false, rehypePlugins: [deploymentPaths, featureTypography] });
export async function editorialMarkdown(markdown: string, feature = false) {
  return (await (await (feature ? featureProcessor : processor)).render(markdown)).code;
}
