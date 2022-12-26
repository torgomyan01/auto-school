import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Button,
    ButtonGroup,
    Dialog,
    DialogTitle,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText
} from '@mui/material';
import { blue } from '@mui/material/colors';
import { keyRandom } from '../../utils/helper';

interface Props {
    handleClose: () => void;
    open: boolean;
}

function ModalChangeFontSize({ handleClose, open }: Props) {
    const [size, setSize] = useState<number>(16);

    useEffect(() => {
        const style: any = document.createElement('style');
        style.innerHTML = `
            html{
                font-size: ${size}px;
            }
        `;
        document.head.appendChild(style);
    }, [size]);

    function plusFontSize() {
        size < 25 && setSize(size + 1);
    }

    function minusFontSize() {
        size > 16 && setSize(size - 1);
    }
    return (
        <Dialog
            onClose={handleClose}
            open={open}
            style={{ backdropFilter: 'blur(5px)' }}>
            <DialogTitle>Փոխել տառաչափը</DialogTitle>
            <div className="d-flex justify-content-center align-items-center mt-2 mb-4">
                <ButtonGroup variant="text" aria-label="text button group">
                    <Button onClick={minusFontSize}>-</Button>
                    <Button disabled={true}>{size}px</Button>
                    <Button onClick={plusFontSize}>+</Button>
                </ButtonGroup>
            </div>
            <div className="d-flex justify-content-center align-items-center mb-3">
                <Button variant="outlined" onClick={handleClose}>
                    Փակել
                </Button>
            </div>
        </Dialog>
    );
}

export default ModalChangeFontSize;
