import app from "../src/app.ts";
import { pool } from "../db/db.ts";
import { afterAll, assert, assertType, describe, expect, test} from "vitest";
import request from "supertest"
import { type Tenses, type VerbResult } from "../src/format.ts";

interface TestVerb {
    verb: string,
    verbHiragana: string,
    verbRomaji: string,
    tenses: Tenses
}

// godan verbs - 1 of every ending
const ruVerb: TestVerb = {
    verb: "走る",
    verbHiragana: "はしる",
    verbRomaji: "hashiru",
    tenses: {
        past: { tenses: { verb: "走った", verbHiragana: "はしった", verbRomaji: "hashitta" }, error: null },
        negative: { tenses: { verb: "走らない", verbHiragana: "はしらない", verbRomaji: "hashiranai" }, error: null },
        pastNegative: { tenses: { verb: "走らなかった", verbHiragana: "はしらなかった", verbRomaji: "hashiranakatta" }, error: null }
    }
}
const uVerb: TestVerb = {
    verb: "言う",
    verbHiragana: "いう",
    verbRomaji: "iu",
    tenses: {
        past: {tenses: { verb: "言った", verbHiragana: "いった", verbRomaji: "itta" }, error: null},
        negative: {tenses: { verb: "言わない", verbHiragana: "いわない", verbRomaji: "iwanai" }, error: null},
        pastNegative: {tenses: { verb: "言わなかった", verbHiragana: "いわなかった", verbRomaji: "iwanakatta" }, error: null},
    }
};
const tsuVerb: TestVerb = {
    verb: "待つ",
    verbHiragana: "まつ",
    verbRomaji: "matsu",
    tenses: {
        past: {tenses: { verb: "待った", verbHiragana: "まった", verbRomaji: "matta" }, error: null},
        negative: {tenses: { verb: "待たない", verbHiragana: "またない", verbRomaji: "matanai" }, error: null},
        pastNegative: {tenses: { verb: "待たなかった", verbHiragana: "またなかった", verbRomaji: "matanakatta" }, error: null},
    }
};
const guVerb: TestVerb = {
    verb: "泳ぐ",
    verbHiragana: "およぐ",
    verbRomaji: "oyogu",
    tenses: {
        past: {tenses: { verb: "泳いだ", verbHiragana: "およいだ", verbRomaji: "oyoida" }, error: null},
        negative: {tenses: { verb: "泳がない", verbHiragana: "およがない", verbRomaji: "oyoganai" }, error: null},
        pastNegative: {tenses: { verb: "泳がなかった", verbHiragana: "およがなかった", verbRomaji: "oyoganakatta" }, error: null},
    }
};
const kuVerb: TestVerb = {
    verb: "書く",
    verbHiragana: "かく",
    verbRomaji: "kaku",
    tenses: {
        past: {tenses: { verb: "書いた", verbHiragana: "かいた", verbRomaji: "kaita" }, error: null},
        negative: {tenses: { verb: "書かない", verbHiragana: "かかない", verbRomaji: "kakanai" }, error: null},
        pastNegative: {tenses: { verb: "書かなかった", verbHiragana: "かかなかった", verbRomaji: "kakanakatta" }, error: null},
    }
};
const suVerb: TestVerb = {
    verb: "落とす",
    verbHiragana: "おとす",
    verbRomaji: "otosu",
    tenses: {
        past: {tenses: { verb: "落とした", verbHiragana: "おとした", verbRomaji: "otoshita" }, error: null},
        negative: {tenses: { verb: "落とさない", verbHiragana: "おとさない", verbRomaji: "otosanai" }, error: null},
        pastNegative: {tenses: { verb: "落とさなかった", verbHiragana: "おとさなかった", verbRomaji: "otosanakatta" }, error: null},
    }
};
const muVerb: TestVerb = {
    verb: "読む",
    verbHiragana: "よむ",
    verbRomaji: "yomu",
    tenses: {
        past: {tenses: { verb: "読んだ", verbHiragana: "よんだ", verbRomaji: "yonda" }, error: null},
        negative: {tenses: { verb: "読まない", verbHiragana: "よまない", verbRomaji: "yomanai" }, error: null},
        pastNegative: {tenses: { verb: "読まなかった", verbHiragana: "よまなかった", verbRomaji: "yomanakatta" }, error: null},
    }
};

const buVerb: TestVerb = {
    verb: "学ぶ",
    verbHiragana: "まなぶ",
    verbRomaji: "manabu",
    tenses: {
        past: {tenses: { verb: "学んだ", verbHiragana: "まなんだ", verbRomaji: "mananda" }, error: null},
        negative: {tenses: { verb: "学ばない", verbHiragana: "まなばない", verbRomaji: "manabanai" }, error: null},
        pastNegative: {tenses: { verb: "学ばなかった", verbHiragana: "まなばなかった", verbRomaji: "manabanakatta" }, error: null},
    }
};

const nuVerb: TestVerb = {
    verb: "死ぬ",
    verbHiragana: "しぬ",
    verbRomaji: "shinu",
    tenses: {
        past: {tenses: { verb: "死んだ", verbHiragana: "しんだ", verbRomaji: "shinda" }, error: null},
        negative: {tenses: { verb: "死なない", verbHiragana: "しなない", verbRomaji: "shinanai" }, error: null},
        pastNegative: {tenses: { verb: "死ななかった", verbHiragana: "しななかった", verbRomaji: "shinanakatta" }, error: null},
    }
};

// ichidan verbs
const eruVerb: TestVerb = {
    verb: "食べる",
    verbHiragana: "たべる",
    verbRomaji: "taberu",
    tenses: {
        past: {tenses: { verb: "食べた", verbHiragana: "たべた", verbRomaji: "tabeta" }, error: null},
        negative: {tenses: { verb: "食べない", verbHiragana: "たべない", verbRomaji: "tabenai" }, error: null},
        pastNegative: {tenses: { verb: "食べなかった", verbHiragana: "たべなかった", verbRomaji: "tabenakatta" }, error: null},
    }
};
const iruVerb: TestVerb = {
    verb: "見る",
    verbHiragana: "みる",
    verbRomaji: "miru",
    tenses: {
        past: {tenses: { verb: "見た", verbHiragana: "みた", verbRomaji: "mita" }, error: null},
        negative: {tenses: { verb: "見ない", verbHiragana: "みない", verbRomaji: "minai" }, error: null},
        pastNegative: {tenses: { verb: "見なかった", verbHiragana: "みなかった", verbRomaji: "minakatta" }, error: null},
    }
};
 

type tenseNames = "past" | "negative" | "pastNegative"

const verbTestChunk = async (verbToTest: TestVerb, tense: tenseNames) => {
    test(`Verb ${verbToTest.verb} returns ${verbToTest.tenses[tense].tenses!.verb} in ${tense} tense`, async () => {
        const testVerb = verbToTest.verbRomaji;
        const expected = verbToTest.tenses[tense].tenses!.verb;
        const res = await request(app).get(`/verbs/${testVerb}`);
        assert.isNotEmpty(res.body); // Result body should not be empty

        const body = res.body as VerbResult[];
        console.log("body?? " + body);
        assert.isDefined(body[0]); // First result of body should not be empty

        const tenseResult = body[0].tenses[tense];
        assert.isNull(tenseResult.error);
        assert.isNotNull(tenseResult.tenses); // Tenses body should have tenses and NO error

        const actual = tenseResult.tenses.verb;
        assert.equal(actual, expected, `Actual should be ${expected}`); // Actual should match the expected
    })
}

const verbTestSuite = async (tense: tenseNames) => {
    // godan
    verbTestChunk(ruVerb, tense);
    verbTestChunk(uVerb, tense);
    verbTestChunk(tsuVerb, tense);
    verbTestChunk(suVerb, tense);
    verbTestChunk(kuVerb, tense);
    verbTestChunk(guVerb, tense);
    verbTestChunk(buVerb, tense);
    verbTestChunk(muVerb, tense);
    verbTestChunk(nuVerb, tense);

    // ichidan
    verbTestChunk(eruVerb, tense);
    verbTestChunk(iruVerb, tense);

    // irregular

}

afterAll(async () => {
    await pool.end();
})


describe("Basic test suite", () => 
{
    test("App loads 200", async () => {
        const res = await request(app).get("/verbs/");

        expect(res.status).toBe(200);
    });

    test("Querying verb database returns a non-empty array", async () => {
        const res = await request(app).get("/verbs/");

        assert.isNotEmpty(res.body);
        assert.isArray(res.body);
        expect(res.body.length).toBeGreaterThan(0);
        console.log("real length: " + res.body.length);
    });

    test("Verb miru is found", async () => {
        const res = await request(app).get("/verbs/miru");

        expect(res.status).toBe(200);
    })

    test("Searching by verb returns a JSON object of type VerbResult[]", async () => {
        const res = await request(app).get("/verbs/miru");

        assert.isNotEmpty(res.body);
        assertType<VerbResult[]>(res.body);
    })

    test("Verb miru is found when searching by hiragana", async () => {
        const res = await request(app).get("/verbs/みる?searchMode=verbHiragana");

        expect(res.status).toBe(200);
    })

    test("Nonsense query is not found", async () => {
        const res = await request(app).get("/verbs/asdf");

        expect(res.status).toBe(404);
    })
})


describe("Past tense", () => {
    verbTestSuite("past");
    // todo - add test suites for exception verbs
})

describe("Negative tense", () => {
    verbTestSuite("negative");
})

describe("Past-negative tense", () => {
    verbTestSuite("pastNegative");
})