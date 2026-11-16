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

export const containsVerb = (search: string): VerbSearchResult => {
    let allVerbs: VerbResult[] = [];
    let found: boolean = false;
    AllVerbs.forEach(v => {
        if (v.verbRomaji === search && !found) {
            console.log("hurrah!");
            let temp = v;
            allVerbs.push({
                ...temp,
                tenses: getTenses(v)
            });
            found = true;
        }
    });

    if (found) {
        return {
            verbs: allVerbs,
            error: null
        }
    }
    else {
        return {
            verbs: [],
            error: `Verb ${search} could not be found`
        }
    }
}