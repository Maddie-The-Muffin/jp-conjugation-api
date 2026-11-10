import { type VerbSearchResult, type VerbResult, type VerbDefinition } from "./format.ts";
import { getTenses } from "./tenses.ts";

export const AllVerbs: VerbDefinition[] = [
    {
        verb: "見る",
        verbHiragana: "みる",
        verbRomaji: "miru",
        definition: "to see, to look at",
        type: "ichidan"
    }
]

export const containsVerb = (search: string): VerbResult | null => {
    let res: VerbResult | null = null;
    let found: boolean = false;
    AllVerbs.forEach(v => {
        if (v.verbRomaji === search && !found) {
            console.log("hurrah!");
            let temp = v;
            res = {
                ...temp,
                tenses: getTenses(v)
            }
            found = true;
        }
    });

    return res;
}