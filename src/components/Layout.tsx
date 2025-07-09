import React, { ReactNode } from 'react';
import Canvas from './Canvas';
import landscapeImage from '../background.jpg';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Canvas />
      <main className="main">
        {children}
      </main>
      <footer className="footer">
        <ul className="left">
          <li>
            <a href='https://github.com/DearthFunk' target="_blank">
              Github
            </a>
          </li>
          <li>
            <a href='https://www.youtube.com/channel/UCjqaaKr5_B3-WgbfdIszlgA' target="_blank">
              Youtube
            </a>
          </li>
          <li>
            <a href='https://soundcloud.com/dearthfunk' target="_blank">
              SoundCloud
            </a>
          </li>
        </ul>
        <ul className="right">
          <li>
            <a href="mailto:dearthfunk@gmail.com">dearthfunk@gmail.com</a>
          </li>
        </ul>
      </footer>
      <div className="background">
        <img className="layerone" src={landscapeImage} />
        <img className="layertwo" src={landscapeImage} />
      </div>
    </div>
  );
};

export default Layout;
