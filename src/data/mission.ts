import type { Locale } from '../i18n';
import copy from './mission.json';

export const missionChapterIds = ['dream', 'problem', 'opportunity', 'expertise', 'method', 'road', 'journey'];
export function missionContent(locale: Locale) { return copy[locale]; }
