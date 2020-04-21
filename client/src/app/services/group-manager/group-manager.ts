import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class GroupManager {
    name: string;
    validate: boolean;
    suggest: boolean;
    administrate: boolean;

}
