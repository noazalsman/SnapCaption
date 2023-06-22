import React from 'react';
import { IonInput, IonButton } from '@ionic/react';
import CaptionCard from './CaptionCard';

interface CaptionsProps {
    captions: string[];
    sendOpenAISimilar: (data: string) => Promise<void>;
}

const Captions: React.FC<CaptionsProps> = ({ captions, sendOpenAISimilar }) => {
    return ( 
        <div className='page'>
            <h6>Feel free to edit the captions below. When you're ready, click the button to generate similar captions!</h6>
            {captions.map((caption, index) => (
                <CaptionCard caption={caption} key={index} sendOpenAISimilar={sendOpenAISimilar}/>
            ))}
        </div>
     );
}
 
export default Captions;