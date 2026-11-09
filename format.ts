const verbType = ["godan", "ichidan", "irregular"] as const;
export type VerbType = (typeof verbType)[number];

export type VerbDefinition = {
    verb: string,
    verbHiragana: string,
    verbRomaji: string,
    definition: string,
    type: VerbType
}

export type VerbSearchResult = VerbDefinition | null;