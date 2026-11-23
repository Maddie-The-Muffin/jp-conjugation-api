import { type TenseInfo, type TenseResult, type VerbDefinition } from "../src/format.ts";
import { hiraganaToRomaji } from "./hiraganaToRomaji.ts";

const godanPastTenses: Record<string, string> = {
    "う": "った",
    "る": "った",
    "つ": "った",
    "す": "した",
    "く": "いた",
    "ぐ": "いだ",
    "む": "んだ",
    "ぶ": "んだ",
    "ぬ": "んだ"
}

// intended for basic ichidan conjugations where we chop off the ending and slap a new one onto it
export const getIchidanConjugation = (verb: VerbDefinition, ending: string): TenseResult => {
        const end = verb.verb.length - 1;
        const hiraganaEnd = verb.verbHiragana.length - 1;
        let newVerb: string = verb.verb.slice(0, end);
        let newVerbHiragana: string = verb.verbHiragana.slice(0, hiraganaEnd);
        newVerb += ending;
        newVerbHiragana += ending;
        const newVerbRomaji = hiraganaToRomaji(newVerbHiragana);
        if (newVerbRomaji.error)
        {
            return {
                tenses: null,
                error: `There was an error with the romaji function: ${newVerbRomaji.error}`
            }
        }
        return {
            tenses: { verb: newVerb, verbHiragana: newVerbHiragana, verbRomaji: newVerbRomaji.result },
            error: null
        }
}

export const getGodanPastTense = (verb: VerbDefinition): TenseResult => {
    const finalIdx = verb.verb.length - 1;
    const hiraganaFinalIdx = verb.verbHiragana.length - 1;
    const end = verb.verb[finalIdx]; // get the verb ending
    const newEnding: string | undefined = godanPastTenses[end];

    if (newEnding === undefined)
        return { tenses: null,  error: `Undefined verb ending ${end}`}

    // Assign the new ending to the verb and its hiragana counterpart, then get its romaji
    let newVerb: string = verb.verb.slice(0, finalIdx);
    let newVerbHiragana: string = verb.verbHiragana.slice(0, hiraganaFinalIdx);
    newVerb += newEnding;
    newVerbHiragana += newEnding;
    const newVerbRomaji = hiraganaToRomaji(newVerbHiragana);
    if (newVerbRomaji.error) {
        return {
            tenses: null,
            error: `There was an error with the romaji function: ${newVerbRomaji.error}`
        }
    }
    else {
        return {
            tenses: { verb: newVerb, verbHiragana: newVerbHiragana, verbRomaji: newVerbRomaji.result },
            error: null
        }
    }
}