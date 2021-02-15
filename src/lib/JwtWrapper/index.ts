import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import * as Logger from '../Logger';

export enum JwtStatus {
    JwtExpired = 'Jwt Expired',
    JwtInvalid = 'Jwt Invalid',
    JwtMissing = 'Jwt Missing',
    JwtIsValid = 'JWT is Valid',
}

export interface JwtPayload {
    id: string,
    username: string,
    email: string,
    roles: string[],
    exp: number,
    iss: string,
}

/**
 * Express middleware to authenticate the user and pass the jwt
 *   payload to next function.
 * @param req
 * @param res
 * @param next
 */
export function microserviceAuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const uJwt = req.header('access-token');
    if (!uJwt) return res.status(401).send(JwtStatus.JwtMissing);

    const result = decodeJwt(uJwt);

    if (!(result instanceof Error) && (result.roles[0] === 'microservice')) return next();

    return res.status(401).send(result);
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const uJwt = req.header('access-token');
    if (!uJwt) return res.status(401).send(JwtStatus.JwtMissing);

    const result = decodeJwt(uJwt);

    if (!(result instanceof Error)) {
        res.locals.jwtPayload = result;
        return next();
    }

    return res.status(401).send(result);
}

function decodeJwt(token: string): JwtPayload | Error {
    let jwtPayload: JwtPayload;
    const jwtSecret = process.env.JWT_SECRET ?? '';
    try {
        jwtPayload = <JwtPayload>jwt.verify(token, jwtSecret);
    } catch (error) {
        Logger.err(error);
        return error;
    }
    return jwtPayload;
}

export function signJwt(name: string): string {
    const jwtSecret = process.env.JWT_SECRET ?? '';
    const jwtPayload = {
        username: name,
        roles: ['microservice']
    }
    return jwt.sign(jwtPayload, jwtSecret);
}