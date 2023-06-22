import { IonList, IonItem, IonRadioGroup, IonRadio, IonLabel, IonInput, IonButton, IonSelectOption, IonSelect, IonIcon } from '@ionic/react';
import { InputChangeEventDetail } from '@ionic/core';
import React, { useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';
import './FormComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { imageOutline } from 'ionicons/icons';

interface CaptionData {
  social_media: string;
  tone: string;
  key_words: string;
  names: string;
  places: string;
  photo_description: string;
}

interface FormComponentProps {
  sendOpenAICaption: (data: CaptionData) => Promise<void>;
  setLoading: (loading: boolean) => void;
}

const FormComponent: React.FC<FormComponentProps> = ({ sendOpenAICaption, setLoading}) => {

  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [fileName, setFileName] = React.useState<string>('');
  const [smallLoading, setSmallLoading] = React.useState<boolean>(false);

  const [socialmedia, setSocialmedia] = useState<string>('');
  const [tone, setTone] = useState<string>('');
  const [keywords, setKeywords] = useState<string>('');
  const [names, setNames] = useState<string>('');
  const [places, setPlaces] = useState<string>('');
  const [photo_description, setPhotoDescription] = useState<string>('');

  useEffect(() => {
    if(photo_description !== '') {
      setSmallLoading(false);
    }
  }, [photo_description]);

  useEffect(() => {
    uploadImage(selectedFile);
  }, [selectedFile]);

  const handleKeyWordsChange = (event: CustomEvent<InputChangeEventDetail>) => {
    setKeywords(event.detail.value!);
  };
  
  const handleNamesChange = (event: CustomEvent<InputChangeEventDetail>) => {
    setNames(event.detail.value!);
  };
  
  const handlePlacesChange = (event: CustomEvent<InputChangeEventDetail>) => {
    setPlaces(event.detail.value!);
  };  

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSmallLoading(true);
    setPhotoDescription('');
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
    }
  }

  const handleSubmit = () => {
    setLoading(true);
    sendOpenAICaption({
        social_media: socialmedia,
        tone: tone,
        key_words: keywords,
        names: names,
        places: places,
        photo_description: photo_description
    });
  };

  const uploadImage = (imageFile: File | null) => {
    if (imageFile) {
        let formData = new FormData();
        formData.append("image", imageFile);
        
        axios.post("http://localhost:8000/predict", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
          const prediction = response.data.prediction;
          setPhotoDescription(prediction);
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }
  }

  return (
    <div className='form'>
      <h6>Let's create a caption for:</h6>

      <div className="socialmedia">
        <IonRadioGroup class="inline-radio-group" value={socialmedia} onIonChange={e => setSocialmedia(e.detail.value)}>
          <IonItem lines="none">
            <IonLabel>Instagram</IonLabel>
            <IonRadio slot="start" value="instagram" />
          </IonItem>

          <IonItem lines="none">
            <IonLabel>LinkedIn</IonLabel>
            <IonRadio slot="start" value="linkedin" />
          </IonItem>

          <IonItem lines="none">
            <IonLabel>Facebook</IonLabel>
            <IonRadio slot="start" value="facebook" />
          </IonItem>
        </IonRadioGroup>
      </div>

      <div className='tone'>
       <IonList>
          <IonItem>
            <IonSelect aria-label="Tone" interface="popover" placeholder="What will be the tone?" onIonChange={(e) => setTone(e.detail.value)}>
            <IonSelectOption value="professional">Professional</IonSelectOption>
              <IonSelectOption value="friendly">Friendly</IonSelectOption>
              <IonSelectOption value="promotional">Promotional</IonSelectOption>
              <IonSelectOption value="informative">Informative</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>
      </div>

      <div className='names'>
          <IonInput label="Any names to mention?" labelPlacement="floating" fill="outline" placeholder="Name, Name, ..." value={names} onIonChange={handleNamesChange}></IonInput>
      </div>

      <div className='places'>
          <IonInput label="Any places to mention?" labelPlacement="floating" fill="outline" placeholder="Place, Place, ..." value={places} onIonChange={handlePlacesChange}></IonInput>
      </div>

      <div className='keywords'>
          <IonInput label="Some Key words" labelPlacement="floating" fill="outline" placeholder="Word, Word, ..." value={keywords} onIonChange={handleKeyWordsChange}></IonInput>
      </div>

      <div className='photo_description' >
        <IonItem>
          <input 
            style={{ display: 'none' }} 
            id="fileUpload" 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange}
          />
          <label htmlFor="fileUpload" className='file-upload'>
            <IonLabel>
                  <IonIcon icon={imageOutline} />   Upload cover photo
            </IonLabel>
          </label>
        </IonItem>
        {fileName ? <span>{fileName}</span> : null}
        {smallLoading ? <div className="spinner-border text-dark m-3" role="status"><span className="sr-only"></span></div> : (
          photo_description ? <div className='desc'>{photo_description}</div> : null
        )}
      </div>

      <div className='submit'>
        <IonButton color="dark" disabled={photo_description === ''} onClick={handleSubmit}>Generate</IonButton>
      </div>
          
    </div>
  );
};

export default FormComponent;

