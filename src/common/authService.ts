// https://auth0.com/docs/quickstart/spa/vuejs/01-login
// Other imports and WebAuth declaration..
import * as auth0 from 'auth0-js';
import EventEmitter from 'eventemitter3';
import debug from 'debug';

const localStorageKey = 'auth:loggedIn';
const loginEvent = 'loginEvent';

const log = debug('lastprice:auth-service');

const domain = process.env.VUE_APP_AUTH0_DOMAIN;
if (!domain) console.warn('process.env.VUE_APP_AUTH0_DOMAIN not set!');
const clientID = process.env.VUE_APP_AUTH0_CLIENT_ID;
if (!clientID) console.warn('process.env.VUE_APP_AUTH0_CLIENT_ID not set!');

const host = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`;
const redirectUri = `${host}/callback`;
const returnTo = `${host}/`;

export class AuthService extends EventEmitter {
    private idToken: string | null = null;
    public profile: any = null;
    private tokenExpiry: Date | null = null;

    private auth0: auth0.WebAuth;
    constructor() {
        super();
        log('creating auth0..');
        if (!domain) throw new Error('process.env.VUE_APP_AUTH0_DOMAIN not set!');
        if (!clientID) throw new Error('process.env.VUE_APP_AUTH0_CLIENT_ID not set!');
        const config = {
            domain: domain,
            clientID: clientID,
            redirectUri: redirectUri,
            responseType: 'id_token',
            scope: 'openid profile email'
        };
        log(config);
        this.auth0 = new auth0.WebAuth(config);
    }

    public login() {
        this.auth0.authorize();
    }

    public logout() {
        localStorage.removeItem(localStorageKey);

        this.idToken = null;
        this.tokenExpiry = null;
        this.profile = null;

        this.auth0.logout({ clientID: clientID, returnTo: returnTo });
    }

    public handleAuthentication() {
        log('handleAuthentication');
        return new Promise((resolve, reject) => {
            this.auth0.parseHash((err, authResult) => {
                if (err) return reject(err);
                if (!authResult) return reject(new Error('auth0.parseHash unsupported/unknown state.'));
                log(authResult)
                this.localLogin(authResult);
                return resolve(authResult.idToken);
            });
        });
    }

    public renewTokens() {
        return new Promise((resolve, reject) => {
            log('renewTokens');
            if (this.idToken) return resolve();
            if (localStorage.getItem(localStorageKey) !== "true") return resolve("Not logged in");
            this.auth0.checkSession({}, (err, authResult) => {
                log(err, authResult)
                if (err) return resolve(err);
                this.localLogin(authResult);
                return resolve(authResult);
            });
        });
    }

    public isAuthenticated() {
        const tokenExpiry = this.tokenExpiry
        if (!tokenExpiry) return false;
        return (
            new Date() < tokenExpiry &&
            localStorage.getItem(localStorageKey) === "true"
        );
    }

    private localLogin(authResult: auth0.Auth0DecodedHash) {
        if (!authResult.idTokenPayload || !authResult.idToken) return console.warn('missing authResult component!');
        // Set the time that the Access Token will expire at
        this.idToken = authResult.idToken;
        this.profile = authResult.idTokenPayload;
        log(this.profile);

        // Convert the expiry time from seconds to milliseconds,
        // required by the Date constructor
        this.tokenExpiry = new Date(this.profile.exp * 1000);

        localStorage.setItem(localStorageKey, "true");
    }
}

export default new AuthService();