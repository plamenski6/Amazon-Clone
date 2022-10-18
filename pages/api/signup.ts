import type { NextApiRequest, NextApiResponse } from "next";
import debugFactory from "debug";
import * as yup from "yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";

const debug = debugFactory("SIGNUP_API");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const schema = yup.object().shape({
        username: yup.string().required().min(2),
        email: yup
            .string()
            .email()
            .required()
            .matches(/([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,10})/, { excludeEmptyString: true }),
        password: yup.string().required().min(6),
    });

    const isValid = await schema.isValid(req.body);

    if (!isValid) {
        return res.status(400).json({ message: "Wrong email / password" });
    }

    let response;
    try {
        response = await createUserWithEmailAndPassword(auth, req.body.email, req.body.password);
    } catch (err: any) {
        debug(err.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }

    if (response) {
        try {
            await updateProfile(response.user, {
                displayName: req.body.username,
            });
            return res.status(200).json({ message: "Success" });
        } catch (err: any) {
            debug(err.message);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default handler;
