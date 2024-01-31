import { Dispatch, SetStateAction } from "react";
import Button from "./Button";

const DeleteConfirmationModal = ({
  setModal,
  handleProductDelete,
}: {
  setModal: Dispatch<SetStateAction<boolean>>;
  handleProductDelete: () => void;
}) => {
  return (
    <>
      <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <p className="mb-4 text-gray-500 dark:text-gray-300">
              Are you sure you want to delete this item?
            </p>
            <div className="flex justify-center items-center space-x-4">
              <Button text="No, cancel" onClick={() => setModal(false)} />
              <Button
                text="Yes, I'm sure"
                variant="warning"
                onClick={() => handleProductDelete()}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40" />
    </>
  );
};

export default DeleteConfirmationModal;
