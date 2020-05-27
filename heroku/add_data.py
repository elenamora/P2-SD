from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from models.artist import ArtistModel
from models.event import EventModel, artists_table

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
db.init_app(app)