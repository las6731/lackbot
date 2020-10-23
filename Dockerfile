FROM python:3.8

ENV PORT=80
ENV MAX_WORKERS=1

run pip install fastapi uvicorn

EXPOSE $PORT

# install python dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# copy python app
COPY ./app /app

WORKDIR ./app
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port $PORT --workers $MAX_WORKERS"]
