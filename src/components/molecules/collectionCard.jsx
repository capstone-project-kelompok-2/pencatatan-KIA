import Card from "../atom/card";

const CollectionCard = ({ guest, medical, kader }) => {
    return (
        <div className="flex justify-start py-5">
            <div className="flex gap-4 flex-col mr-5">
                <Card data={kader} header='Kader' subtitle='Total Kader' icon='fa-solid fa-user-nurse mr-2' />
                <Card data={guest} header='Pasien' subtitle='Total Pasien' icon='fa-solid fa-users mr-2' />
                <Card data={medical} header='Riwayat Penyakit' subtitle='Total Riwayat Penyakit Anak' icon='fa-solid fa-book-medical mr-2' />
            </div>
        </div>
    );
};

export default CollectionCard;
