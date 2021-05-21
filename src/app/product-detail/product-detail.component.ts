import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProductDetailsQuery, ProductDetailsQueryService } from '../../generated/graphql';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  loading!: boolean;

  product!: Observable<any>;

  constructor(private route: ActivatedRoute,
    private location: Location,
    private productDetailsQueryService: ProductDetailsQueryService) { }

  ngOnInit(): void {
    // const id = this.route.snapshot.paramMap.get('id');
    const id: string = this.route.snapshot.paramMap.get('id') ?? ''
    this.product = this.productDetailsQueryService
      .watch({ id: id }, { fetchPolicy: 'network-only' })
      .valueChanges.pipe(map(result => result.data.get));
  }

  goBack(): void {
    this.location.back();
  }

}
