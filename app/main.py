from fastapi import FastAPI
from lackbot import bot
import threading

app = FastAPI()
lackbot_thread: threading.Thread
bot_started = False

@app.on_event('startup')
def startup():
    global bot_started
    if bot_started:
        return
    # start up lackbot
    bot_loop = bot.get_loop()
    lackbot_thread = threading.Thread(target=bot_loop.run_forever)
    lackbot_thread.start()
    bot_started = True
    print(f'LackBot started on thread {lackbot_thread}')

@app.get('/api/v1')
async def api_root() -> str:
    return 'Hello world!'

@app.get('/api/v1/response')
def get_all_responses() -> dict:
    return bot.client.responses

@app.get('/api/v1/response/{phrase}')
def get_responses(phrase: str) -> list:
    phrase = phrase.lower().strip()
    if phrase in bot.client.responses:
        responses = bot.client.responses[phrase]
        if isinstance(responses, str):
            responses = []
            responses.append(bot.client.responses[phrase])
        return responses
    else:
        return []

@app.post('/api/v1/response/{phrase}')
def add_phrase(phrase: str, responses: list) -> list:
    phrase = phrase.lower().strip()
    if phrase in bot.client.responses:
        bot.client.responses[phrase] += responses
    else:
        bot.client.responses[phrase] = responses
    bot.client.update_responses()
    return bot.client.responses[phrase]

@app.delete('/api/v1/response/{phrase}')
def del_phrase(phrase: str) -> bool:
    phrase = phrase.lower().strip()
    if phrase in bot.client.responses:
        del bot.client.responses[phrase]
        bot.client.update_responses()
        return True
    return False
