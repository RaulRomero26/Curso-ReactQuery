import axios from 'axios';

export const githubApi = axios.create ({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization : 'Bearer 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'
    }
})