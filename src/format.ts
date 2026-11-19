export type VerbType = "godan" | "ichidan" | "irregular";

export interface Tenses {
    past: string,
    negative: string,
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