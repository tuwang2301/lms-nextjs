'use client'
import Link from "next/link"
import Logo from './Logo'
import { Navigation } from "./Navigation"
import SignNav from './SignNav'
import { useContext, useEffect } from "react"
import { AuthContext } from "../utils/context/AuthProvider"
import { roles } from "../constants/constants"
import Notification from './Notification'


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
                href: '/student/my-courses',
                name: 'My Courses'
            },
            {
                href: '/student/my-timetable',
                name: 'My Timetable'
            }
        ]
    } else if (auth?.roles?.includes(roles.admin)) {
        navLinks = [
            ...navLinks,
            {
                href: '/admin/courses-management',
                name: 'Courses-management'
            }
        ]
    } else if (auth?.roles?.includes(roles.teacher)) {
        navLinks = [
            ...navLinks,
            {
                href: '/teacher/my-courses',
                name: 'My Courses'
            },
            {
                href: '/teacher/my-timetable',
                name: 'My Timetable'
            }
        ]
    }

    return (
        <header className='w-full mb-16'>
            <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4'>
                <Notification />
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