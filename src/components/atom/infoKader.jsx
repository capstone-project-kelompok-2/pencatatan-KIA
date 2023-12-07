import React from 'react';

const InfoKader = ({ userLogin, position, visible, setVisible }) => {
    return (
        <div className="m-0 flex flex-col items-center">
            <div>
                <p>Username: {userLogin ? userLogin.username : ''}</p>
                <p>Nama: {userLogin ? userLogin.namaDepan + ' ' + userLogin.namaBelakang : ''}</p>
                <p>Email: {userLogin ? userLogin.email : ''}</p>
                <p>No. Telepon: {userLogin ? userLogin.noHp : ''}</p>
            </div>
        </div>
    );
};

export default InfoKader;