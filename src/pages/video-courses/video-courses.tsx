import React, { useEffect, useState } from 'react';
import st from './video-courses.module.css';
import {
    keyRandom,
    Search,
    SearchIconWrapper,
    StyledInputBase
} from '../../utils/helper';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Pagination,
    Skeleton
} from '@mui/material';
import { GetAllVideoCurses } from './video-courses-api';
import { myViews } from '../../utils/consts';

const videoCounts = 12;
function VideoCurses() {
    const [viewVideo, setViewVideo] = useState<{
        open: boolean;
        video: VideoCurs | null;
    }>({
        open: false,
        video: null
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [myAllViews, setMyAllViews] = useState<any[]>(
        JSON.parse(localStorage.getItem(myViews) as string) || []
    );
    const [page, setPage] = useState<number>(1);
    const [paginationCurses, setPaginationCurses] = useState<VideoCurs[]>([]);
    const [videos, setVideos] = useState<VideoCurs[]>([]);

    useEffect(() => getSelectedVideo(), [videos, page]);

    function getSelectedVideo() {
        setPaginationCurses(
            videoCounts < videos.length
                ? videos.slice(
                      videoCounts * (page - 1),
                      videoCounts * (page - 1) + videoCounts
                  )
                : videos
        );
    }

    useEffect(() => {
        GetAllVideoCurses()
            .then(({ data }) => {
                setVideos(data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleClickOpen = (video: VideoCurs) => {
        const allViews =
            JSON.parse(localStorage.getItem(myViews) as string) || [];

        if (!allViews.some((id: string | number) => id === video.id)) {
            allViews.push(video.id);
            setMyAllViews(allViews);
            localStorage.setItem(myViews, JSON.stringify(allViews));
        }

        setViewVideo({
            open: true,
            video
        });
    };

    const handleClose = () => {
        setViewVideo({
            open: false,
            video: null
        });
    };

    function changePagination(e: any, page: any) {
        setPage(page);
    }

    function searchVideo(e: any) {
        console.log(e);
        const value = e.target.value;
        if (value) {
            setPaginationCurses(
                videos.filter((video: VideoCurs) =>
                    video.title.toLowerCase().includes(value.toLowerCase())
                ) || []
            );
        } else {
            getSelectedVideo();
        }
    }

    return (
        <div>
            <div className="site-content pt-4">
                <div className="container-fluid">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h1 className="fw-bold me-2">Վիդեոդասեր</h1>
                        <Search>
                            <SearchIconWrapper>
                                <i className="fa-solid fa-magnifying-glass" />
                            </SearchIconWrapper>
                            <StyledInputBase
                                className="border rounded-1"
                                placeholder="Որոնել…"
                                onChange={searchVideo}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </div>

                    <div className="row">
                        {paginationCurses.length
                            ? paginationCurses.map((video: VideoCurs) => {
                                  return (
                                      <div
                                          key={keyRandom(5)}
                                          className="col-12 col-md-6 col-xl-4 col-xxl-3">
                                          <div
                                              className={st.videoBlock}
                                              onClick={() =>
                                                  handleClickOpen(video)
                                              }>
                                              <div
                                                  className={st.imgBlock}
                                                  style={{
                                                      backgroundImage: `url(https://i.ytimg.com/vi/${video.url}/hq720.jpg)`
                                                  }}>
                                                  <i
                                                      className={`fa-solid fa-circle-play ${st.Icon}`}
                                                  />
                                                  {myAllViews.includes(
                                                      video.id
                                                  ) && (
                                                      <div
                                                          className={st.viewed}
                                                      />
                                                  )}
                                              </div>
                                              <p className="mt-2 text-black">
                                                  {video.title}
                                              </p>
                                          </div>
                                      </div>
                                  );
                              })
                            : !loading && (
                                  <h1 className="text-center mt-5">
                                      Վիդեոդաս չի գտնվել
                                  </h1>
                              )}
                        {loading &&
                            Array.from({ length: 6 }).map(() => (
                                <div
                                    key={keyRandom(5)}
                                    className="col-12 col-md-6 col-xl-4 col-xxl-3 mb-3">
                                    <Skeleton
                                        variant="rounded"
                                        width="100%"
                                        height={150}
                                    />
                                    <Skeleton />
                                    <Skeleton width="60%" />
                                </div>
                            ))}
                    </div>
                    {videos.length / videoCounts >= 1 && (
                        <div className="d-flex justify-content-center align-items-center mt-4">
                            <Pagination
                                page={page}
                                count={
                                    Math.round(videos.length / videoCounts) + 1
                                }
                                onChange={changePagination}
                                variant="outlined"
                                color="primary"
                            />
                        </div>
                    )}
                </div>
                <Dialog
                    open={viewVideo.open}
                    onClose={handleClose}
                    maxWidth="md"
                    fullWidth>
                    <DialogTitle>{viewVideo.video?.title}</DialogTitle>
                    <DialogContent>
                        <iframe
                            width="100%"
                            height={400}
                            src={`https://www.youtube.com/embed/${viewVideo.video?.url}`}
                            title={viewVideo.video?.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Փակել</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default VideoCurses;
