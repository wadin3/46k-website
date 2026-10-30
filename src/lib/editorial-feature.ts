import type { Root, Element, ElementContent } from 'hast';

const el = (tagName: string, properties: Element['properties'] = {}, children: ElementContent[] = []): Element => ({type: 'element', tagName, properties, children});
const txt = (value: string): ElementContent => ({type: 'text', value});
const content = (node: any): string => node.type === 'text' ? node.value : (node.children || []).map(content).join('');
const cls = (node: Element, value: string) => { node.properties.className = [value]; };

// Conceptual pitch sketches, not measurements or player assessment results.
function sketch(step: number): Element {
  const path = (d: string, className = 'signal') => el('path', {d, className: [className]});
  const dot = (cx: number, cy: number, signal = false) => el('circle', {cx, cy, r: signal ? 4 : 3, className: [signal ? 'signal-point' : 'pitch-point']});
  const marks: Record<number, Element[]> = {
    1: [path('M65 90 L150 28 A100 100 0 0 1 192 85 Z', 'scan-field'), path('M93 58 A46 46 0 0 1 115 90'), dot(65,90,true),dot(150,43),dot(183,76),dot(45,42)],
    2: [path('M50 90 L105 42 L180 80 Z'),path('M105 42 L195 30','ghost-route'),dot(50,90,true),dot(105,42,true),dot(180,80,true),dot(195,30),dot(135,95)],
    3: [path('M50 92 Q100 90 138 55 T195 32','future-route'),path('M182 30 L195 32 L189 45'),dot(50,92,true),dot(118,70),el('circle',{cx:195,cy:32,r:7,className:['prediction']})],
    4: [path('M55 90 L100 35 M55 90 L175 60 M55 90 L190 100'),dot(55,90,true),dot(100,35,true),dot(175,60,true),dot(190,100,true)],
    5: [path('M55 90 L100 35 M55 90 L190 100','ghost-route'),path('M55 90 L175 60'),path('M163 55 L175 60 L168 71'),dot(55,90,true),dot(100,35),dot(175,60,true),dot(190,100)],
    6: [path('M50 92 L183 37'),path('M170 36 L183 37 L176 49'),dot(50,92,true),dot(193,32,true),el('circle',{cx:130,cy:59,r:3,className:['ball']})],
  };
  return el('svg', {viewBox:'0 0 240 132', className:['cognitive-sketch'], 'aria-hidden':'true', focusable:'false'},[
    el('rect',{x:20,y:18,width:200,height:96,className:['pitch-line']}),path('M120 18 V114 M20 48 H37 V84 H20 M220 48 H203 V84 H220','pitch-line'),el('circle',{cx:120,cy:66,r:17,className:['pitch-line']}),...(marks[step] || [])
  ]);
}

export function featureTypography() {
  return (tree: Root) => {
    function visit(node: any) {
      if (node.type !== 'element' && node.type !== 'root') return;
      if (node.tagName === 'ol' && node.children.some((li: any) => li.tagName === 'li' && li.children.some((c: any) => c.tagName === 'h3'))) {
        cls(node, 'cognitive-parts'); node.properties.role = 'list';
        let step = Number(node.properties.start || 1);
        for (const li of node.children.filter((c: any) => c.tagName === 'li')) {
          cls(li, 'cognitive-part');
          const heading = li.children.find((c: any) => c.tagName === 'h3');
          const paragraphs = li.children.filter((c: any) => c.tagName === 'p');
          paragraphs.forEach((p: Element,i: number) => cls(p, i === 0 ? 'cognitive-question' : i === paragraphs.length - 1 ? 'cognitive-outcome' : 'cognitive-body'));
          li.children = [el('div',{className:['cognitive-heading']},[el('span',{className:['cognitive-number'],'aria-hidden':'true'},[txt(String(step).padStart(2,'0'))]),heading]),sketch(step),...paragraphs];
          step++;
        }
      }
      if (node.tagName === 'p') {
        const text = content(node);
        if (/^(Men vad är det egentligen|But what is it|Kognitionen är därmed|Cognition is therefore)/.test(text)) cls(node,'editorial-question');
        if (/^(Kan vi gå ännu djupare\?|Can we go even deeper\?)/.test(text)) cls(node,'editorial-turn');
        if (/^46K [–—-] Decoding/.test(text)) cls(node,'editorial-signoff');
        const terms = /\b(arbetsminne|inhibition|kognitiv flexibilitet|kognitiva förmågor|Vår hypotes|working memory|cognitive flexibility|cognitive abilities|Our hypothesis)\b/gi;
        let count = 0;
        node.children = node.children.flatMap((child: ElementContent) => {
          if (child.type !== 'text') return [child];
          const parts: ElementContent[] = []; let offset = 0;
          for (const match of child.value.matchAll(terms)) {
            if (count >= 2) break;
            parts.push(txt(child.value.slice(offset,match.index)),el('strong',{},[txt(match[0])]));
            offset = match.index! + match[0].length; count++;
          }
          parts.push(txt(child.value.slice(offset))); return parts;
        });
      }
      node.children?.forEach(visit);
    }
    visit(tree);
  };
}
