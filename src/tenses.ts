import { type VerbDefinition, type Tenses, type TenseInfo, type TenseResult } from "./format.ts";
import { hiraganaToRomaji } from "../lib/hiraganaToRomaji.ts";
import { getGodanPastTense, getIchidanConjugation } from "../lib/tenseHelpers.ts";

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

function getPastTense(verb: VerbDefinition): TenseResult {
    if (verb.type === "irregular") {
        if (verb.verb === "する") return {tenses: {verb: "した", verbHiragana: "した", verbRomaji: "shita"}, error: null};
        else if (verb.verb === "来る") return {tenses: { verb: "来た", verbHiragana: "きた", verbRomaji: "kita" }, error: null};
        else {
            return {tenses: null, error: `Unknown irregular verb ${verb.verbRomaji}`};
        }
    }
    else if (verb.type === "godan") {
        if (verb.verb === "行く") return { tenses: { verb: "行った", verbHiragana: "いった", verbRomaji: "itta"}, error: null} // handle iku exception
        else {
            /*
            u, ru, tsu -> tta
            gu -> ida
            ku -> ita
            mu, bu, nu, -> nda
            su -> shita
            */
            return getGodanPastTense(verb); // placeholder til we get godan helpers set up
        }
    }
    else {
        return getIchidanConjugation(verb, pastEnding);
    }
}

function getNegativeTense(verb: VerbDefinition): TenseResult {
    if (verb.type === "ichidan") {
        return getIchidanConjugation(verb, negativeEnding);
    }
    else
        return {tenses: null, error: "WIP"};
}

function getPastNegativeTense(verb: VerbDefinition): TenseResult {
    if (verb.type === "ichidan") {
        return getIchidanConjugation(verb, pastNegativeEnding);
    }
    else
        return {tenses: null, error: "WIP"};
}