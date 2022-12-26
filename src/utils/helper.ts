import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { failureUser } from './consts';
import questions from '../lessons/lesons.json';
import { createBrowserHistory } from 'history';
import axios from 'axios';

export const history = createBrowserHistory();

axios.interceptors.request.use((config) => {
    config.url = `${process.env.REACT_APP_API_URL}${config.url}`;
    return config;
});

export const keyRandom = (length: number) => {
    let result = '';
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
};

export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto'
    }
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch'
            }
        }
    }
}));

export const updateFailureUserStorage = (
    selectedId: number,
    index: number,
    id: number,
    questionTrue: number,
    callback: (status: boolean) => void
) => {
    const FailuresUser = JSON.parse(
        localStorage.getItem(failureUser) as string
    );
    const _status = index + 1 === questionTrue;
    const checkQ = FailuresUser?.find(
        (info: {
            id: number;
            index: number;
            status: boolean;
            selectedId: number;
        }) => info.id === id && selectedId === selectedId
    );

    if (FailuresUser) {
        if (checkQ) {
            FailuresUser.forEach((e: any) => {
                if (e.id === id) {
                    e.status = _status;
                }
            });
            localStorage.setItem(failureUser, JSON.stringify(FailuresUser));
        } else {
            FailuresUser.push({
                selectedId,
                id,
                index,
                status: _status
            });
            localStorage.setItem(failureUser, JSON.stringify(FailuresUser));
        }
    } else {
        localStorage.setItem(
            failureUser,
            JSON.stringify([
                {
                    selectedId,
                    id,
                    index,
                    status: _status
                }
            ])
        );
    }

    callback(_status);
};

export const failureGetStorage = () =>
    JSON.parse(localStorage.getItem(failureUser) as string) || [];

export const getLessons = function () {
    const failures = failureGetStorage();
    const arr: any[] = [];
    questions.map((e, index: number) => {
        const NewArr: any[] = e.lessons.map((less, lessIndex) => {
            const findFail = failures.find(
                (fail: any) =>
                    fail.id === lessIndex + 1 && fail.selectedId === index + 1
            );
            return {
                ...less,
                request: findFail ? findFail.status : undefined
            };
        });
        arr.push({
            id: index + 1,
            lessons: NewArr
        });
    });

    return arr;
};

export const BinarySearch = (arr: Quotation[], val: number) => {
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
        const middle = Math.floor((start + end) / 2);

        if (+arr[middle].id < val) {
            // Search the right half
            start = middle + 1;
        } else if (+arr[middle].id > val) {
            // Search the left half
            end = middle - 1;
        } else if (+arr[middle].id === val) {
            // Found target
            return arr[middle];
        }
    }

    // Target not found
    return false;
};

export const checkFailure = (quotation: Quotation) => {
    switch (quotation.request) {
        case true:
            return 'border-success text-success';
        case false:
            return 'border-danger text-danger';
        case undefined:
            return '';
    }
};
