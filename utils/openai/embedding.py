import openai
import os

class Embedding:
    def __init__(self, api_key=None):
        if api_key is None:
            self.api_key = os.getenv("OPENAI_API_KEY")
        else:
            self.api_key = api_key
        openai.api_key = self.api_key

    def perform(self, text, model="text-embedding-ada-002"):
        response = openai.Embedding.create(input=text, model=model)
        embedding = response['data'][0]['embedding']
        return embedding

# Usage example:
if __name__ == "__main__":
    # Ensure to replace 'your-api-key' with your actual OpenAI API key or set it in the environment variable 'OPENAI_API_KEY'
    embedding_instance = Embedding(api_key='your-api-key')
    text_to_embed = "OpenAI provides powerful AI models."
    result = embedding_instance.perform(text_to_embed)
    print(result)
