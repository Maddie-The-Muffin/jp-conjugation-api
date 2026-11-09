import app from "./app.ts";
import {expect, test} from "vitest";
import request from "supertest"

test("App loads 200", async () => {
    const res = await request(app).get("/");

    expect(res.status).toBe(200);
})