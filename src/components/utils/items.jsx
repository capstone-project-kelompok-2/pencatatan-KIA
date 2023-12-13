

    const user = JSON.parse(localStorage.getItem('user'));
    export const items =[
        {
            label : `${user.username}`,
            items : [
                {
                    label : `Nama : ${user.namaDepan} ${user.namaBelakang}`,

                },
                {
                    label : `Username : ${user.username}`
                },
                {
                    label : `email : ${user.email}`
                },
                {
                    label : `no. telp : ${user.noTelp}`
                },

            ]
        }

    ]
