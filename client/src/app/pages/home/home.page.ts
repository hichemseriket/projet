import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import {ErrorManagerService} from '../../services/error-manager/error-manager.service';
import {LanguageService} from '../../services/language/language.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

    public title: string;
    public lgTrsl: any[];
    private dataLgSubscription: Subscription;

    constructor(public apiService: ApiService,
                private errMan: ErrorManagerService,
                private langueService: LanguageService) {
    }

    ngOnInit() {
       this.onRefreshLanguage();
    }

    /**
     * on language change event
     */
    onRefreshLanguage() {
        this.dataLgSubscription = this.langueService.datatLgSubject.subscribe(() => {
            this.lgTrsl = this.langueService.dataLanguage.global;
        });
    }

    ngOnDestroy() {
        this.dataLgSubscription.unsubscribe();
    }

}
