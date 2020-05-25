from db import db
from models.event import EventModel

class OrdersModel(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), db.ForeignKey('accounts.username'), nullable=False)
    id_event = db.Column(db.Integer, nullable=False)
    tickets_bought = db.Column(db.Integer, nullable=False)

    def __init__(self, id_event, tickets_bought):
        self.id_event = id_event
        self.tickets_bought = tickets_bought

    def json(self):
        event = EventModel.find_by_id(self.id_event)
        dictionary = {'id': self.id, 'username': self.username,
                      'Event_name': event.name, 'Event_date': event.date,
                      'Event_city': event.city, 'tickets_bought': self.tickets_bought}
        return dictionary

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, id):
        return OrdersModel.query.filter_by(id=id).first()

    @classmethod
    def find_by_username(cls, username):
        return OrdersModel.query.filter_by(username=username)


