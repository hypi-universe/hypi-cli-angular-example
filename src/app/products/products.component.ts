import { Component, OnInit, OnDestroy } from '@angular/core';

import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { AllProductsService } from '../all-products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  loading!: boolean;

  products!: Observable<any>;

  constructor(private allProductsService: AllProductsService) { }

  ngOnInit(): void {
    this.products = this.allProductsService.watch({
      arcql: '*',
    }, {
      fetchPolicy: 'network-only'
    })
      .valueChanges.pipe(map((result) => result.data.find.edges));
  }

}
