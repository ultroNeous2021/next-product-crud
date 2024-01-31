"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import { Product } from "@/api/product";
import { IProduct } from "@/api/models/product.interface";

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { push } = useRouter();
  useEffect(() => {
    Product.getProducts()
      .then((res) => setProducts(res))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="flex justify-center">
      <div className="container mx-auto p-4">
        <Button text="Add" onClick={() => push("/add-edit-product")} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {products && products.length > 0
            ? products.map((p) => (
                <Card key={p.id} setProducts={setProducts} product={p} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
