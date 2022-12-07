const users = [
    {
        username: 'admin',
        name: 'Admin',
        password: 'admin'
    },
    {
        username: 'thebestuser',
        name: 'The Best User',
        password: 'password123'
    }
];

export default function login(username, password) {
    const foundUser = users.find(item => username.toLowerCase() === item.username);
    if (foundUser) {
        window.localStorage.setItem('user', JSON.stringify(foundUser));
        return foundUser;
    }

    return null;
}