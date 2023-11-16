import axios from 'axios';

export const githubApi = axios.create ({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization : 'Bearer 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'
    }
})