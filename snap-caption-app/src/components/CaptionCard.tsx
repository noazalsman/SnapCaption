import React, { useEffect, useState } from 'react';
import { IonCard, IonCardHeader, IonCardContent, IonButton, IonTextarea, IonIcon, IonToast } from '@ionic/react';
import { copyOutline, pencilOutline, checkmark  } from 'ionicons/icons';

interface CaptionCardProps {
    caption: string;
    sendOpenAISimilar: (data: string) => Promise<void>;
}

const CaptionCard: React.FC<CaptionCardProps> = ({ caption, sendOpenAISimilar }) => {
    const [newCaption, setNewCaption] = useState<string>(caption);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [showToast, setShowToast] = useState<boolean>(false);

    useEffect(() => {
        setNewCaption(caption);
    }, [caption]);

    const handleInputChange = (e: any) => {
        setNewCaption(e.detail.value);
    };

    const handleButtonClick = () => {
        setIsEditing(false);
        sendOpenAISimilar(newCaption);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleStopEditingClick = () => {
        setIsEditing(false);
    };

    const handleCopyClick = () => {
        navigator.clipboard.writeText(newCaption).then(() => setShowToast(true));
    };

    return (
        <div style={{ width: '90%' }}>
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message="Text copied to clipboard"
                duration={2000}
            />
            <IonCard>
                <IonCardHeader>
                    <div className="card-header-actions">
                        {!isEditing ? 
                        <div>
                            <IonButton fill="clear" onClick={handleEditClick}>
                                <IonIcon icon={pencilOutline} color="dark" />
                            </IonButton>
                            <IonButton fill="clear" onClick={handleCopyClick}>
                                <IonIcon icon={copyOutline} color="dark" />
                            </IonButton>
                        </div>
                        : 
                        <div>
                            <IonButton fill="clear" onClick={handleStopEditingClick}>
                                <IonIcon icon={checkmark} color="dark" />
                            </IonButton>
                            <IonButton fill="clear" onClick={handleCopyClick}>
                                <IonIcon icon={copyOutline} color="dark" />
                            </IonButton>
                        </div>
                         }
                    </div>
                    <IonCardContent className='card-title'>
                        {isEditing ? 
                             <IonTextarea className='card' value={newCaption} autoGrow={true} onIonChange={handleInputChange}></IonTextarea>
                             :
                            newCaption
                        }
                    </IonCardContent>
                </IonCardHeader>
                <div className="card-button">
                    <IonButton color="dark" expand="block" onClick={handleButtonClick}>REGENERATE</IonButton>
                </div>
            </IonCard>
        </div>
    );
}

export default CaptionCard;
