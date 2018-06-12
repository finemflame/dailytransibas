import React from 'react'
import Link from 'gatsby-link'

import SocialIcons from './social-icons';

import image_resume from '../../static/assets/colby-fayock-front-end-development-web-design-resume.pdf';

const Footer = () => {
    return (
        <div className="footer">

            <div className="container footer-secondary">

                <div className="content">

                    <div className="row">
                        <p>
                            Looking to refresh your web presence? <a href="mailto:hello@colbyfayock.com">Contact me now</a> for availability and pricing.
                        </p>
                    </div>

                </div>

            </div>

            <footer className="container footer-primary" role="contentinfo">

                <div className="content">

                    <div className="row">

                        <div className="footer-social">
                            <SocialIcons />
                        </div>

                        <div className="twelvecol footer-links align-center">

                            <ul className="flat-top">
                                <li>
                                    <Link to="/about">
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/all-posts">
                                        All Posts
                                    </Link>
                                </li>
                                <li>
                                    <a href={image_resume}>
                                        Resume
                                    </a>
                                </li>
                                <li>
                                    <Link to="/">
                                        &copy; Colby Fayock
                                    </Link>
                                </li>
                            </ul>

                        </div>

                    </div>

                </div>

            </footer>
        </div>
    );
};

export default Footer;