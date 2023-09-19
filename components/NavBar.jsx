'use client'
import Link from "next/link"
import Logo from './Logo'
import { Navigation } from "./Navigation"
import SignNav from './SignNav'
import { useContext } from "react"
import { AuthContext } from "../utils/context/AuthProvider"
import { roles } from "../constants/constants"



const NavBar = () => {
    let navLinks = [
        {
            href: '/',
            name: 'Home'
        },
        {
            href: '/courses',
            name: 'Courses'
        },
        {
            href: '/#about',
            name: 'About'
        },
        {
            href: '/#contact',
            name: 'Contact'
        },
    ]

    const { auth } = useContext(AuthContext);
    if (auth?.roles?.includes(roles.student)) {
        navLinks = [
            ...navLinks,
            {
                href: '/my-courses',
                name: 'My Courses'
            }
        ]
    } else if (auth?.roles?.includes(roles.admin)) {
        navLinks = [
            {
                href: '/courses-management',
                name: 'Courses'
            }
        ]
    }

    return (
        <header className='w-full mb-16'>
            <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4'>
                <Link href='/'>
                    <Logo />
                </Link>
                <Navigation navLinks={navLinks} className={'flex justify-around w-2/5'} />
                <SignNav />
            </nav>
        </header>
    )
}

export default NavBar