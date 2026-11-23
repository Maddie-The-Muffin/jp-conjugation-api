import app from "../src/app.ts";
import { pool } from "../db/db.ts";
import { afterAll, assert, assertType, describe, expect, test} from "vitest";
import request from "supertest"
import { VerbResult } from "../src/format.ts";

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


describe("Correctness in tenses - Ichidan", () => {
    test("Verb 見る returns 見た in past tense", async () => {
        const testVerb = "miru";
        const expected = "見た"
        const res = await request(app).get(`/verbs/${testVerb}`);

        assert.isNotEmpty(res.body);
        const body = res.body as VerbResult[];

        const tenseResult = body[0].tenses.past;

        assert.isNull(tenseResult.error);
        assert.isNotNull(tenseResult.tenses);
        const actual = tenseResult.tenses.verb;
        assert.equal(actual, expected, "Actual should be 見た");
    })

    
    test("Verb 見る returns 見ない in negative tense", async () => {
        const testVerb = "miru";
        const expected = "見ない";
        const res = await request(app).get(`/verbs/${testVerb}`);

        assert.isNotEmpty(res.body);
        const body = res.body as VerbResult[];

        const tenseResult = body[0].tenses.negative;

        assert.isNull(tenseResult.error);
        assert.isNotNull(tenseResult.tenses);
        const actual = tenseResult.tenses.verb;
        assert.equal(actual, expected, "Actual should be 見ない");
    })

    test("Verb 見る returns 見なかった in past-negative tense", async () => {
        const testVerb = "miru";
        const expected = "見なかった";
        const res = await request(app).get(`/verbs/${testVerb}`);

        assert.isNotEmpty(res.body);
        const body = res.body as VerbResult[];

        const tenseResult = body[0].tenses.pastNegative;

        assert.isNull(tenseResult.error);
        assert.isNotNull(tenseResult.tenses);
        const actual = tenseResult.tenses.verb;
        assert.equal(actual, expected, "Actual should be 見なかった");
    })
})