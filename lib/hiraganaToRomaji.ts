const kanaTable: Record<string, string> = {
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
    "っ": "ltsu", // special handling
    /*
    
    */
}

const youon: Record<string, string> = {
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
}

const specialKana: Record<string, string> = {
    "ゃ": "ya",
    "ゅ": "yu",
    "ょ": "yo"
}

const fullHiraganaToRomajiTable: Record<string, string> = {
    ...kanaTable,
    ...youon
}

const vowelSounds: string[] = [
    "a", "i", "u", "e", "o", "ya", "yu", "yo"
]

/*
Edge cases to fix:
  4. Small っ before a vowel. あっあ gives aaa. That is invalid kana, so it should probably be
     an error. Decide, then test.
  5. Trailing っ after a yōon. きゃっ gives kya. The existing まあっ test covers trailing っ
     after a plain kana only.

Considerations: 
-  ん before a vowel or y. ほんや gives honya, and Hepburn writes hon'ya. 
*/


// word should be in full hiragana

const splitByMora = {
    [Symbol.split](str: string) {
        const result: string[] = [];
        // iterate through the passed in word
        // at each fullsize kana, search forward for the next fullsize kana
        // if found, add to the results array the initial fullsize kana up to (not including) the next fullsize kana
        
        let mora: string = str[0];
        for (let i = 0; i < str.length - 1; i++) {
            let checker = i + 1; // todo: handle end of string
            const check: string | undefined = kanaTable[str[checker]];
            if (check !== undefined) {
                result.push(mora);
                mora = "";
            }
            mora += str[checker];
        }

        result.push(mora);
        return result;
    }
}

export const hiraganaToRomaji = (word: string): { result: string, error: string | null } => {
    if (word.length === 0 || word.length > 100) {
        return { result: "", error: "Word must be between 1 and 101 characters." }
    }
    const invalidYouonCheck: string | undefined = specialKana[word[0]];
    if (invalidYouonCheck !== undefined) {
        return { result: "", error: "Small ya/yu/yo must not begin a word." }
    }

    const splitWord = word.split(splitByMora);

    let finalWord = "";
    let double: boolean = false;
    let singleN: boolean = false;
    for(let i = 0; i < splitWord.length; i++) {
        const mora: string | undefined = fullHiraganaToRomajiTable[splitWord[i]];
        if (mora === undefined) {
            return {result: "", error: `Invalid mora ${splitWord[i]} detected`}
        }
        else {
            if (mora === "ltsu") double = true;
            else {
                if (singleN) {
                    if (vowelSounds.includes(mora)) finalWord += "'"; // add an apostrophe between single n + vowel or y
                    singleN = false; // mark this false no matter the above result - we'll have moved on from the single n so no need to continue being true
                }
                if (double) {
                    let duplicate = mora.charAt(0) === "c" ? "t" : mora.charAt(0); // follow hepburn rules for small tsu + chi/cha/chu/cho
                    finalWord += duplicate;
                    double = false;
                }
                if (mora === "n")
                    singleN = true;
                finalWord += mora;
            }
        }
    }


    return {result: finalWord, error: null}
}