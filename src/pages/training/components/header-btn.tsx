import React from 'react';
import { checkFailure, keyRandom } from '../../../utils/helper';
import { URL_SITE } from '../../../utils/consts';
import { Button } from '@mui/material';
import st from '../training.module.css';
import { Link } from 'react-router-dom';

interface Props {
    selectID: string | undefined;
    id: string | undefined;
    question: Quotation;
    onClick: any;
}

function HeaderBtn({ selectID, id, question, onClick }: Props) {
    return (
        <Link
            onClick={onClick}
            to={`${URL_SITE.TRAINING}/${selectID}/${question.id}`}>
            <Button
                variant="outlined"
                className={`me-2 ${
                    question.id === id && st.active
                } ${checkFailure(question)}`}>
                {question.id}
            </Button>
        </Link>
    );
}

export default HeaderBtn;
