import axios from 'axios';

export const githubApi = axios.create ({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization : 'Bearer  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'
    }
})