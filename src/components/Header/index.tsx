import React from 'react';
import styled from 'styled-components';
import {Layout} from 'antd';

const {Header} = Layout;

const STATIC_LOGO =
    'https://a.trellocdn.com/prgb/dist/images/header-logo-spirit.d947df93bc055849898e.gif';
const LOADING_LOGO =
    'https://a.trellocdn.com/prgb/dist/images/header-logo-spirit-loading.87e1af770a49ce8e84e3.gif';

interface HeaderWrapperProps {
    $bgColor?: string;
}

const HeaderWrapper = styled(Header)<HeaderWrapperProps>`
    height: 44px;
    padding: 0 6px;
    display: flex;
    align-items: center;
    background: ${({$bgColor}) => $bgColor || '#056ba5'};
    border-bottom: 1px solid hsla(0, 0%, 100%, 0.16);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
`;

const LogoWrapper = styled.a`
    display: flex;
    align-items: center;
    padding: 0 6px;
    height: 32px;
    border-radius: 3px;
    margin-top: 1px;
    cursor: pointer;
    transition: background-color 200ms;

    &:hover {
        background-color: rgba(255, 255, 255, 0.3);

        & > div::before {
            background-image: url(${LOADING_LOGO});
        }
    }
`;

const Logo = styled.div`
    position: relative;
    width: 75px;
    height: 15px;
    padding: 8px 0;
    opacity: 1;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url(${STATIC_LOGO});
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        transition: background-image 300ms;
    }
`;

interface AppHeaderProps {
    bgColor?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({bgColor}) => (
    <HeaderWrapper $bgColor={bgColor}>
        <LogoWrapper href={'/board/1'} aria-label="Home">
            <Logo/>
        </LogoWrapper>
    </HeaderWrapper>
);

export default AppHeader;
