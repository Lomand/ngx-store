import { WebStorageService } from './webstorage.service';
import { sessionStorageUtility } from '../utility';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import { NgxStorageEvent } from '../utility/storage/storage-event';

@Injectable()
export class SessionStorageService extends WebStorageService {
    public static keys: Array<string> = [];

    constructor() {
        super(sessionStorageUtility);
        this._changes = Observable.fromEvent<NgxStorageEvent>(window, 'storage')
            .filter((event: NgxStorageEvent) => event.storageArea === sessionStorage)
            .map((event) => {
                Object.defineProperty(event, 'type', {
                    configurable: false,
                    writable: false,
                    enumerable: true,
                    value: sessionStorageUtility.getStorageName(),
                });
                return event;
            }).merge(sessionStorageUtility.changes);
    }
}
