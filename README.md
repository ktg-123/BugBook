# BugBook
BugBook is a web application which can be used by organizations in order to easily report, assign and manage the status of bugs for their Projects which are in 
their Testing phase. It is made with [Django](https://www.djangoproject.com/), [Django Rest Framework](https://www.django-rest-framework.org/) and 
[Django Channels](https://channels.readthedocs.io/en/latest/) as backend technologies. The frotend part is made with [React](https://reactjs.org/). Developers 
can add their projects, delete them, report issues and discuss these issues with their colleauges.

# Dependencies
- python3
- pip
- npm packages
- virtualenv

# Build and Run
1. Clone the repository
- `$ git clone https://github.com/ktg-123/BugBook.git `
- `$ cd BugBook`

2. Set-up Virtual env
- `$ sudo apt-get install python3-venv`
- `$ python3 -m venv <env_name>`
- `$ source <env_name>/bin/activate` 
    Virtual Environment is set up and activated

3. Install requirements `$ cd ./assignment`
- `$ pip3 install requirements.txt` . Install all Backend dependencies.
- `$ cd frontend`
- `$ npm install` . All frontend dependencies are installed.

4. Migrate Files
- `$ cd ../assignment`.In settings.py make changes to appropiate username and password for Email.
- `$ cd ..`
- `$ python3 manage.py makemigrations`
- `$ python3 manage.py migrate`
5. Start the Backend Server
- `$ python3 manage.py runserver`
6. Start the frontend server
- `$ cd frontend`
- `$ sudo npm start`
7. Open Browser
- Enter the URL `http://127.0.0.1:3000/`.
- Login with Channeli Credentials.
- Then you will be redirected to `http://127.0.0.1:3000/home`
- Now Report your Bugs or Add your Project.

    
