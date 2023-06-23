import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonProgressBar } from '@ionic/react';
import './Home.css';
import FormComponent from '../components/FormComponent';
import React, { useState } from 'react';
import axios from 'axios';
import Captions from '../components/Captions';

interface CaptionData {
  social_media: string;
  tone: string;
  key_words: string;
  names: string;
  places: string;
  photo_description: string;
}

const Home: React.FC = () => {
  const [captions, setCaptions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const sendOpenAICaption = async (data: CaptionData): Promise<void> => {
    setLoading(true);
    try {
      const resp = await axios.post('http://localhost:5000/generate_caption', data);
      const captions_res = resp.data.captions;
      setCaptions(captions_res);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const sendOpenAISimilar = async (data: string): Promise<void> => {
    setLoading(true);
    try {
      const resp = await axios.post('http://localhost:5000/generate_similar_captions', { user_caption: data });
      const captions_res = resp.data.similar_captions;
      setCaptions(captions_res);
      setLoading(false);	
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <IonPage className='app'>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <img src="../../public/logo.png" alt="SnapCaption" className="logo" height="40px"/>
            <span className='title'>SnapCaption</span>
          </IonTitle>
          {loading ? <IonProgressBar type="indeterminate"></IonProgressBar> : null}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">SnapCaption</IonTitle>
          </IonToolbar>
        </IonHeader>
        {captions.length > 0 ? <Captions captions={captions} sendOpenAISimilar={sendOpenAISimilar}/> : <FormComponent sendOpenAICaption={sendOpenAICaption} setLoading={setLoading}/>}
      </IonContent>
    </IonPage>
  );
};

export default Home;
