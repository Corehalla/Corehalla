// Library imports
import React, { FC, useContext } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { Icon } from '@mdi/react';
import { mdiHome, mdiChevronTripleUp, mdiAccountStar, mdiHistory, mdiCog } from '@mdi/js';

// Providers imports
import { NavigationPage, NavigationContext } from '../providers/NavigationProvider';
import { Link, useLocation } from 'react-router-dom';
import { devices } from '../util/devices';
import { FavoritesContext } from '../providers/FavoritesProvider';

interface BottomNavigationTab {
    title: NavigationPage;
    link: string;
    icon: string;
}

const tabs: BottomNavigationTab[] = [
    {
        title: 'Home',
        link: '/',
        icon: mdiHome,
    },
    {
        title: 'Rankings',
        link: '/rankings',
        icon: mdiChevronTripleUp,
    },
    {
        title: 'Favorites',
        link: '/favorites',
        icon: mdiAccountStar,
    },
    {
        title: 'History',
        link: '/',
        icon: mdiHistory,
    },
    {
        title: 'Settings',
        link: '/',
        icon: mdiCog,
    },
];

const NavigationWrapper = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: stretch;
    background-color: var(--bg);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: auto;
    width: 4rem;
    z-index: 100;
    gap: 0.5rem;
    padding-top: 0.5rem;

    /* @media ${devices.desktop} {
        display: none;
    } */
`;

const NavigationItem = styled(Link)<{ active?: boolean }>`
    width: 3rem;
    min-height: 3rem;
    height: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--text-2);
    font-size: 0.75rem;
    border: 1px solid var(--bg-1);
    border-radius: 1rem;
    padding: 0.25rem;

    svg {
        fill: var(--text-2);
    }

    img {
        width: 100%;
        height: 1.5rem;
        object-fit: contain;
        object-position: center;
    }

    ${({ active }) =>
        active &&
        `
        border-color: var(--accent);
        color: var(--text);
    
        svg {
            fill: var(--text)
        }
    `}
`;

const NavSeparator = styled.hr`
    border-bottom: 1px solid var(--text-2);
    width: 1.5rem;
`;

export const SideNav: FC = () => {
    const { activePage } = useContext(NavigationContext);
    const { favorites } = useContext(FavoritesContext);
    const { pathname } = useLocation();

    if (typeof document === 'undefined') return null;
    return createPortal(
        <NavigationWrapper>
            {tabs.map(({ title, link, icon }, i) => (
                <NavigationItem to={link} key={i} active={activePage === title}>
                    <Icon path={icon} size={1} />
                </NavigationItem>
            ))}
            <NavSeparator />
            {favorites.map(({ id, type, name, thumbURI }) => (
                <NavigationItem
                    key={`${type}/${id}`}
                    to={`/stats/${type}/${id}`}
                    active={pathname === `/stats/${type}/${id}`}
                >
                    <img src={thumbURI} alt={name} />
                    <span>{name.substr(0, 3).toUpperCase()}</span>
                </NavigationItem>
            ))}
        </NavigationWrapper>,
        document.querySelector('#sidenav'),
    );
};
