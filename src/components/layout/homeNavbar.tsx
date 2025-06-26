import Link from 'next/link'

const websiteLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
]

const websiteLinks1 = [
    { name: "Sign In", href: '/sign-in' },
    { name: "Sign Up", href: '/sign-up' }
]

export default function HomeNavbar() {

    return (
        <div className='relative w-full h-[120px] bg-[#141414] overflow-hidden'>
            <div className='absolute text-[18px] text-white-700 w-auto left-[24px] top-[44px] uppercase font-bold'>
                    <Link
                        key={'/'}
                        href={'/'}
                    >
                        LOGO
                    </Link>
            </div>
            <div className='text-[18px] text-white-700 w-[300px] mx-auto mt-[44px] flex justify-between uppercase font-bold hidden md:flex'>
                {websiteLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
            <div className='absolute text-[18px] text-white-700 w-[160px] right-[24px] top-[44px] flex justify-between uppercase font-bold'>
                {websiteLinks1.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
        </div>
    )
}