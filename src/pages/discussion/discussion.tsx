import React, { useEffect, useState } from 'react';
import { keyRandom } from '../../utils/helper';
import {
    Alert,
    Avatar,
    CircularProgress,
    InputAdornment,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Skeleton,
    TextField
} from '@mui/material';
import { commentEmail, commentName, URL_SITE } from '../../utils/consts';
import { CreateDiscussionItem, GetDiscussion } from './discussion-api';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/hy-am';
moment().locale('hy-am');

function Discussion() {
    const { id, title } = useParams();
    const [email, setEmail] = useState<string>(
        (localStorage.getItem(commentEmail) as string) || ''
    );
    const [name, setName] = useState<string>(
        (localStorage.getItem(commentName) as string) || ''
    );

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
    const [discussionItem, setDiscussionItem] = useState<IDiscussionItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingSenMessage, setLoadingSenMessage] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            GetDiscussion(id)
                .then(({ data }) => {
                    console.log(data);
                    setDiscussionItem(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        }
    }, [id]);

    function createDiscussionItem(e: any) {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const text = e.target.text.value;

        if (name && email && text) {
            setLoadingSenMessage(true);
            CreateDiscussionItem({
                discussion_id: id,
                name,
                text,
                email
            })
                .then(({ data }) => {
                    setDiscussionItem(data);
                    setLoadingSenMessage(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    return (
        <div>
            <div className="site-content pt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <Link to={URL_SITE.DISCUSSIONS}>
                        <h6 className="fw-bold opacity-50">Քննարկումներ</h6>
                    </Link>
                </div>

                <h3>{title}</h3>
                <div>
                    <List>
                        {!loading ? (
                            discussionItem.length ? (
                                discussionItem.map(
                                    (discussion: IDiscussionItem) => {
                                        return (
                                            <ListItem
                                                key={keyRandom(5)}
                                                alignItems="flex-start">
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        {discussion.name[0]}
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={discussion.name}
                                                    secondary={
                                                        <>
                                                            {discussion.text}
                                                            <small className="d-block opacity-50">
                                                                {moment(
                                                                    discussion.created_at
                                                                ).format('LLL')}
                                                            </small>
                                                        </>
                                                    }
                                                />
                                            </ListItem>
                                        );
                                    }
                                )
                            ) : (
                                <h3 className="text-center my-5 opacity-50">
                                    Առայժմ այս հարցի վերաբերյալ քննարկումներ
                                    չկան{' '}
                                </h3>
                            )
                        ) : (
                            Array.from({ length: 6 }).map(() => (
                                <ListItem
                                    key={keyRandom(5)}
                                    alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Skeleton
                                            variant="circular"
                                            width={45}
                                            height={45}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={<Skeleton width={300} />}
                                        secondary={
                                            <>
                                                <Skeleton
                                                    width="80%"
                                                    height={10}
                                                />
                                                <Skeleton
                                                    width="60%"
                                                    height={10}
                                                />
                                                <Skeleton
                                                    width="50%"
                                                    height={10}
                                                />
                                            </>
                                        }
                                    />
                                </ListItem>
                            ))
                        )}
                    </List>
                </div>
                <div>
                    <form
                        action="#"
                        onSubmit={createDiscussionItem}
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
                            name="text"
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
                        թեմայով, որպեսզի այլ օգտողների համար կարողանանք նպաստել
                        արագ սովորելուն։ Շնորհակալություն
                    </Alert>
                </div>
            </div>
        </div>
    );
}

export default Discussion;
