import {Keccak} from 'sha3';

export default function checkHash(string, hash) {
    const keccak = new Keccak();
    keccak.update(string);
    return keccak.digest('hex') === hash;
}