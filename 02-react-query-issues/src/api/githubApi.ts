import axios from 'axios';

export const githubApi = axios.create ({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization : 'Bearer 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'
    }
})