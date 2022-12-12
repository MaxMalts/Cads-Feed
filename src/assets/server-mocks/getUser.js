import checkHash from '@assets/server-mocks/checkHash.js';

export default function getUser() {
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (user) {
        if (!checkHash(JSON.stringify(user.userData), user.hash)) {
            throw new Error('Security error: wrong user hash.');
        }

        return user.userData;
    }

    return null;
}