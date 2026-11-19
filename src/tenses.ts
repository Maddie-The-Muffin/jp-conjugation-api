import { type VerbDefinition, type Tenses, type VerbType, type TenseInfo } from "./format.ts";
import { hiraganaToRomaji } from "./hiraganaToRomaji.ts";

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
        const end = verb.verb.length - 1;
        let newVerb: string = verb.verb.slice(0, end);
        let newVerbHiragana: string = verb.verbHiragana.slice(0, end);
        newVerb += pastEnding;
        newVerbHiragana += pastEnding;
        const newVerbRomaji = hiraganaToRomaji(newVerbHiragana);
        if (newVerbRomaji.error)
            console.log("Oh no!");
        return { verb: newVerb, verbHiragana: newVerbHiragana, verbRomaji: newVerbRomaji.result }
    }
}

function getNegativeTense(verb: VerbDefinition): TenseInfo {
    if (verb.type === "ichidan") {
        const end = verb.verb.length - 1;
        let newVerb: string = verb.verb.slice(0, end);
        let newVerbHiragana: string = verb.verbHiragana.slice(0, end);
        newVerb += negativeEnding;
        newVerbHiragana += negativeEnding;
        const newVerbRomaji = hiraganaToRomaji(newVerbHiragana);
        if (newVerbRomaji.error)
            console.log("Oh no!");
        return { verb: newVerb, verbHiragana: newVerbHiragana, verbRomaji: newVerbRomaji.result }
    }
    else
        return {verb: verb.verb, verbHiragana: verb.verbHiragana, verbRomaji: verb.verbRomaji};
}

function getPastNegativeTense(verb: VerbDefinition): TenseInfo {
    if (verb.type === "ichidan") {
        const end = verb.verb.length - 1;
        let newVerb: string = verb.verb.slice(0, end);
        let newVerbHiragana: string = verb.verbHiragana.slice(0, end);
        newVerb += pastNegativeEnding;
        newVerbHiragana += pastNegativeEnding;
        const newVerbRomaji = hiraganaToRomaji(newVerbHiragana);
        if (newVerbRomaji.error)
            console.log("Oh no!");
        return { verb: newVerb, verbHiragana: newVerbHiragana, verbRomaji: newVerbRomaji.result }
    }
    else
        return {verb: verb.verb, verbHiragana: verb.verbHiragana, verbRomaji: verb.verbRomaji};
}