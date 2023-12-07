// InfoKaderModal.js
import React from 'react';
import { Dialog } from 'primereact/dialog';
import InfoKader from '../atom/infoKader';
const InfoKaderModal = ({ userLogin, position, visible, setVisible }) => {
    return (
        <Dialog
            header="Info Kader"
            visible={visible}
            position={position}
            style={{ width: '22vw' }}
            onHide={() => setVisible(false)}
            draggable={false}
            resizable={false}
        >
            <InfoKader userLogin={userLogin} />
        </Dialog>
    );
};

export default InfoKaderModal;
