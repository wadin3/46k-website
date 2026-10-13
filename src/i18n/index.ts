import { sitePath } from '../lib/paths';

export const locales = {
  sv: { name: 'Svenska', short: 'SV' },
  en: { name: 'English', short: 'EN' },
} as const;
export type Locale = keyof typeof locales;
export const defaultLocale: Locale = 'sv';
const dictionaries: Partial<Record<Locale, Record<string, string>>> = {
  sv: {
  "Explore": "Utforska",
  "Assessment": "Bedömning",
  "The 2046 Mission": "2046-visionen",
  "Connect": "Kontakt",
  "Main navigation": "Huvudnavigation",
  "46K home": "46K – startsidan",
  "Skip to content": "Hoppa till innehållet",
  "Choose language": "Välj språk",
  "We use cognitive science to understand and develop football intelligence.": "Vi använder kognitionsvetenskap för att förstå och utveckla spelintelligens.",
  "SWEDEN. WORLD CHAMPIONS. 2046.": "SVERIGE. VÄRLDSMÄSTARE. 2046.",
  "UNDERSTAND": "FÖRSTÅ",
  "ASSESS": "BEDÖMA",
  "DEVELOP": "UTVECKLA",
  "ALL": "ALLA",
  "Look beyond what happens on the pitch. Explore perception, cognition and the questions behind football intelligence.": "Se bortom det som händer på planen. Utforska perception, kognition och frågorna bakom spelintelligens.",
  "Explore our thinking": "Utforska våra tankar",
  "We are developing ways to examine relevant cognitive capabilities. Research and validation come first.": "Vi utvecklar sätt att undersöka relevanta kognitiva förmågor. Forskning och validering kommer först.",
  "Our approach to assessment": "Vår syn på bedömning",
  "Turn insights into better questions about training and development. Measurement should lead somewhere useful.": "Låt insikter bli bättre frågor om träning och utveckling. Mätning ska leda till något användbart.",
  "Explore development": "Utforska utveckling",
  "Illustrative image of an adult football player looking across a training pitch.": "Illustrativ bild av en vuxen fotbollsspelare som blickar över en träningsplan.",
  "46K / SWEDEN / FOOTBALL INTELLIGENCE": "46K / SVERIGE / SPELINTELLIGENS",
  "Football": "Spel",
  "intelligence.": "intelligens.",
  "Talent is more than": "Talang är mer än",
  "what you can see today.": "det du kan se idag.",
  "A WAY OF THINKING": "ETT SÄTT ATT TÄNKA",
  "THE JOURNAL": "INSIKTER",
  "Questions worth asking.": "Frågor värda att ställa.",
  "All articles": "Alla artiklar",
  "MIN READ": "MIN LÄSNING",
  "Read article": "Läs artikeln",
  "THE 2046 MISSION": "2046-VISIONEN",
  "Sweden.": "Sverige.",
  "World Champions.": "Världsmästare.",
  "2046 is not a prediction. It is a direction.": "2046 är ingen förutsägelse. Det är en riktning.",
  "Explore the ambition": "Utforska ambitionen",
  "Assessment - 46K": "Bedömning – 46K",
  "Our research and development approach to cognitive assessment in football.": "Vår syn på forskning och utveckling kring kognitiv bedömning inom fotboll.",
  "RESEARCH & DEVELOPMENT": "FORSKNING OCH UTVECKLING",
  "Assessment.": "Bedömning.",
  "More information. Better questions.": "Mer information. Bättre frågor.",
  "We are developing approaches to assess relevant cognitive abilities in football. The work is at an early stage, and validation is essential. Assessment should complement coaching, observation and match data.": "Vi utvecklar metoder för att bedöma relevanta kognitiva förmågor inom fotboll. Arbetet befinner sig i ett tidigt skede och validering är avgörande. Bedömning ska komplettera tränarnas arbete, observationer och matchdata.",
  "From measurement": "Från mätning",
  "to development.": "till utveckling.",
  "A score is a starting point for a conversation. Its value depends on what it measures, how reliably it does so, and whether it helps us understand a player in context.": "Ett resultat är en utgångspunkt för ett samtal. Värdet beror på vad det mäter, hur tillförlitlig mätningen är och om den hjälper oss att förstå en spelare i sitt sammanhang.",
  "Our aim is to connect responsible assessment with useful questions about learning, training and development. We do not claim that a cognitive test can determine who will become a professional footballer.": "Vårt mål är att förena ansvarsfull bedömning med användbara frågor om lärande, träning och utveckling. Vi hävdar inte att ett kognitivt test kan avgöra vem som blir professionell fotbollsspelare.",
  "Read our assessment thinking": "Läs våra tankar om bedömning",
  "FOR COACHES, CLUBS & RESEARCHERS": "FÖR TRÄNARE, KLUBBAR OCH FORSKARE",
  "Help ask the next question.": "Hjälp oss ställa nästa fråga.",
  "Start a conversation": "Inled ett samtal",
  "The 2046 Mission - 46K": "2046-visionen – 46K",
  "What would it take for Sweden to win the World Cup in 2046? A direction for research and development.": "Vad skulle krävas för att Sverige ska vinna fotbolls-VM 2046? En riktning för forskning och utveckling.",
  "THE FOUNDING QUESTION": "FRÅGAN SOM STARTADE ALLT",
  "An unreasonable": "En orimlig",
  "ambition.": "ambition.",
  "What would it take for Sweden to win the World Cup in 2046?": "Vad skulle krävas för att Sverige ska vinna fotbolls-VM 2046?",
  "We use that question to look at how football understands and develops talent. What can cognitive science contribute? What are we missing when we focus only on what is visible today?": "Med den frågan undersöker vi hur fotbollen förstår och utvecklar talang. Vad kan kognitionsvetenskap bidra med? Vad missar vi när vi enbart fokuserar på det som syns idag?",
  "The ambition sets a direction. The work is to ask useful questions, test our assumptions and stay honest about what the evidence supports.": "Ambitionen ger en riktning. Arbetet handlar om att ställa användbara frågor, pröva våra antaganden och vara ärliga om vad forskningen ger stöd för.",
  "Read the 2046 perspective": "Läs 2046-perspektivet",
  "UNDERSTAND / ASSESS / DEVELOP": "FÖRSTÅ / BEDÖMA / UTVECKLA",
  "A longer view of talent.": "Ett längre perspektiv på talang.",
  "Connect - 46K": "Kontakt – 46K",
  "Conversations and collaborations around football intelligence, cognitive science and player development.": "Samtal och samarbeten kring spelintelligens, kognitionsvetenskap och spelarutveckling.",
  "CONVERSATIONS & COLLABORATIONS": "SAMTAL OCH SAMARBETEN",
  "Connect.": "Kontakt.",
  "Better questions start with a conversation.": "Bättre frågor börjar med ett samtal.",
  "Interested in football intelligence? We welcome conversations with players, coaches, clubs and researchers about the cognitive side of the game.": "Nyfiken på spelintelligens? Vi välkomnar samtal med spelare, tränare, klubbar och forskare om spelets kognitiva sida.",
  "What are": "Vad är",
  "you curious about?": "du nyfiken på?",
  "A research question. A coaching observation. An idea about how players learn and develop. Tell us what you are thinking about and where football intelligence fits into your work.": "En forskningsfråga. En observation från träningen. En idé om hur spelare lär sig och utvecklas. Berätta vad du funderar på och hur spelintelligens passar in i ditt arbete.",
  "Email 46K": "Mejla 46K",
  "A conversation": "Ett samtal",
  "Explore — 46K": "Utforska – 46K",
  "Ideas, research and perspectives on football intelligence.": "Idéer, forskning och perspektiv på spelintelligens.",
  "46K / THE JOURNAL": "46K / INSIKTER",
  "Explore.": "Utforska.",
  "Better questions. Deeper understanding. New perspectives on the unseen side of football.": "Bättre frågor. Djupare förståelse. Nya perspektiv på fotbollens mindre synliga sida.",
  "Article categories": "Artikelkategorier",
  "No articles in this category yet.": "Det finns inga artiklar i den här kategorin ännu.",
  "Explore all articles": "Utforska alla artiklar",
  "READ ARTICLE": "LÄS ARTIKELN",
  "BACK TO EXPLORE": "TILLBAKA TILL UTFORSKA",
  "Sources & further reading": "Källor och vidare läsning",
  "KEEP EXPLORING": "FORTSÄTT UTFORSKA",
  "EDITORIAL": "PERSPEKTIV",
  "RESEARCH": "FORSKNING",
  "INSIGHT": "INSIKT"
},
};

export function translate(locale: Locale, text: string): string {
  return dictionaries[locale]?.[text] ?? text;
}

export function localePath(route = '', locale: Locale = defaultLocale) {
  return sitePath((locale === defaultLocale ? '' : locale + '/') + route.replace(/^\//, ''));
}

export function relativeRoute(pathname: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  let route = pathname.slice(base.length).replace(/^\//, '');
  for (const locale of Object.keys(locales)) {
    if (locale !== defaultLocale && route.startsWith(locale + '/')) {
      route = route.slice(locale.length + 1);
      break;
    }
  }
  return route;
}
