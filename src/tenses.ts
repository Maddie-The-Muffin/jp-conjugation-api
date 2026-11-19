import { type VerbDefinition, type Tenses, type VerbType } from "./format.ts";

// exception verbs besides suru and kuru to consider:
// iku, aru

const pastEnding = "た";
const negativeEnding = "ない";
const pastNegativeEnding = "なかった";

export function getTenses(verb: VerbDefinition): Tenses {
    return {
        past: getPastTense(verb),
        negative: getNegativeTense(verb),
        pastNegative: getPastNegativeTense(verb)
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

function getNegativeTense(verb: VerbDefinition): string {
    let transformedVerb = verb.verb;
    if (verb.type === "ichidan") {
        const end = transformedVerb.length - 1;
        transformedVerb = transformedVerb.slice(0, end);
        transformedVerb += negativeEnding;
    }
    return transformedVerb;
}

function getPastNegativeTense(verb: VerbDefinition): string {
    let transformedVerb = verb.verb;
    if (verb.type === "ichidan") {
        const end = transformedVerb.length - 1;
        transformedVerb = transformedVerb.slice(0, end);
        transformedVerb += pastNegativeEnding;
    }
    return transformedVerb;
}