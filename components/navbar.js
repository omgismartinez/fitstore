import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { fetcher } from 'lib/fetcher'
import Skeleton from './skeleton'

export default function Navbar() {
    const router = useRouter()
    const [scroll, setScroll] = useState(false)
    const { status } = useSession()

    const { data } = useSWR('/api/auth/session', fetcher)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 0) {
                setScroll(true)
            } else {
                setScroll(false)
            }
        })
    }, [])

    return (
        <>
            <nav className={`fixed border-b border-transparent transition-colors duration-300 py-5 top-0 inset-x-0 z-50 
                            ${scroll ? 'scrolled ease-in' : 'ease-out'}`}>
                <div className='container lg:px-32 md:px-8 px-4 flex justify-between items-center'>
                    <Link href={'/'}>
                        <a className='flex items-center'>
                            <span className='name cursor-pointer'>
                                Fitstore
                            </span>
                        </a>
                    </Link>
                    {
                        status == 'loading' ?
                            <div className='flex items-center justify-center gap-8 sm:gap-10 md:gap-20 transition-all'>
                                <div>
                                    <Skeleton rounded='rounded-full'>
                                        <h2 className='text-gray-700 bg-gray-700 rounded-full'>
                                            pedidos
                                        </h2>
                                    </Skeleton>
                                </div>
                                <div className='md:w-24 flex justify-between items-center'>
                                    <Skeleton rounded='rounded-full' background='bg-gray-700'>
                                        <div className='w-10 h-10 m-[2px] md:m-0 bg-gray-700 rounded-full' />
                                    </Skeleton>
                                    <Skeleton rounded='rounded-full'>
                                        <div className='bg-gray-700'>
                                            <span className='md:block hidden text-gray-700'>perfil</span>
                                        </div>
                                    </Skeleton>
                                </div>
                            </div>
                            : ''
                    }
                    {
                        status === 'unauthenticated' ?
                            <Link href={'/auth/signin'}>
                                <a>
                                    <h2 className={`cursor-pointer hover:text-white hover:animate-none animate-pulse
                                            ${router.asPath == '/auth/signin' ? 'text-white animate-none' : ''}`}>
                                        inicia sesión
                                    </h2>
                                </a>
                            </Link>
                            : ''
                    }
                    {
                        status === 'authenticated' ?
                            <div className='flex items-center gap-8 sm:gap-10 md:gap-20 transition-all'>
                                {
                                    data && data.user.role === 'admin' &&
                                    <Link href={'/admin'}>
                                        <a>
                                            <h2 className={`cursor-pointer hover:text-white hover:animate-none
                                                ${router.asPath == '/admin' ? 'text-white animate-none' : ''}`}>
                                                admin
                                            </h2>
                                        </a>
                                    </Link>
                                }
                                <Link href={'/orders'}>
                                    <a>
                                        <h2 className={`cursor-pointer hover:text-white
                                            ${router.asPath == '/orders' ? 'text-white' : ''}`}>
                                            pedidos
                                        </h2>
                                    </a>
                                </Link>
                                <Link href={'/profile'}>
                                    <a>
                                        <h2 className={`cursor-pointer md:w-24 justify-between
                                            flex items-center hover:text-white ease-in
                                            ${router.asPath == '/profile'
                                                ? 'text-white' : ''}`}>
                                            <div className={`${router.asPath == '/profile'
                                                ? 'border-white rounded-full'
                                                : 'border-none md:p-0 p-[2px]'} flex items-center md:border-none border-2`}>
                                                <Image src={data.user.image} blurDataURL='#1f1d2b' placeholder='blur'
                                                    className='rounded-full' width={40} height={40} alt={'profile'} />
                                            </div>
                                            <span className='md:block hidden'>perfil</span>
                                        </h2>
                                    </a>
                                </Link>
                            </div>
                            : ''
                    }
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

                .name {
                    -webkit-mask-image: linear-gradient(
                        60deg,
                        black 25%,
                        rgba(0, 0, 0, 0.2) 50%,
                        black 75%
                    );
                    -webkit-mask-size: 400%;
                    -webkit-mask-position: 0%;
                }
                .name:hover {
                    -webkit-mask-position: 100%;
                    transition: mask-position 1s ease, -webkit-mask-position 1s ease;
                }
            `}</style>
        </>
    )
}