from db import db

genres = ('REGGAE', 'POP', 'TRAP', 'HIP HOP', 'ROCK', 'INDIE', 'HEAVY', 'ELECTRONIC', 'OTHER')

class ArtistModel(db.Model):
    __tablename__ = 'artists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), unique=True, nullable=False)
    country = db.Column(db.String(30), nullable=False)
    genre = db.Column(db.Enum(*genres,name='genres_types'), nullable=False)

    def __init__(self, name, country, genre):
        self.name = name
        self.country = country
        self.genre = genre

    def json(self):
        dictionary = {'id': self.id, 'name': self.name, 'country': self.country, 'genre': self.genre}
        return dictionary

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, id):
        return ArtistModel.query.filter_by(id=id).first()

    @classmethod
    def find_by_name(cls, name):
        return ArtistModel.query.filter_by(name=name).first()
