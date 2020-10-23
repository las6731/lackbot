import discord
import json
import random
import os
import re
from datetime import datetime
from pytz import timezone
import asyncio
from typing import Optional

from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())

class LackBotClient(discord.Client):

    responses: dict
    emojis = []

    def update_responses(self):
        with open('responses.json', 'w') as write_file:
            json.dump(self.responses, write_file, indent=4)

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
    
    def replace_emojis(self, string: str):
        emoji: str
        for emoji in re.findall(r':[^:\s]*(?:[^:\s]*)*:', string):
            stripped_emoji = emoji.strip(':')
            custom_emoji = self.find_emoji(stripped_emoji)
            if custom_emoji is not None:
                string = string.replace(emoji, str(custom_emoji))
        return string
    
    async def on_message(self, message: discord.Message):
        # don't respond to bots
        if message.author == self.user:
            return
        elif message.author.bot:
            return
        elif message.author.id == 82945737305882624: # ian
            await message.add_reaction(self.find_emoji("fired"))
        
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
                    response = self.replace_emojis(self.responses[phrase])
                    await message.channel.send(response)
                    return
                
                options: list = self.responses[phrase]
                response = options[random.randint(0, len(options)-1)]
                response = self.replace_emojis(response)
                await message.channel.send(response)
                return

client = LackBotClient()

def init_client():
    DISCORD_TOKEN = os.getenv('DISCORD_TOKEN')
    if DISCORD_TOKEN is None:
        print('Must have .env file with discord token defined!')
        exit

    return DISCORD_TOKEN

def get_loop():
    loop = asyncio.get_event_loop()
    
    DISCORD_TOKEN = init_client()

    loop.create_task(client.start(DISCORD_TOKEN))
    return loop

if __name__ == "__main__":
    DISCORD_TOKEN = init_client()
    client.run(DISCORD_TOKEN)