import React from 'react';
import { RiLoaderFill } from 'react-icons/ri';

const Loading: React.FC = () => {
    return (
    <div className='loading'>
        <RiLoaderFill className='loadingIcon animate-spin animate-ping text-blue-500' />
        <p className="mt-2">Loading...</p>
    </div>
    );
};

export default Loading