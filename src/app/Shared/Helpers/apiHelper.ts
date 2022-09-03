import { HttpClient } from '@angular/common/http';
import { SharedValueService } from '../Services/shared-value.service';

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
  }

export function setConfig(sharedService: SharedValueService,  http: HttpClient){
    return async () => {
        const configValues = (await http.get(getBaseUrl() + 'config.json').toPromise());
        sharedService.configuration = configValues as any;
    }
}