# BugBook
BugBook is a web application which can be used by organizations in order to easily report, assign and manage the status of bugs for their Projects which are in 
their Testing phase. It is made with [Django](https://www.djangoproject.com/), [Django Rest Framework](https://www.django-rest-framework.org/) and 
[Django Channels](https://channels.readthedocs.io/en/latest/) as backend technologies. The frotend part is made with [React](https://reactjs.org/). Developers 
can add their projects, delete them, report issues and discuss these issues with their colleauges.

# Dependencies
- python3
- pip
- npm packages
- docker
- mysql

# Build and Run
1. Clone the repository
- `$ git clone https://github.com/ktg-123/BugBook.git `
- `$ cd BugBook`

2. Make changes for mysql user in docker-compose.yaml

3. Make changes for email and mysql in assignment/assignment/settings.py

4. Make sure that port 8000, 3000 and 6379 are not in use.

5. Run docker commands
- `$ sudo docker-compose build`
- `$ sudo docker-compose up -d`

6. Open Browser
- Enter the URL `http://127.0.0.1:3000/`.
- Login with Channeli Credentials.
- Then you will be redirected to `http://127.0.0.1:3000/home`
- Now Report your Bugs or Add your Project.

7. To switch it down Run `$ sudo docker-compose down`
    
