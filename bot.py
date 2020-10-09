import discord
import json
import random
import os
from datetime import datetime
from pytz import timezone

from dotenv import load_dotenv
load_dotenv()

class LackBotClient(discord.Client):

    responses: dict
    emojis = []

    async def on_ready(self):
        # load responses from json
        with open('responses.json', 'r') as read_file:
            self.responses = json.load(read_file)

        # set activity
        activity = discord.Game(name="Slackbot but worse")
        await self.change_presence(activity=activity)

        # discover emojis
        for guild in self.guilds:
            for emoji in guild.emojis:
                self.emojis.append(emoji)

        print('Logged on as', self.user)

    def find_emoji(self, name: str) -> discord.Emoji:
        emoji: discord.Emoji
        for emoji in self.emojis:
            if emoji.name == name:
                return emoji
        return None
    
    async def on_message(self, message: discord.Message):
        # don't respond to ourselves
        if message.author == self.user:
            return
        
        msg = message.content.lower()
        
        if 'wednesday' in msg:
            if datetime.now(tz=timezone('EST')).weekday() == 2:
                await message.channel.send(f'{self.find_emoji("wednesday")} It\'s Wednesday, my dudes! {self.find_emoji("dab1")}{self.find_emoji("dab2")}{self.find_emoji("dab3yeet")}')
            else:
                await message.channel.send('It\'s not Wednesday yet :cry:')
            return

        for phrase in self.responses:
            if phrase in msg:
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