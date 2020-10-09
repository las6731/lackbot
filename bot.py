import discord
import os
from dotenv import load_dotenv
load_dotenv()

class LackBotClient(discord.Client):
    async def on_ready(self):
        print('Logged on as', self.user)
    
    async def on_message(self, message: discord.Message):
        # don't respond to ourselves
        if message.author == self.user:
            return
        
        if message.content == 'ping':
            await message.channel.send('pong')

if __name__ == "__main__":
    client = LackBotClient()

    DISCORD_TOKEN = os.getenv('DISCORD_TOKEN')
    if DISCORD_TOKEN is None:
        print('Must have .env file with discord token defined!')
        exit

    client.run(DISCORD_TOKEN)