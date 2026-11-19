import { type TenseInfo, type VerbDefinition } from "../src/format.ts";
import { hiraganaToRomaji } from "./hiraganaToRomaji.ts";

// intended for basic ichidan conjugations where we chop off the ending and slap a new one onto it
export const getIchidanConjugation = (verb: VerbDefinition, ending: string): TenseInfo => {
    const end = verb.verb.length - 1;
        let newVerb: string = verb.verb.slice(0, end);
        let newVerbHiragana: string = verb.verbHiragana.slice(0, end);
        newVerb += ending;
        newVerbHiragana += ending;
        const newVerbRomaji = hiraganaToRomaji(newVerbHiragana);
        if (newVerbRomaji.error)
            console.log("Oh no!");
        return { verb: newVerb, verbHiragana: newVerbHiragana, verbRomaji: newVerbRomaji.result }
}