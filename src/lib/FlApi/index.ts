import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import * as Logger from '../Logger';

enum Paths {
    GetTypesForUser = '/types/'
};


const MS_ROLE = 'microservice';

/**
 * FlApi class for communicating with internal FL micro services.
 */
export default class FlApi {

    private authHeaders: object;
    private host: string;

    constructor(host: string) {
        Logger.log('FlApi: Generating auth headers');
        this.authHeaders = this.genAuthHeaders(this.signJwt());
        this.host = host;
    }

    /**
     * getUserType performs request to get the types of a user.
     * @param userId the user id of the user to request.
     * @param tpId (optional) the id for the tp type requested.
     */
    public getUserType(userId: string, tpId ? : string) {
        const config = {
            headers: this.authHeaders
        };
        let link = `${this.host}${Paths.GetTypesForUser}?user_id=${userId}`;
        if (tpId) link += `&tp_id=${tpId}`;
        Logger.log('FlApi: '+ link);
        return axios.get(link, config);
    }

    public auth() {
        Logger.log('FlApi: Generating auth headers');
        this.authHeaders = this.genAuthHeaders(this.signJwt());
    }

    private genAuthHeaders(signedJwt: string) {
        return {
            'access-token': signedJwt
        };
    }

    private signJwt(): string {
        const jwtSecret = process.env.JWT_SECRET ?? '';
        const jwtPayload = {
            username: process.env.MS_NAME,
            roles: [MS_ROLE]
        }
        return jwt.sign(jwtPayload, jwtSecret);
    }
}
