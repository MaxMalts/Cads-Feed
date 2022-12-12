import checkHash from '@assets/server-mocks/checkHash.js';
import users from '@assets/server-mocks/data/users.json';

export default function signIn(username, password) {
    const foundUser = users.find(item => (
        username.toLowerCase() === item.userData.username && checkHash(password, item.userData.passwordHash)
    ));

    if (foundUser) {
        if (!checkHash(JSON.stringify(foundUser.userData), foundUser.hash)) {
            throw new Error('Security error: wrong user hash.');
        }

        window.localStorage.setItem('user', JSON.stringify(foundUser));
        return {...foundUser};
    }

    return null;
}