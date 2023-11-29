import axios from 'axios';

export const githubApi = axios.create ({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization : 'Bearer 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'
    }
})