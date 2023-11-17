import axios from 'axios';

export const githubApi = axios.create ({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization : 'Bearer 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'
    }
})