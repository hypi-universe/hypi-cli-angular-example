import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProductsQueryService, UpsertMutationService } from '../../generated/graphql';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  loading!: boolean;

  products!: Observable<any>;
  productForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(0),
  });
  constructor(private productsQueryService: ProductsQueryService,
    private upsertMutationService: UpsertMutationService) { }

  ngOnInit(): void {
   this.getProducts()
  }

  getProducts(){
    this.products = this.productsQueryService
    .watch({ arcql: '*' }, { fetchPolicy: 'network-only' })
    .valueChanges.pipe(map(result => result.data.find.edges));
  }

  onSubmit() {
    console.warn('hi');
    this.upsertMutationService.mutate({
      values: {
        Product: [
          {
            title: this.productForm.get('title')?.value,
            description: this.productForm.get('description')?.value,
            price: this.productForm.get('price')?.value,
          }
        ]
      }
    }).subscribe(() => {
      this.getProducts()
    });
  }

}
