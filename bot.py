import discord
import json
import random
import os
from dotenv import load_dotenv
load_dotenv()

class LackBotClient(discord.Client):

    responses: dict

    async def on_ready(self):
        # load responses from json
        with open('responses.json', 'r') as read_file:
            self.responses = json.load(read_file)

        # set activity
        activity = discord.Game(name="Slackbot but worse")
        await self.change_presence(activity=activity)

        print('Logged on as', self.user)
    
    async def on_message(self, message: discord.Message):
        # don't respond to ourselves
        if message.author == self.user:
            return

        for phrase in self.responses:
            if phrase in message.content.lower():
                if isinstance(self.responses[phrase], str):
                    await message.channel.send(self.responses[phrase])
                    return
                
                options: list = self.responses[phrase]
                response = random.randint(0, len(options)-1)
                await message.channel.send(options[response])
                return

if __name__ == "__main__":
    client = LackBotClient()

    DISCORD_TOKEN = os.getenv('DISCORD_TOKEN')
    if DISCORD_TOKEN is None:
        print('Must have .env file with discord token defined!')
        exit

    client.run(DISCORD_TOKEN)