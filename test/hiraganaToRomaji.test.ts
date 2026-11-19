import { afterAll, assert, assertType, describe, expect, test} from "vitest";
import { hiraganaToRomaji } from "../src/hiraganaToRomaji.ts";

describe("Hiragana to romaji tests", () => {
    test("Simple japanese word", () => {
        const res = hiraganaToRomaji("みる");
        const expected = "miru"
        console.log(res);

        expect(res.error).toBeNull();
        assert.equal(res.result, expected, "みる should romanize to miru");
    })

    test("Japanese word with small ya/yu/yo", () => {
        const res = hiraganaToRomaji("しんちょう");
        const expected = "shinchou";
        console.log(res);
        
        expect(res.error).toBeNull();
        assert.equal(res.result, expected, `Result returned ${res}`);
    })

    test("Japanese word with small tsu", () => {
        const res = hiraganaToRomaji("あったら");
        const expected = "attara";
        console.log(res);

        expect(res.error).toBeNull();
        assert.equal(res.result, expected, `Result returned ${res}`);
    })

    test("Japanese word that ends with small ya/yu/yo", () => {
        const res = hiraganaToRomaji("じんじゃ");
        const expected = "jinja";
        console.log(res);

        expect(res.error).toBeNull();
        assert.equal(res.result, expected, `Result returned ${res}`);
    })

    test("Japanese word that ends with small tsu", () => {
        const res = hiraganaToRomaji("まあっ");
        const expected = "maa";
        console.log(res);

        expect(res.error).toBeNull();
        assert.equal(res.result, expected, `Result returned ${res}`);
    })

    test("Multiple small tsus in the middle", () => {
        const res = hiraganaToRomaji("あっった");
        const expected = "atta";
        console.log(res);

        expect(res.error).toBeNull();
        assert.equal(res.result, expected, `Result returned ${res}`);
    })

    test("Multiple small ya/yu/yo in the middle", () => {
        const res = hiraganaToRomaji("じゅゅゅじゃ");

        assert.isNotNull(res.error, `Result should have an error. Result returned ${res}`);
    })

    test("Small tsu at the beginning", () => {
        const res = hiraganaToRomaji("った");
        const expected = "tta";

        expect(res.error).toBeNull();
        assert.equal(res.result, expected, `Result returned ${res}`);
    })

    test("Small ya/yu/yo at the beginning should return an error", () => {
        const res = hiraganaToRomaji("ゃばな");

        assert.isNotNull(res.error, `Result should have an error. Result returned ${res}`);
    })

    test("Normal-size ya/yu/yo should be OK anywhere", () => {
        const res = hiraganaToRomaji("ゆみや");
        const expected = "yumiya";

        expect(res.error).toBeNull();
        assert.equal(res.result, expected, `Result returned ${res}`);
    })

    test("Empty input should return an error", () => {
        const res = hiraganaToRomaji("");

        assert.isNotNull(res.error, `Result should have an error. Result returned ${res}`);
    })

    test("Whitespace input should return an error", () => {
        const res = hiraganaToRomaji("    ");

        assert.isNotNull(res.error, `Result should have an error. Result returned ${res}`);
    })

    test("Non-hiragana characters should return an error", () => {
        const res = hiraganaToRomaji("potato");

        assert.isNotNull(res.error, `Result should have an error. Result returned ${res}`);
    })

    test("Overly long input should return an error", () => {
        const res = hiraganaToRomaji("日本語では単純母音が5つしかないこと、子音それぞれとの組み合わせがほぼ完全対応であることなどが、仮名および音素を理解する手段として五十音図をわかりやすく手軽なものにしている。しかし日本語の仮名・音節が文字通り50個である訳ではない。表上では欠落したり重複したりしている文字・音節がある。また五十音図は清音のみを示すが、他に濁音・半濁音・長音・促音・撥音・拗音、などがあり、音節の種類の総数は100以上ある");

        assert.isNotNull(res.error, `Result should have an error. Result returned ${res}`);
    })
})