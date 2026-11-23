import { afterAll, assert, assertType, describe, expect, test} from "vitest";
import { hiraganaToRomaji } from "../lib/hiraganaToRomaji.ts";

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

        expect(res.error).toBeNull();
        assert.equal(res.result, expected, `Result returned ${res}`);
    })

    test("Japanese word that ends with small ya/yu/yo", () => {
        const res = hiraganaToRomaji("じんじゃ");
        const expected = "jinja";

        expect(res.error).toBeNull();
        assert.equal(res.result, expected, `Result returned ${res}`);
    })

    test("Hepburn 'tch' romanization", () => {
        const res = hiraganaToRomaji("まっちゃ");
        const expected = "matcha";

        expect(res.error).toBeNull();
        assert.equal(res.result, expected, `Result returned ${res}`);
    })

    test("Hepburn apostrophe between single n + vowel sound", () => {
        const res = hiraganaToRomaji("ほんやく");
        const expected = "hon'yaku";

        console.log(res.result);
        expect(res.error).toBeNull();
        assert.equal(res.result, expected, `Result returned ${res}`);
    })

    test("No apostrophe between n and consonant", () => {
        const res = hiraganaToRomaji("あんぱん");
        const expected = "anpan";

        console.log(res.result);
        expect(res.error).toBeNull();
        assert.equal(res.result, expected, `Result returned ${res}`);
    })

    test("No apostrophe for the na-row of kana", () => {
        const res = hiraganaToRomaji("なに");
        const expected = "nani";

        expect(res.error).toBeNull();
        assert.equal(res.result, expected, `Result returned ${res}`);
    })

    test("Japanese word that ends with small tsu", () => {
        const res = hiraganaToRomaji("まあっ");
        const expected = "maa";

        expect(res.error).toBeNull();
        assert.equal(res.result, expected, `Result returned ${res}`);
    })

    test("Multiple small tsus in the middle", () => {
        const res = hiraganaToRomaji("あっった");
        const expected = "atta";

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

    test("Two youon in a row", () => {
        const res = hiraganaToRomaji("しゃちょう");
        const expected = "shachou";

        expect(res.error).toBeNull();
        assert.equal(res.result, expected, `Result returned ${res}`);
    })

    test("Small tsu before a youon", () => {
        const res = hiraganaToRomaji("いっしょ");
        const expected = "issho";

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
        const res = hiraganaToRomaji("ジャガイモ potato");

        assert.isNotNull(res.error, `Result should have an error. Result returned ${res}`);
    })

    test("Overly long input should return an error", () => {
        const res = hiraganaToRomaji("で".repeat(101));

        assert.isNotNull(res.error, `Result should have an error. Result returned ${res}`);
    })
})