import { type VerbDefinition, type Tenses, type VerbType } from "./format.ts";

const pastEnding = "た";

export function getTenses(verb: VerbDefinition): Tenses {
    return {
        past: getPastTense(verb)
    }
}

function getPastTense(verb: VerbDefinition): string {
    let transformedVerb = verb.verb;
    if (verb.type === "ichidan") {
        const end = transformedVerb.length - 1;
        // todo: finish past tense for ichidan
        transformedVerb = transformedVerb.slice(0, end);
        transformedVerb += pastEnding;
    }
    return transformedVerb;
}