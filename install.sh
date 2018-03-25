#! /bin/sh
sudo apt-get install -y git
sudo apt-get install -y nodejs
sudo apt-get install librsvg2-bin

sudo npm i -g npm

git clone git@bitbucket.org:broopchandani-datalicious/web-spyder.git
cd web-spyder
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
npm install
npm run build
python app.py
