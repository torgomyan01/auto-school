import React, { useEffect, useState } from 'react';
import { keyRandom } from '../../utils/helper';
import { Search, SearchIconWrapper, StyledInputBase } from '../../utils/helper';
import { Button, Skeleton } from '@mui/material';
import { AddDiscussionLike, GetAllDiscussions } from './discussions-api';
import { URL_SITE } from '../../utils/consts';
import { Link } from 'react-router-dom';
import CrateDiscussions from './crate-discussions';

function Discussions() {
    const [loading, setLoading] = useState(true);
    const [discussions, setDiscussions] = useState<IDiscussions[]>([]);
    const [discPattern, setDiscPattern] = useState<IDiscussions[]>([]);
    const [modalCreateDiscussion, setModalCreateDiscussion] = useState(false);

    useEffect(() => {
        setDiscPattern(discussions);
    }, [discussions]);

    useEffect(() => {
        GetAllDiscussions()
            .then(({ data }) => {
                setLoading(false);
                setDiscussions(data);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    }, []);

    function AddLike(id: number) {
        const likes =
            JSON.parse(localStorage.getItem('likes-discussion') as string) ||
            [];

        if (!likes.some((e: number) => e === id)) {
            localStorage.setItem(
                'likes-discussion',
                JSON.stringify([...likes, id])
            );
            AddDiscussionLike({
                id
            })
                .then(({ data }) => {
                    const newDisc = [...discussions].map(
                        (discussion: IDiscussions) =>
                            discussion.id === id ? data : discussion
                    );

                    setDiscussions(newDisc);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    function searchDiscussion(e: any) {
        const val = e.target.value;
        if (val) {
            const oldArr = [...discussions].filter((discussion: IDiscussions) =>
                discussion.name.toLowerCase().includes(val.toLowerCase())
            );
            setDiscPattern(oldArr);
        } else {
            setDiscPattern(discussions);
        }
    }

    return (
        <div>
            <div className="site-content pt-4">
                <div className="d-flex justify-content-between align-items-start mb-3 flex-column flex-md-row">
                    <h1 className="fw-bold me-2">
                        Քննարկումներ{' '}
                        <Button
                            variant="outlined"
                            onClick={() => setModalCreateDiscussion(true)}>
                            <i className="fa-solid fa-plus me-2" />
                            Ստեղծել Թեմա
                        </Button>
                    </h1>
                    <Search>
                        <SearchIconWrapper>
                            <i className="fa-solid fa-magnifying-glass" />
                        </SearchIconWrapper>
                        <StyledInputBase
                            className="border rounded-1"
                            placeholder="Որոնել…"
                            onChange={searchDiscussion}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                </div>

                {!loading
                    ? discPattern.map((discussion: IDiscussions) => {
                          return (
                              <div key={keyRandom(5)} className="c-blue">
                                  <div className="border-bottom py-2 d-flex justify-content-between">
                                      <Link
                                          className="c-blue"
                                          to={`${URL_SITE.DISCUSSION}/${discussion.id}/${discussion.name}`}>
                                          <i className="fa-regular fa-books me-2" />
                                          {discussion.name}
                                      </Link>
                                      <Button
                                          onClick={() =>
                                              AddLike(discussion.id)
                                          }>
                                          <i className="fa-solid fa-thumbs-up me-2" />
                                          {discussion.like}
                                      </Button>
                                  </div>
                              </div>
                          );
                      })
                    : Array.from({ length: 10 }).map(() => (
                          <span key={keyRandom(5)} className="c-blue">
                              <div className="border-bottom py-3 d-flex justify-content-start align-items-center">
                                  <i className="fa-regular fa-books me-2" />
                                  <div className="w-100">
                                      <Skeleton width="80%" height={10} />
                                      <Skeleton width="50%" height={10} />
                                  </div>
                              </div>
                          </span>
                      ))}
            </div>
            <CrateDiscussions
                open={modalCreateDiscussion}
                closeModal={() => setModalCreateDiscussion(false)}
                calBack={(discussions: IDiscussions[]) => {
                    setModalCreateDiscussion(false);
                    setDiscussions(discussions);
                }}
            />
        </div>
    );
}

export default Discussions;
