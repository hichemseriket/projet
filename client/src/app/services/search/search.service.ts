import {Injectable, OnInit, ViewChild} from '@angular/core';
import {IonContent, LoadingController} from '@ionic/angular';
import {Subject} from 'rxjs';
import {IApi} from '../../../../../core/IApi';
import {ApiService} from '../api/api.service';

@Injectable({
    providedIn: 'root'
})
export class SearchService implements OnInit {

    public searchList = [] ;
    public searchListSubject = new Subject<any[]>();
    public searchValue = '';
    public loaderToShow = false;

    constructor(private apiService: ApiService) {
    }

    ngOnInit() {
    }

    /**
     * search the house and compare it to the written search
     */
    getSearchHouse() {
        this.showLoader();
        const content = {
            searchValue: this.searchValue
        };
        this.apiService.postApi( 'house', 'searchHouseList', content)
            .then((res: IApi) => {
            this.searchList = res.list;
            this.searchListSubject.next(this.searchList);
            this.hideLoader();
        } );
    }

    showLoader() {
        this.loaderToShow = true;
    }

    hideLoader() {
        setTimeout(() => {
            this.loaderToShow = false;
        }, 3000);
    }

}
