import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function ProfileMenu() {
    const [isUserMenuOpen, setUserMenuOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleUserMenu = () => setUserMenuOpen(!isUserMenuOpen);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setUserMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div className="relative ml-3" ref={dropdownRef}>
            <button
                type="button"
                className={`peer relative flex rounded-full bg-gray-800 outline-none text-sm focus:outline-none  ${isUserMenuOpen ? 'ring-2 ring-white ring-offset-2 ring-offset-brand-500 ' : ''}`}
                id="user-menu-button"
                aria-expanded={isUserMenuOpen}
                aria-haspopup="true"
                onClick={toggleUserMenu}
            >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Open user menu</span>
            </button>

            <div
                className={`${
                    isUserMenuOpen ? 'translate-y-2 opacity-100 z-10' : '-translate-y-2 opacity-0 z-[-1]'
                } transition-all delay-75 absolute right-0 w-48 origin-top-right rounded-md bg-white pt-1 shadow-lg focus:outline-none`}
                role="menu"
            >
                <div>
                    <div className="px-4 py-3 border-b flex gap-1 flex-col">
                        <p className="text-sm font-semibold text-gray-500">Profile</p>
                    </div>
                </div>
                <Link to="/logout" role="menuitem" tabIndex={-1}>
                    <button className="text-danger px-4 py-3 font-bold border-t w-full text-start hover:bg-white-light/50">Log out</button>
                </Link>
            </div>
        </div>
    );
}

export default ProfileMenu;
