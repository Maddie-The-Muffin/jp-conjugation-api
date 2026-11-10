import app from "./app.ts";
import { assert, describe, expect, test} from "vitest";
import request from "supertest"

describe("Basic test suite", () => 
{
    test("App loads 200", async () => {
        const res = await request(app).get("/");

        expect(res.status).toBe(200);
    });

    test("App returns a verb", async () => {
        const testVerb = "miru";
        const res = await request(app).get(`/verbs?verb=${testVerb}`);

        assert.isNotNull(res.body);
        assert.isNotEmpty(res.body.verb);

        const actual = res.body.verb.verbs[0].verbRomaji;
        assert.equal(actual, testVerb, "Query string should match the romaji");
    })

    test("App returns 404 when it cannot find a verb", async () => {
        const res = await request(app).get("/verbs?verb=fasdf");

        expect(res.status).toBe(404);
    })
})

describe("Correctness in tenses", () => {
    test("Verb 見る returns 見た in past tense", async () => {
        const testVerb = "miru";
        const expected = "見た"
        const res = await request(app).get(`/verbs?verb=${testVerb}`);

        const actual = res.body.verb.verbs[0].tenses.past;
        assert.equal(actual, expected, "Actual should be 見た");
    })
})