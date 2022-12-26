import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Navbar from './features/navbar/navbar';
import { URL_SITE } from './utils/consts';
import st from './app.module.css';
import Training from './pages/training/training';
import Test from './pages/test/test';
import Discussions from './pages/discussions/discussions';
import VideoCurses from './pages/video-courses/video-courses';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import ModalShareSites from './features/modal-share-socials/modal-share-sites';
import ModalChangeFontSize from './features/modal-change-font-size/modal-share-sites';
import Discussion from './pages/discussion/discussion';

function App() {
    const [openSocSite, setOpenSocSite] = useState<boolean>(false);

    function opeSocSiteModal() {
        setOpenSocSite(true);
    }

    const [openChangeText, setOpenChangeText] = useState<boolean>(false);

    function opeOpenChangeText() {
        setOpenChangeText(true);
    }

    return (
        <div>
            <Navbar />
            <div className={st.content}>
                <Routes>
                    <Route path={URL_SITE.HOME} element={<Home />} />
                    <Route
                        path={`${URL_SITE.TRAINING}/:selectID/:id`}
                        element={<Training />}
                    />
                    <Route path={URL_SITE.TEST} element={<Test />} />
                    <Route
                        path={URL_SITE.DISCUSSIONS}
                        element={<Discussions />}
                    />
                    <Route
                        path={URL_SITE.VIDEO_COURSES}
                        element={<VideoCurses />}
                    />
                    <Route
                        path={`${URL_SITE.DISCUSSION}/:id/:title`}
                        element={<Discussion />}
                    />
                </Routes>
            </div>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
                icon={<i className="fa-regular fa-gear fs-3" />}>
                <SpeedDialAction
                    icon={<i className="fa-sharp fa-solid fa-text-size" />}
                    tooltipTitle="Փոփոխել տառաչափը"
                    onClick={opeOpenChangeText}
                />
                {/*<SpeedDialAction*/}
                {/*    icon={<i className="fa-solid fa-moon" />}*/}
                {/*    tooltipTitle="Գիշերային ռեժիմ"*/}
                {/*/>*/}
                <SpeedDialAction
                    icon={<i className="fa-solid fa-share-nodes" />}
                    tooltipTitle="Տարածել"
                    onClick={opeSocSiteModal}
                />
            </SpeedDial>
            <ModalShareSites
                handleClose={() => setOpenSocSite(false)}
                open={openSocSite}
            />
            <ModalChangeFontSize
                handleClose={() => setOpenChangeText(false)}
                open={openChangeText}
            />
        </div>
    );
}

export default App;
