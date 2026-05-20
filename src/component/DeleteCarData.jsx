"use client";

import { deleteCarDataById } from "@/lib/data";
import { authClient } from "@/lib/auth-client";
import {AlertDialog, Button} from "@heroui/react";
import { useRouter } from "next/navigation";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

export function DeleteCarData ({ car }) {
    const router = useRouter();

    const handleDelete = async () => {
        const { data: tokenData } = await authClient.token();
        await deleteCarDataById(car, tokenData?.token) 
        
        toast.error('Car Details Delete Successfully')

        router.push(`/explore-car`)
    }

  return (
    <AlertDialog>
      <Button className="inline-flex h-12 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 px-6 text-sm font-semibold text-rose-500 transition hover:bg-rose-100">
        <FiTrash2 className="h-4 w-4" />
        <span>Delete</span>
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete {car.carName} This Car Details</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{car.carName}</strong> this car all details. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleDelete} slot="close" variant="danger">
                Delete Car Details
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
