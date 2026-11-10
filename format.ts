export type VerbType = "godan" | "ichidan" | "irregular";

export interface Tenses {
    past: string,
    //negative: string,
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

export type VerbSearchResult = { verbs: VerbResult[], error: string | null }