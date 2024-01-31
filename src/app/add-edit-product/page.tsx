"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";

import Button from "@/components/Button";
import { Product } from "@/api/product";
import { ILocation, IType } from "@/api/models/product.interface";
import { apiUrl, imagePrefix } from "@/utils/constant";

interface IProduct {
  name: string;
  price: number;
  type: string;
  location: string;
  quantity: number;
}

const AddEditProduct = () => {
  const [product, setProduct] = useState<IProduct>({
    name: "",
    price: 0,
    type: "",
    location: "",
    quantity: 0,
  });
  const [type, setType] = useState<IType[]>([]);
  const [location, setLocation] = useState<ILocation[]>([]);
  const [img, setImg] = useState<Blob>();
  const [imagePreview, setImagePreview] = useState<string>("");

  const searchParams = useSearchParams();
  const { push } = useRouter();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      Product.getProductTypes()
        .then((res) => setType(res))
        .catch((error) => console.log(error));
      Product.getProductLocations()
        .then((res) => setLocation(res))
        .catch((error) => console.log(error));
      Product.getProductById(id)
        .then((res) => {
          setProduct({
            name: res.name,
            location: res.location.id,
            price: res.price,
            type: res.type.id,
            quantity: res.quantity,
          });
          setImagePreview(`${apiUrl}/${imagePrefix}/${res.product_image}`);
        })
        .catch((error) => console.log(error));
    }
  }, [id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.value) {
      setProduct({
        ...product,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImg(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const formData: any = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price.toString());
    formData.append("location", product.location);
    formData.append("type", product.type);
    formData.append("quantity", product.quantity.toString());
    formData.append("product_image", img);
    if (id) {
      Product.updateProduct(formData, id, true)
        .then(() => push("/"))
        .catch((error) => console.log(error));
    } else {
      Product.createProduct(formData, true)
        .then(() => push("/"))
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="flex justify-center">
      <div className="container mx-auto p-4">
        <h1 className="font-bold text-3xl mb-5">
          {id ? "Update" : "Add"} Product
        </h1>
        <form>
          <div className="grid gap-6 mb-6">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Name
              </label>
              <input
                type="text"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Product Name"
                value={product?.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Price
              </label>
              <input
                type="number"
                name="price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Product Price"
                value={product?.price}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="type"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Type
              </label>
              <select
                name="type"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={product?.type}
                onChange={handleChange}
              >
                <option>Choose a type</option>|
                {type && type.length > 0
                  ? type.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.product_type}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            <div>
              <label
                htmlFor="location"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Location
              </label>
              <select
                name="location"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={product?.location}
                onChange={handleChange}
              >
                <option value="default">Choose a location</option>
                {location && location.length > 0
                  ? location.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.location}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product quantity
              </label>
              <input
                type="number"
                name="quantity"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Product Quantity"
                value={product.quantity}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <Image
              src={imagePreview}
              alt="image-preview"
              width={100}
              height={100}
            />
          </div>
          <Button text="Submit" variant="default" onClick={handleSubmit} />
          <Button text="Cancel" variant="warning" onClick={() => push("/")} />
        </form>
      </div>
    </div>
  );
};

export default AddEditProduct;
