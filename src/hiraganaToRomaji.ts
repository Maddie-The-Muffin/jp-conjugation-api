const hiraganaToRomajiTable: Record<string, string> = {
    "あ": "a",
    "い": "i",
    "う": "u",
    "え": "e",
    "お": "o",
    "か": "ka",
    "き": "ki",
    "く": "ku",
    "け": "ke",
    "こ": "ko",
    "が": "ga",
    "ぎ": "gi",
    "ぐ": "gu",
    "げ": "ge",
    "ご": "go",
    "さ": "sa",
    "し": "shi",
    "す": "su",
    "せ": "se",
    "そ": "so",
    "ざ": "za",
    "じ": "ji",
    "ず": "zu",
    "ぜ": "ze",
    "ぞ": "zo",
    "た": "ta",
    "ち": "chi",
    "つ": "tsu",
    "て": "te",
    "と": "to",
    "だ": "da",
    "ぢ": "ji",
    "づ": "dzu",
    "で": "de",
    "ど": "do",
    "な": "na",
    "に": "ni",
    "ぬ": "nu",
    "ね": "ne",
    "の": "no",
    "は": "ha",
    "ひ": "hi",
    "ふ": "fu",
    "へ": "he",
    "ほ": "ho",
    "ば": "ba",
    "び": "bi",
    "ぶ": "bu",
    "べ": "be",
    "ぼ": "bo",
    "ぱ": "pa",
    "ぴ": "pi",
    "ぷ": "pu",
    "ぺ": "pe",
    "ぽ": "po",
    "ま": "ma",
    "み": "mi",
    "む": "mu",
    "め": "me",
    "も": "mo",
    "や": "ya",
    "ゆ": "yu",
    "よ": "yo",
    "ら": "ra",
    "り": "ri",
    "る": "ru",
    "れ": "re",
    "ろ": "ro",
    "わ": "wa",
    "を": "wo",
    "ん": "n",
    "きゃ": "kya",
    "きゅ": "kyu",
    "きょ": "kyo",
    "ぎゃ": "gya",
    "ぎゅ": "gyu",
    "ぎょ": "gyo",
    "しゃ": "sha",
    "しゅ": "shu",
    "しょ": "sho",
    "じゃ": "ja",
    "じゅ": "ju",
    "じょ": "jo",
    "ちゃ": "cha",
    "ちゅ": "chu",
    "ちょ": "cho",
    "にゃ": "nya",
    "にゅ": "nyu",
    "にょ": "nyo",
    "ひゃ": "hya",
    "ひゅ": "hyu",
    "ひょ": "hyo",
    "びゃ": "bya",
    "びゅ": "byu",
    "びょ": "byo",
    "ぴゃ": "pya",
    "ぴゅ": "pyu",
    "ぴょ": "pyo",
    "みゃ": "mya",
    "みゅ": "myu",
    "みょ": "myo",
    "りゃ": "rya",
    "りゅ": "ryu",
    "りょ": "ryo",
    "っ": "ltsu", // empty - special handling
}

const specialKana: Record<string, string> = {
    "ゃ": "lya",
    "ゅ": "lyu",
    "ょ": "lyo"
}



/*
Edge cases to fix:
  1. Two yōon in a row. きゃきゃ and しゃしゃ return an error ("Unknown kana ゃ"). After a yōon
     is handled, i jumps ahead and the next kana is looked up without checking for its own
     small ゃ/ゅ/ょ. Something like きゃくしゃ works only because a plain kana sits between the
     yōon.
  2. Small っ before a yōon. ざっしゃ gives zasha, but it should be zassha, and まっちゃ gives
     macha, not matcha. The double flag is never applied on the yōon branch.
  3. Hepburn っ + ch. まっち gives macchi. Hepburn writes it matchi (tchi). 
  4. Small っ before a vowel. あっあ gives aaa. That is invalid kana, so it should probably be
     an error. Decide, then test.
  5. Trailing っ after a yōon. きゃっ gives kya. The existing まあっ test covers trailing っ
     after a plain kana only.

Considerations: 
-  ん before a vowel or y. ほんや gives honya, and Hepburn writes hon'ya. 
*/

// possible bug fix: try breaking words at fullsize kana boundaries. if a boundary ends with small tsu raise a double flag

// word should be in full hiragana
export const hiraganaToRomaji = (word: string): { result: string, error: string | null } => {
    if (word.length === 0 || word.length > 100) return {result: "", error: "Word should be between 1 and 100 characters."};
    let finalString = "";
    let double = false;
    // first, check for following small tsu or small ya/yu/yo then handle if it exists
    // else just use the lookup table
    for(let i = 0; i < word.length; i++) {
        if (i < word.length - 1) {
            const hasSpecialKana: string | undefined = specialKana[word[i + 1]];
            console.log("has special kana? " + hasSpecialKana);
            if (hasSpecialKana !== undefined) {
                
                    let combined = word.substring(i, i + 2);
                    let res: string | undefined = hiraganaToRomajiTable[combined];
                    if (res !== undefined) {
                        finalString += res;
                    }
                    else return { result: "", error: `Unknown kana ${combined} submitted` };
                    i += 2;
            }
            if (i >= word.length) break;
            //else return { result: "", error: `Unknown special kana ${word[i + 1]} submitted` };
        }

        let romaji: string | undefined = hiraganaToRomajiTable[word[i]];
        if (romaji !== undefined) {
            if (double) {
                const firstChar = romaji.charAt(0);
                romaji = firstChar.concat(romaji);
                double = false;
            }
            if (word[i] === "っ") 
            {
                double = true;
            }
            else
                finalString += romaji;
        }
        else return {result: "", error: `Unknown kana ${word[i]} submitted. (Make sure you are not using katakana!)`}
    }
    return {result: finalString, error: null};
}
