import React, { useCallback, useEffect, useState } from 'react';
import st from './test.module.css';
import { keyRandom } from '../../utils/helper';
import { Button } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useSelector } from 'react-redux';
import { defAnswer } from '../../utils/consts';
import ModalCheckRequests from './modal-check-requests';

const defaultQuestion: Quotation = {
    id: '0',
    test: '0',
    title: '0',
    img: '0',
    questions: [],
    true: 0,
    request: undefined
};

enum NextPrev {
    next = 'next',
    prev = 'prev'
}

interface IRequest {
    id: number;
    request: boolean | null;
}

const lessonsNumber = Array.from({ length: 20 }).map((e, index) => {
    return {
        id: index + 1,
        request: null
    };
});
function Test() {
    const allLess = useSelector((state: any) => state.lessons.allLessons);

    const [question, setQuestion] = useState<Quotation>(defaultQuestion);
    const [answer, setAnswer] = useState<IAnswer>(defAnswer);
    const [questionsSelected, setQuestionsSelected] = useState<Quotation[]>([]);
    const [activeQuestion, setActiveQuestion] = useState<number>(1);

    const [requests, setRequests] = useState<IRequest[]>(lessonsNumber);

    function nextPrevTest(action: string) {
        switch (action) {
            case NextPrev.next:
                setActiveQuestion(activeQuestion + 1);
                break;
            case NextPrev.prev:
                setActiveQuestion(activeQuestion - 1);
                break;
        }
    }

    useEffect(() => {
        setAnswer(defAnswer);
        const findQuestion = questionsSelected.find(
            (e) => +e.id === activeQuestion
        );
        findQuestion && setQuestion(findQuestion);
    }, [activeQuestion, questionsSelected]);

    function getRandomNumber(length: number) {
        return Math.floor(Math.random() * length);
    }

    const selectLessons = useCallback(() => {
        if (allLess) {
            const newTest: Quotation[] = [];
            allLess.forEach((cat: SelectedQuotation) => {
                const test1 = {
                    ...cat.lessons[getRandomNumber(cat.lessons.length)]
                };
                test1.id = String(newTest.length + 1);
                const test2 = {
                    ...cat.lessons[getRandomNumber(cat.lessons.length)]
                };
                test2.id = String(newTest.length + +2);
                newTest.push(test1, test2);
            });
            setQuestionsSelected(newTest);
        }
    }, [allLess]);
    //
    useEffect(() => selectLessons(), [allLess]);

    // useEffect(() => {
    //     if (questionsSelected) {
    //         const findQuestion = BinarySearch(questionsSelected.lessons, +id);
    //         findQuestion && setQuestion(findQuestion);
    //     }
    // }, [questionsSelected]);

    const getAnswerTrue = (index: number) =>
        answer.trusty && question.true === index + 1 && 'bgc-green';

    const getAnswerFalse = (index: number) =>
        answer.trusty && answer.myIndex === index && 'bgc-red';

    function changeRadios(index: number, id: number) {
        setAnswer({
            trusty: true,
            myIndex: index
        });

        const newRequest = [...requests];
        newRequest[id - 1].request = question.true === index + 1;
        setRequests(newRequest);
    }

    const checkRequest = (request: IRequest, id: number) => {
        if (request && request.id === id) {
            switch (request.request) {
                case true:
                    return 'border-success text-success';
                case false:
                    return 'border-danger text-danger';
                case null:
                    return '';
            }
        }
        return '';
    };

    const [open, setOpen] = useState<{
        open: boolean;
        requestsCount: number;
    }>({
        open: false,
        requestsCount: 0
    });

    const handleClose = () => {
        setOpen({
            open: false,
            requestsCount: 0
        });
    };

    const checkRequests = useCallback(() => {
        const _requestsCount = [...requests].reduce(
            (previousValue: number, currentValue: IRequest) =>
                currentValue.request ? previousValue + 1 : previousValue,
            0
        );

        setOpen({
            open: true,
            requestsCount: _requestsCount
        });
    }, [requests]);

    return (
        <>
            <div>
                <div className="site-content pt-4">
                    <div className={st.lessonsListTop}>
                        {questionsSelected.map(
                            (question: Quotation, index: number) => {
                                return (
                                    <Button
                                        key={keyRandom(5)}
                                        variant="outlined"
                                        onClick={() =>
                                            setActiveQuestion(+question.id)
                                        }
                                        className={`me-2 ${
                                            question.id ===
                                                String(activeQuestion) &&
                                            st.active
                                        } ${checkRequest(
                                            requests[index],
                                            +question.id
                                        )}`}>
                                        {question.id}
                                    </Button>
                                );
                            }
                        )}
                    </div>

                    <div className="d-flex justify-content-center align-items-center mt-5 position-relative">
                        {question.img ? (
                            <img
                                src={`${window.location.origin}/lessons/images/${question.img}`}
                                className={st.imgTrainingAndTest}
                                alt="Image question"
                            />
                        ) : (
                            <img
                                alt="no Image "
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/efPTwAJ2wPubXH2OQAAAABJRU5ErkJggg=="
                                width={300}
                                height={300}
                            />
                        )}
                    </div>
                    <div className="fs-4 fw-bold mt-3">{question.title}</div>

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
                                            changeRadios(index, +question.id)
                                        }
                                        label={_qt}
                                        disabled={answer.trusty}
                                    />
                                );
                            })}
                        </RadioGroup>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-5 flex-wrap flex-md-nowrap">
                        <Button
                            variant="outlined"
                            className="mb-3 mb-md-0"
                            onClick={() => window.location.reload()}>
                            Կրկին Հանձնել
                        </Button>
                        <div className="mb-3 mb-md-0">
                            <Button
                                variant="outlined"
                                className="me-2 mb-3 mb-md-0"
                                onClick={() => nextPrevTest(NextPrev.prev)}>
                                <i className="fa-solid fa-chevron-left me-2" />
                                Նախորդը
                            </Button>
                            <Button
                                variant="outlined"
                                className="me-2 mb-3 mb-md-0"
                                onClick={() => nextPrevTest(NextPrev.next)}>
                                Հաջորդը
                                <i className="fa-regular fa-chevron-right ms-2" />
                            </Button>
                            <Button
                                variant="contained"
                                className="mb-3 mb-md-0"
                                onClick={checkRequests}>
                                Պատասխանել
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <ModalCheckRequests
                requestsCount={open.requestsCount}
                open={open.open}
                handleClose={handleClose}
            />
        </>
    );
}

export default Test;
