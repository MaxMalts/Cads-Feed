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

export default function signIn(username, password) {
    const foundUser = users.find(item => (
        username.toLowerCase() === item.username && password === item.password
    ));

    if (foundUser) {
        window.localStorage.setItem('user', JSON.stringify(foundUser));
        return {...foundUser};
    }

    return null;
}