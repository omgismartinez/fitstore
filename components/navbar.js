import Link from 'next/link'
import IconProfile from './icon'
import { useState, useEffect } from 'react';

export default function Navbar() {

    const [scroll, setScroll] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 0) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        });
    }, []);

    return (
        <>
            <nav className={`fixed border-b border-transparent transition-colors duration-300 py-5 top-0 inset-x-0 z-50 ${scroll ? 'scrolled ease-in' : 'ease-out'}`}>
                <div className="container lg:px-32 md:px-12 px-8 flex justify-between items-center bg-transparent">
                    <a href="/" className="flex items-center">
                        <Link href={"/"}>
                            <span className='name cursor-pointer'>
                                Fitstore
                            </span>
                        </Link>
                    </a>
                    <div className='flex items-center bg-transparent'>
                        <Link href={'/orders'}>
                            <h2 className='cursor-pointer mx-5 md:mx-10 bg-transparent'>
                                pedidos
                            </h2>
                        </Link>
                        <Link href={"/profile"}>
                            <h2 className='cursor-pointer md:w-24 justify-between ml-5 md:ml-10 flex items-center bg-transparent'>
                                <IconProfile />
                                <span className='md:block hidden bg-transparent'>perfil</span>
                            </h2>
                        </Link>
                    </div>
                </div>
            </nav>
            <style jsx>{`
                nav {
                    height: 83px;
                    display:flex;
                    align-items: center;
                    justify-content: center;
                }

                .container {
                    height: 42px;
                }

                .scrolled {
                    border-color: rgb(255, 255, 255, .1);
                    background-color: rgb(5, 5, 5, .5);
                    backdrop-filter: blur(4px);
                }

                .name {
                    font-weight: 800;
                    font-size: 24px;
                    line-height: 29px;

                    text-transform: uppercase;

                    background: linear-gradient(93.51deg, #3081ED 41.98%, #9B51E0 99.18%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-fill-color: transparent;
                }
            `}</style>
        </>
    )
}