from decouple import config
class Config:
    pass

class ProductionConfig(Config):
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = config('DATABASE_URL', default='localhost')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    STATIC_FOLDER = "/static"
    TEMPLATE_FOLDER = "/templates"
    SECRET_KEY = config('SECRET_KEY', default='localhost')

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///data.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    STATIC_FOLDER = "/P2_VUE_WEBPACK/frontend/dist/static"
    TEMPLATE_FOLDER = "/P2_VUE_WEBPACK/frontend/dist"
    SECRET_KEY = "kdsfklsmfakfmafmadslvsdfasdf"

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig
}
