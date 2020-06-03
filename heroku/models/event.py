from db import db

artists_table = db.Table('event_artist', db.Column('event_id', db.Integer, db.ForeignKey('events.id')),
                   db.Column('artist_id', db.Integer, db.ForeignKey('artists.id')))

class EventModel(db.Model):
    __tablename__ = 'events'
    __table_args__ = (db.UniqueConstraint('name', 'date', 'city'),)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), unique=True, nullable=False)
    place = db.Column(db.String(30), nullable=False)
    city = db.Column(db.String(30), nullable=False)
    date = db.Column(db.String(30), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    total_available_tickets = db.Column(db.Integer, nullable=False)

    artists_table = db.relationship('ArtistModel', secondary=artists_table, backref=db.backref('events', lazy='dynamic'))


    def __init__(self, name, place, city, date, price, total_available_tickets):
        self.name = name
        self.place = place
        self.city = city
        self.date = date
        self.price = price
        self.total_available_tickets = total_available_tickets

    def json(self):
        artists_list = []
        for artist in self.artists_table:
            artists_list.append(artist.json())

        dictionary = {'id': self.id, 'name': self.name, 'place': self.place, 'city': self.city, 'date': self.date,
                        'artists': artists_list,
                        'price': self.price, 'total_available_tickets': self.total_available_tickets}
        return dictionary

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, id):
        return EventModel.query.filter_by(id=id).first()

    @classmethod
    def find_by_name(cls, name):
        return EventModel.query.filter_by(name=name).first()




