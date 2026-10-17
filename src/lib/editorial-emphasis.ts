// Curated source phrases only: formatting must not rewrite or invent claims.
const rules: { phrase: string; kind: 'strong' | 'em' }[] = [
  { phrase: 'Sverige ska vinna VM-guld i fotboll.', kind: 'strong' },
  { phrase: 'Vår kompetens finns någon helt annanstans - inom psykologin.', kind: 'em' },
  { phrase: 'Spelintelligens.', kind: 'strong' },
  { phrase: 'Inte för att den saknas', kind: 'em' },
  { phrase: 'uppfatta, sortera, hålla kvar och bearbeta information', kind: 'strong' },
  { phrase: 'Vi tror', kind: 'em' },
  { phrase: 'mer än ett decennium av psykologiska utredningar', kind: 'strong' },
  { phrase: 'Inte genom att ta ett vanligt psykologiskt test och kalla resultatet spelintelligens.', kind: 'em' },
  { phrase: 'Vi är fortfarande i början.', kind: 'strong' },
  { phrase: 'hypoteser och idéer', kind: 'em' },
  { phrase: 'behöver vi börja nu', kind: 'strong' },
  { phrase: 'Vi vill bidra till att de får chansen.', kind: 'strong' },
  { phrase: 'Sweden winning the football World Cup.', kind: 'strong' },
  { phrase: 'Our expertise lies somewhere else entirely: in psychology.', kind: 'em' },
  { phrase: 'Football intelligence.', kind: 'strong' },
  { phrase: 'Not because it is absent', kind: 'em' },
  { phrase: 'perceiving, sorting, retaining and processing information', kind: 'strong' },
  { phrase: 'We believe', kind: 'em' },
  { phrase: 'more than a decade of psychological assessment', kind: 'strong' },
  { phrase: 'Not by taking a standard psychological test and calling its result football intelligence.', kind: 'em' },
  { phrase: 'We are still at the beginning.', kind: 'strong' },
  { phrase: 'hypotheses and ideas', kind: 'em' },
  { phrase: 'we need to start now', kind: 'strong' },
  { phrase: 'We want to help give them their chance.', kind: 'strong' },
];

export function editorialSegments(text: string) {
  const result: { text: string; kind?: 'strong' | 'em' }[] = [];
  let cursor = 0;
  while (cursor < text.length) {
    const match = rules.map(rule => ({ ...rule, index: text.indexOf(rule.phrase, cursor) }))
      .filter(rule => rule.index >= 0).sort((a, b) => a.index - b.index || b.phrase.length - a.phrase.length)[0];
    if (!match) { result.push({ text: text.slice(cursor) }); break; }
    if (match.index > cursor) result.push({ text: text.slice(cursor, match.index) });
    result.push({ text: match.phrase, kind: match.kind });
    cursor = match.index + match.phrase.length;
  }
  return result;
}

export const missionPullQuotes = new Set([
  'Den som är bäst idag är inte nödvändigtvis den som har störst potential imorgon.',
  'The best player today is not necessarily the one with the greatest potential tomorrow.',
]);
export const missionSubheadings = new Set(['Men vad består det egentligen av?', 'But what is it actually made of?']);
