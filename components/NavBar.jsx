'use client'
import Link from "next/link"
import Logo from './Logo'
import { Navigation } from "./Navigation"
import SignNav from './SignNav'

const navLinks = [
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

const NavBar = () => {

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