"use Client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

import Delete from "./Delete";
import Edit from "./Edit";
import ActionButton from "./ActionButton";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { IProduct } from "@/api/models/product.interface";
import { apiUrl, imagePrefix } from "@/utils/constant";
import { Product } from "@/api/product";

const Card = ({
  product,
  setProducts,
}: {
  product: IProduct;
  setProducts: Dispatch<SetStateAction<IProduct[]>>;
}) => {
  const { push } = useRouter();
  const [isModalOpen, setModal] = useState<boolean>(false);

  const handleProductDelete = () => {
    Product.deleteProduct(product.id)
      .then(() => {
        setModal(false);
        Product.getProducts()
          .then((res) => setProducts(res))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="bg-white rounded-lg border p-4">
        <Image
          src={`${apiUrl}/${imagePrefix}/${product.product_image}`}
          alt="Placeholder Image"
          className="w-full h-48 rounded-md object-cover"
          width={100}
          height={100}
        />
        <div className="px-1 py-2">
          <div className="font-bold text-xl mb-4">{product.name}</div>
          <div className="flex flex-col justify-between">
            <p className="text-gray-700 text-base">
              <span className="font-bold">Price:</span> ${product.price}
            </p>
            <p className="text-gray-700 text-base">
              <span className="font-bold">Location:</span>{" "}
              {product.location.location}
            </p>
            <p className="text-gray-700 text-base">
              <span className="font-bold">Type:</span>{" "}
              {product.type.product_type}
            </p>
            <p className="text-gray-700 text-base">
              <span className="font-bold">Quantity:</span>
              {product.quantity}
            </p>
          </div>
        </div>
        <div className="px-1 py-2 flex">
          <ActionButton
            onClick={() => push(`/add-edit-product/?id=${product.id}`)}
          >
            <Edit />
          </ActionButton>
          <ActionButton onClick={() => setModal(true)}>
            <Delete />
          </ActionButton>
        </div>
      </div>
      {isModalOpen ? (
        <DeleteConfirmationModal
          handleProductDelete={handleProductDelete}
          setModal={setModal}
        />
      ) : null}
    </>
  );
};

export default Card;
