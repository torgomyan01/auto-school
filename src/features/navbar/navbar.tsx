import React, { useEffect, useState } from 'react';
import st from './navbar.module.css';
import { commentEmail, URL_SITE } from '../../utils/consts';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { keyRandom } from '../../utils/helper';
import logo from '../../access/images/logo.svg';
import logoMobile from '../../access/images/logo-mobile.svg';

const MENU_SITE = [
    {
        name: 'Գլխաոր',
        url: URL_SITE.HOME,
        icon: <i className="fa-solid fa-house-user me-2" />
    },
    {
        name: 'Ուսուցում',
        url: URL_SITE.TRAINING,
        icon: <i className="fa-duotone fa-graduation-cap me-2" />
    },
    {
        name: 'Հանձնել քննություն',
        url: URL_SITE.TEST,
        icon: <i className="fa-brands fa-steam-symbol me-2" />
    },
    {
        name: 'Քննարկումներ',
        url: URL_SITE.DISCUSSIONS,
        icon: <i className="fa-regular fa-message-arrow-up-right me-2" />
    },
    {
        name: 'Վիդեոդասեր',
        url: URL_SITE.VIDEO_COURSES,
        icon: <i className="fa-light fa-video-arrow-up-right me-2" />
    }
    // {
    //     name: 'Քննության Մասնակցելու Կարգը',
    //     url: URL_SITE.PARTICIPATING,
    //     icon: <i className="fa-solid fa-arrow-up-wide-short me-2" />
    // }
];

function Navbar() {
    const location = useLocation();
    const locationName = location.pathname.split('/')[1];
    const email = localStorage.getItem(commentEmail);

    // window.addEventListener('resize', function (e: any) {
    //     console.log(e.target.innerWidth);
    // });

    const [mobileMenu, setMobileMenu] = useState<boolean>(true);

    useEffect(() => {
        const siteContent = document.querySelector('.site-content');
        if (window.innerWidth < 576) {
            if (mobileMenu) {
                siteContent?.classList.remove('max');
            } else {
                siteContent?.classList.add('max');
            }
        }
    }, [mobileMenu, location]);

    function openCloseModal() {
        setMobileMenu(!mobileMenu);
    }

    return (
        <>
            <div
                className={st.mobileMenu}
                onClick={openCloseModal}
                style={{
                    left: mobileMenu ? 72 : 10
                }}>
                {mobileMenu ? (
                    <i className="fa-regular fa-xmark" />
                ) : (
                    <i className="fa-regular fa-bars" />
                )}
            </div>
            <div
                className={st.menu_site}
                style={{
                    left: mobileMenu ? 0 : -80
                }}>
                <Link to={URL_SITE.HOME}>
                    <div className={st.title}>
                        {/*<span>AUTO-SCHOOL.AM</span>*/}
                        <img
                            src={logo}
                            alt="Logo Site"
                            width={200}
                            className="d-none d-md-block m-auto"
                        />
                        <img
                            src={logoMobile}
                            alt="Logo Site"
                            width="80%"
                            className="d-inline-block d-md-none"
                        />
                    </div>
                </Link>
                {email && (
                    <div className="justify-content-center align-items-center my-3 d-none d-md-flex">
                        <a
                            href="mailto:and.torogmyan01@gmail.com"
                            className="c-blue text-decoration-underline">
                            {email}
                        </a>
                    </div>
                )}

                {MENU_SITE.map(
                    (_menu: { url: string; name: string; icon: any }) => {
                        return (
                            <div
                                key={keyRandom(5)}
                                className="d-flex justify-content-start align-items-center border-bottom py-3 ps-4">
                                <NavLink
                                    to={
                                        _menu.url === URL_SITE.TRAINING
                                            ? `${URL_SITE.TRAINING}/1/1`
                                            : _menu.url
                                    }
                                    className={`${
                                        locationName &&
                                        _menu.url.includes(locationName)
                                            ? 'fw-bold c-blue bg-gradient'
                                            : 'c-blue'
                                    } w-100 d-flex justify-content-between pe-3 align-items-center`}>
                                    <span>
                                        {_menu.icon}
                                        <span className="d-none d-md-inline-block">
                                            {_menu.name}
                                        </span>
                                    </span>
                                </NavLink>
                            </div>
                        );
                    }
                )}
            </div>
        </>
    );
}

export default Navbar;
