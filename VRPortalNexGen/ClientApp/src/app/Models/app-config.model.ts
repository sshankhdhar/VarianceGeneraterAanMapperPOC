export interface IAppConfig {
    env: {
        name: string;
    };
    appInsights: {
        instrumentationKey: string;
    };
    logging: {
        console: boolean;
        appInsights: boolean;
    };
    aad: {
        requireAuth: boolean;
        tenant: string;
        clientId: string;

    };
    apiServer: {
        metadata: string;
        rules: string;
    };
    adalConfig: {
        clientId: string,
        tenant: string,
        redirectUri: string,
        postLogoutRedirectUri: string,
        cacheLocation: string,
        endpoints: {
            api: string
        }
    };
}
