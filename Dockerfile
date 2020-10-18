FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

# install python dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# copy python app
COPY ./app /app
