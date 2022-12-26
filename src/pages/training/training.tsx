import React, { useCallback, useEffect, useState } from 'react';
import st from './training.module.css';
import {
    BinarySearch,
    keyRandom,
    updateFailureUserStorage
} from '../../utils/helper';
import {
    Alert,
    Avatar,
    Button,
    CircularProgress,
    FormControl,
    InputAdornment,
    InputLabel,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    MenuItem,
    Select,
    Skeleton,
    TextField
} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link, useNavigate, useParams } from 'react-router-dom';

import {
    commentEmail,
    commentName,
    defAnswer,
    filterItems,
    URL_SITE
} from '../../utils/consts';
import { useSelector } from 'react-redux';
import HeaderBtn from './components/header-btn';
import { CreateCommentLesson, GetLessonComment } from './training-api';

const defaultQuestion: Quotation = {
    id: '0',
    test: '0',
    title: '0',
    img: '0',
    questions: [],
    true: 0,
    request: undefined
};

const lessonsNumber = Array.from({ length: 10 });

function Training() {
    const { selectID, id } = useParams();
    const allLess = useSelector((state: any) => state.lessons.allLessons);

    const navigate = useNavigate();
    const [faqs, setFaqs] = useState<boolean>(false);
    const [question, setQuestion] = useState<Quotation>(defaultQuestion);
    const [answer, setAnswer] = useState<IAnswer>(defAnswer);
    const [questionsSelected, setQuestionsSelected] =
        useState<SelectedQuotation>({
            id: 0,
            lessons: []
        });

    const selectLessons = useCallback(() => {
        if (selectID && allLess) {
            setQuestionsSelected(allLess.find((e: any) => e.id === +selectID));
        }
    }, [selectID, allLess]);

    const [comments, setComments] = useState<IComment[]>([]);
    const [commentsLoading, setCommentsLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>(
        (localStorage.getItem(commentEmail) as string) || ''
    );
    const [name, setName] = useState<string>(
        (localStorage.getItem(commentName) as string) || ''
    );

    useEffect(() => selectLessons(), [selectID, allLess]);

    useEffect(() => {
        if (id && questionsSelected) {
            const findQuestion = BinarySearch(questionsSelected.lessons, +id);
            findQuestion && setQuestion(findQuestion);
            startGetComment();
        }
    }, [id, questionsSelected]);

    const createDefQuotations = () => setAnswer(defAnswer);

    const getAnswerTrue = (index: number) =>
        answer.trusty && question.true === index + 1 && 'bgc-green';

    const getAnswerFalse = (index: number) =>
        answer.trusty && answer.myIndex === index && 'bgc-red';

    function changeRadios(index: number, id: number) {
        setAnswer({
            trusty: true,
            myIndex: index
        });
        if (selectID) {
            updateFailureUserStorage(
                +selectID,
                index,
                id,
                question.true,
                (status: boolean) => {
                    const changesQuestionsSelected =
                        questionsSelected.lessons.map((_qt: Quotation) => {
                            if (+_qt.id === id) {
                                const newQt = { ..._qt };
                                newQt.request = status;
                                return newQt;
                            } else {
                                return _qt;
                            }
                        });
                    if (selectID) {
                        setQuestionsSelected({
                            id: +selectID,
                            lessons: changesQuestionsSelected
                        });
                    }
                }
            );
        }
    }

    const handleChange = (event: any) => {
        const val = event.target.value;
        setFilter(filterItems[0]);
        navigate(`${URL_SITE.TRAINING}/${val}/1`);
        createDefQuotations();
    };

    const [filter, setFilter] = useState(filterItems[0]);
    function filterQuotations(event: any) {
        const val = event.target.value;
        const oldQuestions = { ...questionsSelected };
        oldQuestions.lessons = oldQuestions.lessons.filter(
            (less) => less.request === false
        );
        switch (val) {
            case filterItems[0]:
                selectLessons();
                break;
            case filterItems[1]:
                setQuestionsSelected(oldQuestions);
                break;
        }
        setFilter(val);
    }

    const [loadingSenMessage, setLoadingSenMessage] = useState<boolean>(false);
    function createComment(e: any) {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const comment = e.target.comment.value;

        if (name && email && comment) {
            setLoadingSenMessage(true);
            CreateCommentLesson({
                cat_id: selectID,
                lesson_id: id,
                name,
                email,
                comment
            })
                .then(({ data }) => {
                    setLoadingSenMessage(false);
                    setComments(data);
                })
                .catch((err) => {
                    setLoadingSenMessage(false);
                    console.log(err);
                });
        }
    }

    function openComments() {
        setFaqs(!faqs);
        if (!faqs && selectID && id) {
            startGetComment();
        }
    }

    function startGetComment() {
        if (selectID && id) {
            setCommentsLoading(true);
            GetLessonComment(selectID, id)
                .then(({ data }) => {
                    setComments(data);
                    setCommentsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    function changeEmail(e: any) {
        const value = e.target.value;
        setEmail(value);
        localStorage.setItem(commentEmail, value);
    }

    function changeName(e: any) {
        const value = e.target.value;
        setName(value);
        localStorage.setItem(commentName, value);
    }

    return (
        <div>
            <div className="site-content pt-4">
                <div className="d-flex justify-content-between align-items-start">
                    <div className="fs-5 fw-bold d-none d-md-block">N{id}</div>
                    <div>
                        <FormControl className="me-2 mb-3 mb-md-0">
                            <InputLabel id="demo-simple-filter-label">
                                <i className="fa-sharp fa-solid fa-bars-filter" />
                            </InputLabel>
                            <Select
                                label="setting-number"
                                value={filter}
                                onChange={filterQuotations}>
                                {filterItems.map((e) => (
                                    <MenuItem key={keyRandom(5)} value={e}>
                                        {e}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel id="demo-simple-select-label">
                                Հարցաշարեր
                            </InputLabel>
                            <Select
                                value={selectID}
                                label="setting-number"
                                onChange={handleChange}>
                                {lessonsNumber.map((_n, index) => {
                                    return (
                                        <MenuItem
                                            key={keyRandom(5)}
                                            value={index + 1}>
                                            Հարցաշար {index + 1}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <div className={st.lessonsListTop}>
                    {questionsSelected.lessons.length > 0 ? (
                        questionsSelected.lessons.map((question: Quotation) => {
                            return (
                                <HeaderBtn
                                    key={keyRandom(20)}
                                    id={id}
                                    selectID={selectID}
                                    question={question}
                                    onClick={createDefQuotations}
                                />
                            );
                        })
                    ) : (
                        <div className="text-center w-100 fs-3">
                            Դեռ սխալներ չունեք
                        </div>
                    )}
                </div>

                {questionsSelected.lessons.length > 0 && (
                    <>
                        <div className="d-flex justify-content-center align-items-center mt-5 position-relative">
                            {question.img && (
                                <img
                                    src={`${window.location.origin}/lessons/images/${question.img}`}
                                    className={st.imgTrainingAndTest}
                                    alt="Image question"
                                />
                            )}
                        </div>
                        <div className="fs-4 fw-bold mt-3">
                            {question.title}
                        </div>

                        <div className="mt-3">
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="question">
                                {question.questions.map((_qt, index) => {
                                    return (
                                        <FormControlLabel
                                            key={keyRandom(4)}
                                            value={_qt}
                                            className={`border-bottom ${getAnswerTrue(
                                                index
                                            )} ${getAnswerFalse(index)}`}
                                            control={<Radio />}
                                            onChange={() =>
                                                changeRadios(
                                                    index,
                                                    +question.id
                                                )
                                            }
                                            label={_qt}
                                            disabled={answer.trusty}
                                        />
                                    );
                                })}
                            </RadioGroup>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-5">
                            <div>
                                <Link
                                    to={`${URL_SITE.TRAINING}/${selectID}/${
                                        id
                                            ? +id > 1
                                                ? +question.id - 1
                                                : '1'
                                            : '1'
                                    }`}
                                    onClick={createDefQuotations}
                                    className="me-2">
                                    <Button variant="outlined">
                                        <i className="fa-solid fa-chevron-left me-2" />
                                        Նախորդը
                                    </Button>
                                </Link>
                                <Link
                                    to={`${URL_SITE.TRAINING}/${selectID}/${
                                        id
                                            ? +id <
                                              questionsSelected.lessons.length
                                                ? +question.id + 1
                                                : '1'
                                            : '1'
                                    }`}
                                    onClick={createDefQuotations}>
                                    <Button variant="outlined">
                                        Հաջորդը
                                        <i className="fa-regular fa-chevron-right ms-2" />
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div
                            className="d-flex justify-content-start align-items-center mt-5 fs-3 fw-bold cursor-pointer"
                            onClick={openComments}>
                            Քննարկիր հարցը
                            <i
                                className="fa-solid fa-angle-down ms-2 mt-2 trans"
                                style={{
                                    transform: `rotate(${faqs ? '-180' : 0}deg)`
                                }}
                            />
                        </div>
                    </>
                )}

                {faqs && (
                    <>
                        <div className="mt-3">
                            {!commentsLoading ? (
                                comments.length ? (
                                    comments.map((comment: IComment) => {
                                        return (
                                            <List key={keyRandom(5)}>
                                                <ListItem button>
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            {comment.name[0]}
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={comment.name}
                                                        secondary={
                                                            comment.comment
                                                        }
                                                    />
                                                </ListItem>
                                            </List>
                                        );
                                    })
                                ) : (
                                    <h3 className="text-center my-5 opacity-75">
                                        Առայժմ այս հարցի վերաբերյալ քննարկումներ
                                        չկան
                                    </h3>
                                )
                            ) : (
                                Array.from({ length: 5 }).map(() => (
                                    <div
                                        key={keyRandom(5)}
                                        className="d-flex justify-content-start mb-3">
                                        <Skeleton
                                            variant="circular"
                                            width={50}
                                            height={50}
                                        />
                                        <div className="ms-2 w-100">
                                            <Skeleton width="30%" />
                                            <Skeleton width="80%" height={8} />
                                            <Skeleton width="70%" height={8} />
                                            <Skeleton width="50%" height={8} />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <form
                            action="#"
                            onSubmit={createComment}
                            className="mt-3 mb-2 border p-3 rounded-1">
                            <div className="row d-flex justify-content-between">
                                <div className="col-6 mb-3">
                                    <TextField
                                        label="Անուն"
                                        name="name"
                                        value={name}
                                        onChange={changeName}
                                        required
                                        className="w-100"
                                        variant="outlined"
                                    />
                                </div>
                                <div className="col-6">
                                    <TextField
                                        type="email"
                                        label="Email հասցե (Չի ցուցադրվելու)"
                                        value={email}
                                        onChange={changeEmail}
                                        name="email"
                                        required
                                        className="w-100"
                                        variant="outlined"
                                    />
                                </div>
                            </div>
                            <TextField
                                label="Քննարկիր"
                                name="comment"
                                required
                                variant="outlined"
                                className="w-100"
                                multiline
                                rows={3}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {loadingSenMessage ? (
                                                <CircularProgress size={20} />
                                            ) : (
                                                <button
                                                    type="submit"
                                                    className="btn">
                                                    Ավելացնել
                                                </button>
                                            )}
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </form>
                        <Alert severity="warning" className="mb-5">
                            Հարգելի օգտատեր խնդրում ենք պահպանեք կայքի կանոները,
                            չոգտագործել ոչ պարկեշտ բառեր, չոգտագործել գովազդներ,
                            կայքի անուներ, և շպվել միայն այս հարցին վերաբրող
                            թեմայով, որպեսզի այլ օգտողների համար կարողանանք
                            նպաստել արագ սովորելուն։ Շնորհակալություն
                        </Alert>
                    </>
                )}
            </div>
        </div>
    );
}

export default Training;
