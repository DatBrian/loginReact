import { validationResult } from "express-validator";

class ValidateDTOMiddleware {
    constructor(dto, schema) {
        this.dto = dto;
        this.properties = schema;
    }

    async mapProperties(req) {
        const updatedBody = {};


        const properties = Object.keys(this.properties).filter(
            (key) => key !== "_id"
        );

        const body = Object.values(req.body);

        for (let i = 0; i < properties.length; i++) {
            updatedBody[properties[i]] = body[i];
        }

        console.log(updatedBody);

        return updatedBody;
    }

    validate() {
        return async (req, res, next) => {
            await Promise.all(this.dto.map((field) => field.run(req)));
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            req.body = await this.mapProperties(req);

            next();
        };
    }
}

export default ValidateDTOMiddleware;