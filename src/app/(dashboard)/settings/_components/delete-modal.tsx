import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface DeleteAccountModalProps {
  open: boolean
  onClose: () => void
  onDelete: () => void
}

export function DeleteAccountModal({
  open,
  onClose,
  onDelete,
}: DeleteAccountModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg text-center font-mono p-0">
        <DialogHeader className="flex flex-col items-center gap-4 justify-center p-9">
          <div className="flex h-28 w-28 rounded-full items-center justify-center bg-red-50">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-12 w-12 text-red-600" />
          </div>
          </div>

          <DialogTitle className="text-lg font-semibold text-red-600 text-center">
            Are you sure you want to delete your account?
          </DialogTitle>

          <DialogDescription className="text-sm text-muted-foreground">
            This action is permanent and cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className=" p-9 border-t border-gray-200  bg-gray-50 flex !justify-center gap-3">
          <Button
            variant="secondary"
            onClick={onClose}
            className="w-52 !rounded-none  bg-gray-200 hover:!bg-gray-300"
          >
            Cancel
          </Button>

          <Button 
            variant="destructive"
            onClick={onDelete}
            className="w-52 !rounded-none "
          >
            Yes, delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}