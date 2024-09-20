import React, { useEffect, useState } from 'react';
import CardStreamer from './CardStreamer';
import SocialNetworkStreamer from './SocialNetwordsStreamer';

const DescriptionStreamerComponent = () => {
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchDescription = async () => {
            try {
                // Solicitar 2 párrafos para obtener alrededor de 200 palabras
                const response = await fetch('https://baconipsum.com/api/?type=all-meat&paras=2&format=json');
                const data = await response.json();
                setDescription(data[0]); // El texto está en el primer elemento del array
            } catch (error) {
                console.error('Error fetching description:', error);
            }
        };

        fetchDescription();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <CardStreamer description={description} text='About me' textSize='20px' />
            <CardStreamer text='My other social network' textSize='20px' component={<SocialNetworkStreamer />} />
        </div>
    );
};

export default DescriptionStreamerComponent;
