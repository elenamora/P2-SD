from flask import Flask, g
from flask_restful import Resource, Api, reqparse
from db import db
from flask_migrate import Migrate
from models.artist import ArtistModel
from models.event import EventModel, artists_table
from models.account import AccountsModel, auth
from models.order import OrdersModel
from flask_cors import CORS
from decouple import config as config_decouple
from config import config
from models.lock import lock


from flask import render_template

app = Flask(__name__,
         static_folder="../frontend/dist/static",
         template_folder="../frontend/dist")
CORS(app, resources={r'/*': {'origins': '*'}})

environment = config['development']
if config_decouple('PRODUCTION', cast=bool, default=False):
    environment = config['production']

app.config.from_object(environment)

migrate = Migrate(app, db)
db.init_app(app)
api = Api(app)


@app.route('/')
@app.route('/userlogin')
@app.route('/newaccount')
def render_vue():
    return render_template("index.html")


class Artist(Resource):
    @auth.login_required(role='admin')
    def post(self):
        parser = reqparse.RequestParser()

        parser.add_argument('name', type=str, required=True, help="This field cannot be left blanck")
        parser.add_argument('country', type=str, required=True, help="This field cannot be left blanck")
        parser.add_argument('genre', type=str, required=True, help="This field cannot be left blanck" )
        data = parser.parse_args()

        new_artist = ArtistModel(data['name'], data['country'], data['genre'])
        try:
            new_artist.save_to_db()
            return new_artist.json(), 200
        except:
            return {"message": "Database Error"}, 500

    @auth.login_required(role='admin')
    def delete(self,id):
        artist = ArtistModel.find_by_id(id)
        if artist:
            artist.delete_from_db()
            return {'message': "Artist with id [{}] removed".format(id)}, 200
        else:
            return {'message': "Artist with id [{}] Not found".format(id)}, 404

    @auth.login_required(role='admin')
    def put(self,id):

        artist = ArtistModel.find_by_id(id)

        parser = reqparse.RequestParser()

        parser.add_argument('name', type=str, required=True, help="This field cannot be left blanck")
        parser.add_argument('country', type=str, required=True, help="This field cannot be left blanck")
        parser.add_argument('genre', type=str, required=True, help="This field cannot be left blanck")
        data = parser.parse_args()


        if artist:
            artist.name = data['name']
            artist.country = data['country']
            artist.genre = data['genre']
            artist.save_to_db()
            return artist.json(), 200

        else:
            new_artist = ArtistModel(data['name'], data['country'], data['genre'])

        try:
            new_artist.save_to_db()
            return new_artist.json(), 200
        except:
            return {"message": "Database Error"}, 500

    def get(self, id):
        artist = ArtistModel.find_by_id(id)
        return artist.json(), 200 if artist else 404

class Event(Resource):

    @auth.login_required(role='admin')
    def post(self):

        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True, help="This field cannot be left blanck")
        parser.add_argument('place', type=str, required=True, help="This field cannot be left blanck")
        parser.add_argument('city', type=str, required=True, help="This field cannot be left blanck")
        parser.add_argument('date', type=str, required=True, help="This field cannot be left blanck")
        parser.add_argument('artists', type=str, action="append", required=True, help="This field cannot be left blanck")
        parser.add_argument('price', type=str, required=True, help="This field cannot be left blanck")
        parser.add_argument('total_available_tickets', type=str, required=True, help="This field cannot be left blanck")

        data = parser.parse_args()

        new_event = EventModel(data['name'], data['place'], data['city'], data['date'], data['artists'],
                               data['price'], data['total_available_tickets'])

        try:
            new_event.save_to_db()
            return new_event.json(), 200
        except:
            return {"message": "Database Error"}, 500

    @auth.login_required(role='admin')
    def delete(self,id):
        event = EventModel.find_by_id(id)
        if event:
            event.delete_from_db()
            return {'message': "Event with id [{}] removed".format(id)}, 200
        else:
            return {'message': "Event with id [{}] Not found".format(id)}, 404

    @auth.login_required(role='admin')
    def put(self,id):

        event = EventModel.find_by_id(id)

        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True, help="This field cannot be left blanck")
        parser.add_argument('place', type=str, required=True, help="This field cannot be left blanck")
        parser.add_argument('city', type=str, required=True, help="This field cannot be left blanck")
        parser.add_argument('date', type=str, required=True, help="This field cannot be left blanck")
        parser.add_argument('artists', type=str, action="append", required=True, help="This field cannot be left blanck")
        parser.add_argument('price', type=str, required=True, help="This field cannot be left blanck")
        parser.add_argument('total_available_tickets', type=str)

        data = parser.parse_args()

        if event:
            event.name = data['name']
            event.place = data['place']
            event.city = data['city']
            event.date = data['date']
            event.artists = data['artists']
            event.price = data['price']
            event.total_available_tickets = data['total_available_tickets']

            try:
                event.save_to_db()
                return event.json(), 200
            except:
                return {"message": "Database Error"}, 500

        else:
            new_event = EventModel(data['name'], data['place'], data['city'], data['date'], data['artists'],
                                   data['price'], data['total_available_tickets'])
            try:
                event.save_to_db()
                return new_event.json(), 200
            except:
                return {"message": "Database Error"}, 500


    def get(self, id):
        event = EventModel.find_by_id(id)
        return event.json(), 200 if event else 404

class EventList(Resource):
    def get(self):
        i = 1
        event = EventModel.find_by_id(i)
        events = []
        while event:
            events.append(event.json())
            i += 1
            event = EventModel.find_by_id(i)

        return {'events': events}, 200

class ArtistList(Resource):
    def get(self):
        i = 1
        artist = ArtistModel.find_by_id(i)
        artists = []
        while artist:
            artists.append(artist.json())
            i += 1
            artist = ArtistModel.find_by_id(i)

        return {"artists":artists}, 200

class ArtistEventsList(Resource):
    def get(self, id):
        artist = ArtistModel.find_by_id(id)
        events_from_artist = []
        for event in artist.events:
            events_from_artist.append(event.json())

        return events_from_artist, 200

class EventArtistsList(Resource):
    def get(self, id):
        event = EventModel.find_by_id(id)
        artists_in_event = []
        for artist in event.artists_table:
            artists_in_event.append(artist.json())

        return artists_in_event, 200

class EventArtist(Resource):
    def get(self, id_event, id_artist):
        event = EventModel.find_by_id(id_event)
        artist = ArtistModel.find_by_id(id_artist)
        if event:
            if artist:
                return artist.json(), 200
            else:
                return {'message': "Artist with id [{}] Not found".format(id_artist)}, 404
        else:
            return {'message': "Event with id [{}] Not found".format(id_event)}, 404

    @auth.login_required(role='admin')
    def post(self, id_event, id_artist):
        event = EventModel.find_by_id(id_event)
        artist_find = ArtistModel.find_by_id(id_artist)

        if event:
            if artist_find:
                for artist in event.artists_table:
                    if artist_find == artist:
                        return {'message': "Artist with id [{}] already in Event with id [{}]".format(id_artist, id_event)}, 200

                event.artists_table.append(artist_find)
                try:
                    event.save_to_db()
                    return {'message': "Artist with id [{}] added to Event with id [{}]".format(id_artist, id_event)}, 200
                except:
                    return {"message": "Database Error"}, 500
            else:
                return {'message': "Artist with id [{}] Not found".format(id_artist)}, 404
        else:
            return {'message': "Event with id [{}] Not found".format(id_event)}, 404

    @auth.login_required(role='admin')
    def delete(self, id_event, id_artist):
        event = EventModel.find_by_id(id_event)
        artist = ArtistModel.find_by_id(id_artist)

        if event:
            if artist:
                #artist.events.remove(event)
                event.artists_table.remove(artist)
                try:
                    event.save_to_db()
                    return {'message': "Artist with id [{}] removed from Event with id [{}]".format(id_artist, id_event)}, 200
                except:
                    return {"message": "Database Error"}, 500
            else:
                return {'message': "Artist with id [{}] Not found".format(id_artist)}, 404
        else:
            return {'message': "Event with id [{}] Not found".format(id_event)}, 404

class Orders(Resource):
    @auth.login_required(role='user')
    def get(self, username):
        if username == g.user.username:
            user = OrdersModel.find_by_username(username)
            all_orders = []
            for usr in user:
                all_orders.append(usr.json())

            return {'all_orders': all_orders}, 200
        else:
            return {"message": "User match not found"}, 400

    @auth.login_required(role='user')
    def post(self, username):

        if username == g.user.username:
            parser = reqparse.RequestParser()
            parser.add_argument('event_id', type=int, required=True, help="This field cannot be left blanck")
            parser.add_argument('tickets_bought', type=int, required=True, help="This field cannot be left blanck")
            data = parser.parse_args()

            with lock.lock:
                user = AccountsModel.find_by_username(username)
                money = user.available_money

                event = EventModel.find_by_id(data['event_id'])
                tickets = event.total_available_tickets
                price = event.price
                total = price * data['tickets_bought']

                event.total_available_tickets -= data['tickets_bought']
                user.available_money -= total
                new_order = OrdersModel(data['event_id'], data['tickets_bought'])
                user.orders.append(new_order)

                try:
                    db.session.add(new_order)
                    db.session.add(event)
                    db.session.add(user)
                    money = user.available_money
                    tickets = event.total_available_tickets
                    if money >= 0 and tickets >= 0:
                        db.session.commit()
                        return new_order.json(), 200
                    else:
                        db.session.rollback()
                        return {"message": "Not enough money/ not available tickets"}, 400
                except:
                    return {"message": "Database Error"}, 500
        else:
            return {"message": "User match not found"}, 400

class OrdersList(Resource):
    def get(self):
        i = 1
        order = OrdersModel.find_by_id(i)
        orders = []
        while order:
            orders.append(order.json())
            i += 1
            order = OrdersModel.find_by_id(i)

        return orders, 200

class Accounts(Resource):
    @auth.login_required(role='user')
    def get(self, username):
        if username == g.user.username:
            user = AccountsModel.find_by_username(username)
            return {'user': user.json()}, 200
        else:
            return {"message": "User match not found"}, 400

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str, required=True, help="This field cannot be left blanck")
        parser.add_argument('password', type=str, required=True, help="This field cannot be left blanck")
        data = parser.parse_args()

        new_user = AccountsModel(data['username'])
        new_user.hash_password(data['password'])

        try:
            new_user.save_to_db()
            return new_user.json(), 200
        except:
            return {"message": "Database error"}, 400

    @auth.login_required(role='user')
    def delete(self, username):
        if username == g.user.username:
            user = AccountsModel.find_by_username(username)
            if user:
                user.delete_from_db()
                try:
                    user.save_to_db()
                except:
                    return {'message': "DataBase Error".format(username)}, 404
                user_order = OrdersModel.find_by_username(username)
                for usr in user_order:
                    usr.delete_from_db()
                    try:
                        usr.save_to_db()
                    except:
                        return {'message': "Database Error".format(username)}, 404

                return {'message': "Artist with username [{}] removed".format(username)}, 200
            else:
                return {'message': "Artist with username [{}] Not found".format(username)}, 404
        else:
            return {'message': "User match not found".format(username)}, 400

class AccountsList(Resource):
    def get(self):
        users = AccountsModel.query.all()
        all_accounts = []
        for u in users:
            all_accounts.append(u.json())

        return all_accounts, 200

class Login(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str, required=True, help="This field cannot be left blanck")
        parser.add_argument('password', type=str, required=True, help="This field cannot be left blanck")
        data = parser.parse_args()

        user = AccountsModel.find_by_username(data['username'])
        if user:
            if user.verify_password(data['password']):
                token = user.generate_auth_token()
                return {'token': token.decode('ascii')}, 200
            else:
                return {"message": "Password not correct"}, 400
        else:
            return {"message": "User not found"}, 404



api.add_resource(Artist, '/artist/<int:id>', '/artist')
api.add_resource(Event, '/event/<int:id>', '/event')

api.add_resource(ArtistEventsList, '/artist/<int:id>/events')
api.add_resource(EventArtistsList, '/event/<int:id>/artists')

api.add_resource(EventArtist, '/event/<int:id_event>/artist/<id_artist>','/event/<int:id_event>/artist')

api.add_resource(EventList, '/events')
api.add_resource(ArtistList, '/artists')

api.add_resource(OrdersList, '/orders')
api.add_resource(Orders, '/order/<string:username>')

api.add_resource(Accounts, '/account/<string:username>', '/account')
api.add_resource(AccountsList, '/accounts')

api.add_resource(Login, '/login')

if __name__ == '__main__':
    app.run(port=5000, debug=True)
