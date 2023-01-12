import axios from 'axios';
import dbConnect from './dbConnect';

const getRandomQuote = async () => {
    try {
        const { data } = await axios.get('api/random');
        return data;
    } catch (err) {
        console.log(err);
    }
};

export { getRandomQuote };
