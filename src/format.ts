import { getTenses } from "./tenses.ts";

export type VerbType = "godan" | "ichidan" | "irregular";

export interface TenseInfo {
    verb: string,
    verbHiragana: string,
    verbRomaji: string,
}

export interface TenseResult {
    tenses: TenseInfo | null,
    error: string | null,
}

export interface Tenses {
    past: TenseResult,
    negative: TenseResult,
    pastNegative: TenseResult,
}

export interface VerbSchema {
    verb: string,
    verbhiragana: string,
    verbromaji: string,
    definition: string,
    type: VerbType
}

export interface VerbDefinition {
    verb: string,
    verbHiragana: string,
    verbRomaji: string,
    definition: string,
    type: VerbType
}

export interface VerbResult extends VerbDefinition {
    tenses: Tenses
}

export type VerbSearchResult = { verbs: VerbResult[] }

export function toVerbQueryResult(r: VerbSchema): VerbDefinition {
    return {
            verb: r.verb,
            verbHiragana: r.verbhiragana,
            verbRomaji: r.verbromaji,
            definition: r.definition,
            type: r.type
        }
}

export function toVerbFinalResult(v: VerbDefinition): VerbResult {
    return {
        ...v,
        tenses: getTenses(v)
    }
}