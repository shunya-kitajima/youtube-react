import axios from 'axios';

const KEY = 'AIzaSyDjYS7cw4dTv0eGYvpEAmMN8Pzlou6gnRk';

const youtube = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3'
});

export const fetchPopularData = async () => {
    return await youtube.get('/videos', {
        params: {
            part: 'snippet',
            maResult: 40,
            key: KEY,
            regionCode: 'JP',
            type: 'video',
            chart: 'mostPopular'
        }
    });
};