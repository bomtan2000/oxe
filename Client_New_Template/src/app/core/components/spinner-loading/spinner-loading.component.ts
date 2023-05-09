import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'spinner-loading',
  templateUrl: './spinner-loading.component.html',
  styleUrls: ['./spinner-loading.component.scss']
})
export class SpinnerLoadingComponent implements OnInit {

  loading: boolean = false;
  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading.subscribe((v: boolean) => {
      // console.log(v);
      this.loading = v;
    });
  }

  ngOnInit(): void {
  }

}
