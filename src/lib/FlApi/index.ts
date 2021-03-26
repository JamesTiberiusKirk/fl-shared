import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import * as Logger from '../Logger';

enum Paths {
    TrackingPointType = '/types/',
    TrackingPoint = '/tracking/point/',
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
        let link = `${this.host}${Paths.TrackingPointType}?user_id=${userId}`;
        if (tpId) link += `&tp_id=${tpId}`;
        Logger.log('FlApi: GET '+ link);
        return axios.get(link, config);
    }

    /**
     * deleteTpsByTgId deleted all of the tp with the apropriate
     *  tgId.
     *
     * @param id of the tracking group to be deleted.
     */
    public deleteTpsByTgId(tgId: string){
        const config = {
            headers: this.authHeaders
        };
        const link = `${this.host}${Paths.TrackingPoint}?tg_id=${tgId}`;
        Logger.log('FlApi: DELETE  '+ link);
        return axios.delete(link, config);
    }

    /**
     * Set authHeaders.
     */
    public auth() {
        Logger.log('FlApi: Generating auth headers');
        this.authHeaders = this.genAuthHeaders(this.signJwt());
    }


    /**
     * Generate auth header.
     *
     * @param signedJwt jwt string.
     */
    private genAuthHeaders(signedJwt: string) {
        return {
            'access-token': signedJwt
        };
    }

    /**
     * Sign the jwt token with env variable.
     *
     * @return string of jwt.
     */
    private signJwt(): string {
        const jwtSecret = process.env.JWT_SECRET ?? '';
        const jwtPayload = {
            username: process.env.MS_NAME,
            roles: [MS_ROLE]
        }
        return jwt.sign(jwtPayload, jwtSecret);
    }
}
