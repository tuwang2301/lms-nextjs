'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function Navigation({ navLinks, className }) {
    const pathname = usePathname()

    return (
        <>
            <div className={className}>
                {navLinks.map((link) => {
                    const isActive = pathname === link.href
                    const className = isActive ? 'text-color-button border-b-color-button border-b-2' : 'hover:text-color-button hover:border-b-color-button hover:border-b-2 transition-all';
                    return (
                        <Link
                            className={className}
                            href={link.href}
                            key={link.name}
                        >
                            {link.name}
                        </Link>
                    )
                })}
            </div>

        </>
    )
}