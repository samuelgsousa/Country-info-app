import localFont from 'next/font/local';
import './globals.css';
import React from 'react';
import PropTypes from 'prop-types';

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header>
          <h1>Country List</h1>
        </header>
        
        {children}
      
          <footer>
      <span>
          Made by <strong>Samuel Sousa</strong>
      </span>
      
      <div>
          <a href="https://github.com/samuelgsousa" target="_blank">GitHub <img src="/icons/external-link.svg" alt="" class="external" />  <img src="/icons/github-mark.svg" alt="GitHub" id="Github"/></a> 
          <a href="https://www.linkedin.com/in/samuel-gomes-teixeira-de-sousa-5537b71b9" target="_blank">Linkedin <img src="/icons/external-link.svg" alt="Linkedin" class="external"/> <img src="/icons/linkedin.svg" alt="" /> </a> 
      </div>
      
       </footer>
      
      </body>
    </html>
  );
}
