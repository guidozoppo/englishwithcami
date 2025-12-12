import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    slot: { start: Date; end: Date } | null;
    onConfirm: (slot: { start: Date; end: Date; description: string }) => void;
    availableHours: string[];
}

export default function BookingModal({
    isOpen,
    onClose,
    slot,
    onConfirm,
    availableHours,
}: Props) {
    const [selectedTime, setSelectedTime] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        setSelectedTime("");
        setDescription("");
    }, [slot]);

    if (!slot) return null;

    const isMonthView =
        slot.start.getHours() === 0 && slot.end.getHours() === 0;

    const handleConfirm = () => {
        let start = new Date(slot.start);
        let end = new Date(slot.end);

        if (isMonthView) {
            if (!selectedTime)
                return alert("Debes elegir un horario disponible.");

            const [h, m] = selectedTime.split(":").map(Number);
            start.setHours(h, m);
            end = new Date(start.getTime() + 60 * 60 * 1000); // 1 hora
        }

        onConfirm({
            start,
            end,
            description: description.trim(),
        });

        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reservar turno</DialogTitle>
                    <DialogDescription>
                        Fecha: <b>{slot.start.toLocaleDateString("es-AR")}</b>
                    </DialogDescription>
                </DialogHeader>

                {/* Horarios solo en vista mensual */}
                {isMonthView && (
                    <div className="my-2">
                        <label className="font-medium">Horario disponible:</label>

                        {availableHours.length === 0 ? (
                            <p className="text-red-600 mt-2">
                                No hay horarios disponibles este día.
                            </p>
                        ) : (
                            <select
                                className="mt-2 p-2 border rounded w-full"
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                            >
                                <option value="">Seleccionar...</option>
                                {availableHours.map((h) => (
                                    <option key={h} value={h}>
                                        {h}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                )}

                {/* Descripción */}
                <div className="mt-4">
                    <label className="font-medium">Descripción del turno:</label>
                    <textarea
                        className="border w-full p-2 mt-1 rounded"
                        rows={3}
                        placeholder="Ej: Clase de speaking, nivel B1..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirm}>Confirmar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
