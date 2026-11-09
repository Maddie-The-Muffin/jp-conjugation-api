import { type VerbSearchResult, type VerbDefinition } from "./format.ts";

export const AllVerbs: VerbDefinition[] = [
    {
        verb: "見る",
        verbHiragana: "みる",
        verbRomaji: "miru",
        definition: "to see, to look at",
        type: "ichidan"
    }
]

export const containsVerb = (search: string): VerbSearchResult => {
    let res: VerbSearchResult = null;
    AllVerbs.forEach(v => {
        if (v.verbRomaji === search && res === null) {
            console.log("hurrah!");
            res = v;
        }
    })

    return res;
}