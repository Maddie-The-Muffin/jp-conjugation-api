import { type VerbDefinition, type Tenses, type VerbType, type TenseInfo } from "./format.ts";
import { hiraganaToRomaji } from "../lib/hiraganaToRomaji.ts";
import { getIchidanConjugation } from "../lib/tenseHelpers.ts";

// exception verbs besides suru and kuru to consider:
// iku, aru

/*
tense todo:
te-form (+ negative te?)
ba-form (conditional)
tara-form (conditional)
tai-form
masu-kei + its derivatives
volitional
passive
causative
passive/causative?
command
potential
zu?
*/

const pastEnding = "た";
const negativeEnding = "ない";
const pastNegativeEnding = "なかった";

// todo: add "TenseResult" or someting like that with a field for TenseInfo and one for error
// so on error we can return 500 or something

export function getTenses(verb: VerbDefinition): Tenses {
    return {
        past: getPastTense(verb),
        negative: getNegativeTense(verb),
        pastNegative: getPastNegativeTense(verb)
    }
}

function getPastTense(verb: VerbDefinition): TenseInfo {
    if (verb.type === "irregular") {
        if (verb.verb === "する") return {verb: "した", verbHiragana: "した", verbRomaji: "shita"};
        else if (verb.verb === "来る") return { verb: "来た", verbHiragana: "きた", verbRomaji: "kita" };
        else {
            console.log(`Unknown irregular verb ${verb.verbRomaji}`);
            return {verb: verb.verb, verbHiragana: verb.verbHiragana, verbRomaji: verb.verbRomaji};
        }
    }
    else if (verb.type === "godan") {
        if (verb.verb === "行く") return { verb: "行った", verbHiragana: "いった", verbRomaji: "itta"} // handle iku exception
        else {
            return {verb: "した", verbHiragana: "した", verbRomaji: "shita"}; // placeholder til we get godan helpers set up
        }
    }
    else {
        return getIchidanConjugation(verb, pastEnding);
    }
}

function getNegativeTense(verb: VerbDefinition): TenseInfo {
    if (verb.type === "ichidan") {
        return getIchidanConjugation(verb, negativeEnding);
    }
    else
        return {verb: verb.verb, verbHiragana: verb.verbHiragana, verbRomaji: verb.verbRomaji};
}

function getPastNegativeTense(verb: VerbDefinition): TenseInfo {
    if (verb.type === "ichidan") {
        return getIchidanConjugation(verb, pastNegativeEnding);
    }
    else
        return {verb: verb.verb, verbHiragana: verb.verbHiragana, verbRomaji: verb.verbRomaji};
}