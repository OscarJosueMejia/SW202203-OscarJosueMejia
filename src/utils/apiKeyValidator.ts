const apiKeys = (process.env.API_KEYS || '').split('|');
/* ['asadsafheajljfhdsakfhekaw', 'anotherSimpleApiKeySchemaData'] */

const validateApiKey = (apiKey:string) => {
    return apiKeys.includes(apiKey);
}

export default validateApiKey;