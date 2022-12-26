import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@mui/material';
import sadSmil from '../../access/images/sad-smiles.png';
import mediumSmall from '../../access/images/18.png';
import mediumTwoSmall from '../../access/images/19.png';
import fullSmile from '../../access/images/20.png';

interface IProps {
    open: boolean;
    handleClose: () => void;
    requestsCount: number;
}

function ModalCheckRequests({ open, handleClose, requestsCount }: IProps) {
    function calcRequest(_req: number) {
        switch (_req) {
            case 20:
                return (
                    <div className="text-center">
                        <img src={fullSmile} alt="sad small" width={200} />
                        <h4 className="text-center c-blue mt-3">
                            Շնորհաորում ենք դուք հաջողությամբ անցել եք բոլոր
                            հարցերը
                        </h4>
                    </div>
                );
            case 19:
                return (
                    <div className="text-center">
                        <img src={mediumTwoSmall} alt="sad small" width={200} />
                        <h4 className="text-center c-blue mt-3">
                            Չեեե՜ միքիչել {_req} լավա, բայյց չհանձնվես։
                        </h4>
                    </div>
                );
            case 18:
                return (
                    <div className="text-center">
                        <img src={mediumSmall} alt="sad small" width={200} />
                        <h4 className="text-center c-blue mt-3">
                            Լավա {_req} էլ լավա, բայյց միքիչել չարչարվի։
                        </h4>
                    </div>
                );
            default:
                return (
                    <div className="text-center">
                        <img src={sadSmil} alt="sad small" width={200} />
                        <h4 className="text-center c-blue mt-3">
                            Չեեե՜ պետքա պարապես, ունես ընդամենը՝ {_req} ճիշտ
                            պատասխան
                        </h4>
                    </div>
                );
        }
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">Պատասխան</DialogTitle>
            <DialogContent>{calcRequest(requestsCount)}</DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Փակել
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModalCheckRequests;
