import { Button, Modal } from "@heroui/react";
import { CalendarDotsIcon } from "@phosphor-icons/react";
import { Calendario } from "./Calendario";

export function ModalComponent() {
  return (
    <Modal>
      <Button
        variant="secondary"
        className="absolute top-4 right-20"
        slot="trigger"
      >
        <CalendarDotsIcon size={32} />
      </Button>
      <Modal.Backdrop variant="blur">
        <Modal.Container placement="top" size="sm" className="mt-20">
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Body>
              <Calendario />
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
