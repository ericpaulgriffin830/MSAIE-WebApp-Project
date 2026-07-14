from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

from app.config import Config

db = SQLAlchemy()
migrate = Migrate()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)
    db.init_app(app)
    migrate.init_app(app, db)

    from app import models  # noqa: F401
    from app.routes import api

    app.register_blueprint(api)

    @app.cli.command("seed")
    def seed():
        """Seed the 30 tables."""
        from app.seed import seed_tables

        seed_tables()
        print("Seeded 30 tables.")

    return app
