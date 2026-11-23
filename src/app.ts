import express, { type Express, type Request, type Response } from 'express'
import { pool } from '../db/db.ts';
import { toVerbFinalResult, toVerbQueryResult, type VerbResult, type VerbDefinition } from './format.ts';

type searchColumn = "" | "verb" | "verbHiragana" | "verbRomaji";

const app: Express = express();

app.get("/", (req, res) => {
    res.json({message: "Test - Good job!!!!"});
})

// request a verb, in romaji ("/verbs/miru")
// should return basic conjugations
// success response should be 200 w verb body
// failure response should be 404 with an error

/*
what to do for queries with many possible results (eg kaeru)?
return an array of matches
*/
app.get("/verbs", async (_req, res, next) => {
    try {
        const { rows } = await pool.query("SELECT * from verbs"); 
        if (rows.length == 0) return res.status(404).json({error: "No verbs found"});
        res.json(rows);
    }
    catch (err) {
        console.log("oh no");
    }
})

app.get("/verbs/:id", async (req, res, next) => {
    try {
        const queryVerb = req.params.id as string ?? "";
        const searchMode = req.query.searchMode as searchColumn ?? "verbRomaji";

        if (queryVerb === "") return res.status(400).json({error: "Verb query cannot be empty!"});

        const { rows } = await pool.query(`SELECT * from verbs WHERE ${searchMode} = $1`, [queryVerb]);
        if (rows.length === 0) return res.status(404).json({error: "Requested verb not found"});

        const allVerbs: VerbDefinition[] = rows.map(toVerbQueryResult);

        const allWithTenses: VerbResult[] = allVerbs.map(toVerbFinalResult);

        res.json(allWithTenses);
    }
    catch (err) {
        next(err);
    }
})

/*
app.get("/verbs", (req, res) => {
    const queryVerb = req.query.verb as string ?? "";
    
    const result = containsVerb(queryVerb);
    if (result.error === null)
        res.json({verb: result})
    else
        return res.status(404).json({error: result.error});
})*/


export default app;