import { Router } from "express";
import { Redirection } from "../model/redirection.js";
import createUniqueString from "../helpers/createUnique.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/:from", async (req, res) => {
    const redirection = await Redirection.findOne({
        where: {
            from: req.params.from
        }
    });

    if (!redirection) {
        return res.status(404).send("Redirection not found.");
    }
    res.redirect(redirection.to);
});


router.post("/api/redirection/new", auth, async (req, res) => {

    const from = req.body.from || createUniqueString(6);

    if (!req.body.to) {
        return res.status(400).send("To field is required.");
    }

    const existingRedirection = await Redirection.findOne({
        where: {
            from: from
        }
    });

    if (existingRedirection) {
        return res.status(400).send("From field is already in use.");
    }

    const redirection = await Redirection.create({
        from: from,
        to: req.body.to
    });

    res.send(redirection.toJSON());
});

export default router;