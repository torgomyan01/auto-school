import React from 'react';
import {
    Avatar,
    Button,
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

const iconsSoc = [
    {
        icon: (
            <i
                className="fa-brands fa-square-facebook"
                style={{
                    color: '#1877f2'
                }}
            />
        ),
        url: '#'
    },
    {
        icon: <i className="fa-brands fa-vk" style={{ color: '#45668e' }} />,
        url: '#'
    },
    {
        icon: (
            <i className="fa-brands fa-linkedin" style={{ color: '#0077b5' }} />
        ),
        url: '#'
    },
    {
        icon: (
            <i
                className="fa-brands fa-square-odnoklassniki"
                style={{ color: '#ed812b' }}
            />
        ),
        url: '#'
    }
];

function ModalShareSites({ handleClose, open }: Props) {
    return (
        <Dialog
            onClose={handleClose}
            open={open}
            style={{ backdropFilter: 'blur(5px)' }}>
            <DialogTitle>Տարածել Սոց Կայքերում</DialogTitle>
            <div className="d-flex justify-content-center align-items-center mt-2 mb-4">
                {iconsSoc.map((e) => {
                    return (
                        <a
                            className="fs-1 mx-2"
                            key={keyRandom(5)}
                            href={e.url}>
                            {e.icon}
                        </a>
                    );
                })}
            </div>
            <div className="d-flex justify-content-center align-items-center mb-3">
                <Button variant="outlined" onClick={handleClose}>
                    Փակել
                </Button>
            </div>
        </Dialog>
    );
}

export default ModalShareSites;
