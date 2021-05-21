import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProductDetailsService } from '../product-details.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  loading!: boolean;

  // @Input() product?: any;
  product!: Observable<any>;

  constructor(private route: ActivatedRoute,
    private location: Location,
    private productDetailsService: ProductDetailsService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productDetailsService.watch({
      id: id,
    }, {
      fetchPolicy: 'network-only'
    })
      .valueChanges.pipe(map((result) => result.data));
  }

  goBack(): void {
    this.location.back();
  }

}
