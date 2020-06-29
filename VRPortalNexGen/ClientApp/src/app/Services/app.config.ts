import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IAppConfig } from '../Models/app-config.model';
@Injectable()
export class AppConfig {
    static settings: IAppConfig;
    BaseUrl: any;
    jsonURL: string;
    constructor( @Inject('BASE_URL') baseUrl: string, private http: HttpClient) {
        this.BaseUrl = baseUrl;
        this.jsonURL = `assets/config/config.${environment.name}.json`;
    }
    load() {
        const jsonFile = `assets/config/config.${environment.name}.json`;
        return new Promise<void>((resolve, reject) => {
            this.http.get(jsonFile).toPromise().then((response: IAppConfig) => {
               AppConfig.settings = response as IAppConfig;
               resolve();
            }).catch((response: any) => {
               reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
            });
        });
    }
}
