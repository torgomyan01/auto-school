import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalDialog,
    Stack,
    TextField,
    Typography
} from '@mui/joy';
import { CreateDiscussion } from './discussions-api';

interface IProps {
    open: boolean;
    closeModal: () => void;
    calBack: (discussion: IDiscussions[]) => void;
}

function CrateDiscussions({ open, closeModal, calBack }: IProps) {
    const [loading, setLoading] = useState<boolean>(false);

    function createDiscussion(e: any) {
        e.preventDefault();
        const name = e.target.name.value;

        if (name) {
            setLoading(true);
            CreateDiscussion({
                name
            })
                .then(({ data }) => {
                    calBack(data);
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                });
        }
    }

    return (
        <Modal open={open} onClose={closeModal}>
            <ModalDialog
                aria-labelledby="basic-modal-dialog-title"
                aria-describedby="basic-modal-dialog-description"
                sx={{
                    maxWidth: 500,
                    borderRadius: 'md',
                    p: 3,
                    boxShadow: 'lg'
                }}>
                <Typography
                    id="basic-modal-dialog-title"
                    component="h2"
                    level="inherit"
                    fontSize="1.25em"
                    mb="0.25em">
                    Ստեղծել Նոր Թեմա
                </Typography>
                <Typography
                    id="basic-modal-dialog-description"
                    mt={0.5}
                    mb={2}
                    textColor="text.tertiary">
                    Ստեղծեք նոր թեմա և փորձեք գտնել ձեր հարցի պատասխանը
                </Typography>
                <form onSubmit={createDiscussion}>
                    <Stack spacing={2}>
                        <TextField
                            label="Վերնագիր"
                            name="name"
                            autoFocus
                            required
                        />
                        <Button type="submit" variant="soft" loading={loading}>
                            Ստեղծել
                        </Button>
                    </Stack>
                </form>
            </ModalDialog>
        </Modal>
    );
}

export default CrateDiscussions;
