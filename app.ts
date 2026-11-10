import express, { type Express, type Request, type Response } from 'express'
import { AllVerbs, containsVerb } from './data.ts';

const app: Express = express();

app.get("/", (req, res) => {
    res.json({message: "Good job!!!!"});
})

// request a verb, in romaji ("/verbs?verb=miru")
// should return basic conjugations
// success response should be 200 w verb body
// failure response should be 404 with an error

/*
what to do for queries with many possible results (eg kaeru)?
return an array of matches
*/
app.get("/verbs", (req, res) => {
    const queryVerb = req.query.verb as string ?? "";
    
    const result = containsVerb(queryVerb);
    if (result.error === null)
        res.json({verb: result})
    else
        return res.status(404).json({error: `Verb ${queryVerb} not found`});
})

export default app;